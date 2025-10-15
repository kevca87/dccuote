from flask import Flask, request, jsonify
from flasgger import Swagger, swag_from
from scripts.quotes import *
from scripts.tags import *
from scripts.characters import *

app = Flask(__name__)
Swagger(app)

#-----Quotes Endpoints-----#

# Get a daily quote
@swag_from({
    'tags': ['Quotes'],
    'parameters': [],
    'responses': {
        200: {
            'description': 'A daily quote',
            'examples': {
                'application/json': {
                    "id": "4",
                    "quote": "Do what you can, with what you have, where you are.",
                    "character": "Theodore Roosevelt",
                    "source": "Theodore Roosevelt",
                    "tags": [
                        {"id": "2", "name": "inspiration"},
                        {"id": "3", "name": "life"},
                        {"id": "4", "name": "moustache"}
                    ]
                }
            }
        }
    }
})
@app.route("/quotes/daily", methods=["GET"])
def daily_quote():
    quote = quote_daily()
    return jsonify(quote)

# Add a new quote
@swag_from({
    'tags': ['Quotes'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'quote': {'type': 'string'},
                    'character': {'type': 'string'},
                    'source': {'type': 'string'},
                    'tags': {
                        'type': 'array',
                        'items': {'type': 'string'}
                    }
                },
                'required': ['quote', 'character', 'source']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Quote added successfully',
            'examples': {
                'application/json': {
                    "id": "12",
                    "quote": "Your new quote here.",
                    "character": {"id": "1", "name": "Character Name"},
                    "source": "Source Name",
                    "tags": [{"id": "1", "name": "Tag 1"}, {"id": "2", "name": "Tag 2"}]
                }
            }
        },
        400: {
            'description': 'Invalid quote data',
            'examples': {
                'application/json': {'error': 'Invalid quote data'}
            }
        },
        409: {
            'description': 'Quote already exists',
            'examples': {
                'application/json': {'error': 'Quote already exists'}
            }
        }
    }
})
@app.route("/quotes/add", methods=["POST"])
def add_quote():
    new_quote = request.json
    if not quote_validate(new_quote):
        return jsonify({"error": "Invalid quote data"}), 400
    
    if quote_exists(new_quote["quote"]):
        return jsonify({"error": "Quote already exists"}), 409

    new_quote = quote_add(new_quote)

    return jsonify(new_quote), 201

# Delete a quote by ID
@swag_from({
    'tags': ['Quotes'],
    'parameters': [
        {
            'name': 'quote_id',
            'in': 'path',
            'type': 'string',
            'required': True,
            'description': 'ID of the quote to delete'
        }
    ],
    'responses': {
        200: {
            'description': 'Quote deleted successfully',
            'examples': {
                'application/json': {'message': 'Quote deleted successfully'}
            }
        },
        404: {
            'description': 'Quote not found',
            'examples': {
                'application/json': {'error': 'Quote not found'}
            }
        }
    }
})
@app.route("/quotes/delete/<quote_id>", methods=["DELETE"])
def delete_quote(quote_id):
    if not quote_id_exists(quote_id):
        return jsonify({"error": "Quote not found"}), 404
    quote_delete(quote_id)
    return jsonify({"message": "Quote deleted successfully"}), 200

# Get quotes with optional filters
@swag_from({
    'tags': ['Quotes'],
    'parameters': [
        {
            'name': 'character',
            'in': 'query',
            'type': 'string',
            'required': False,
            'description': 'Filter quotes by character name'
        },
        {
            'name': 'tag',
            'in': 'query',
            'type': 'array',
            'items': {'type': 'string'},
            'required': False,
            'description': 'Filter quotes by tag names'
        }
    ],
    'responses': {
        200: {
            'description': 'List of quotes',
            'examples': {
                'application/json': [
                    {
                        "id": "4",
                        "quote": "Do what you can, with what you have, where you are.",
                        "character": "Theodore Roosevelt",
                        "source": "Theodore Roosevelt",
                        "tags": [
                            {"id": "2", "name": "inspiration"},
                            {"id": "3", "name": "life"},
                            {"id": "5", "name": "no moustache"}
                        ]
                    }
                ]
            }
        }
    }
})
@app.route("/quotes", methods=["GET"])
def get_quotes():
    character = request.args.get("character")
    tags = request.args.getlist("tag")

    filtered_quotes = quotes_get(character, tags)
    return jsonify(filtered_quotes), 200

#-----Tags Endpoints-----#

# Add a new tag
@swag_from({
    'tags': ['Tags'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'}
                },
                'required': ['name']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Tag added successfully',
            'examples': {
                'application/json': {"id": "8", "name": "newtag" }
            }
        },
        400: {
            'description': 'Invalid tag data',
            'examples': {
                'application/json': {'error': 'Invalid tag data'}
            }
        },
        409: {
            'description': 'Tag already exists',
            'examples': {
                'application/json': {'error': 'Tag already exists'}
            }
        }
    }
})
@app.route("/tags/add", methods=["POST"])
def add_tag():
    tag_name = request.json.get("name", "").strip()

    if not tag_name:
        return jsonify({"error": "Invalid tag data"}), 400
    
    if tag_name_exists(tag_name):
        return jsonify({"error": "Tag already exists"}), 409

    tag_id = tag_add(tag_name)
    return jsonify({"id": tag_id, "name": tag_name}), 201

# Delete a tag by ID
@swag_from({
    'tags': ['Tags'],
    'parameters': [
        {
            'name': 'tag_id',
            'in': 'path',
            'type': 'string',
            'required': True,
            'description': 'ID of the tag to delete'
        }
    ],
    'responses': {
        200: {
            'description': 'Tag deleted successfully',
            'examples': {
                'application/json': {'message': 'Tag deleted successfully'}
            }
        },
        404: {
            'description': 'Tag not found',
            'examples': {
                'application/json': {'error': 'Tag not found'}
            }
        }
    }
})
@app.route("/tags/delete/<tag_id>", methods=["DELETE"])
def delete_tag(tag_id):
    if not tag_id_exists(tag_id):
        return jsonify({"error": "Tag not found"}), 404
    tag_delete(tag_id)
    return jsonify({"message": "Tag deleted successfully"}), 200

# Get all tags
@swag_from({
    'tags': ['Tags'],
    'parameters': [],
    'responses': {
        200: {
            'description': 'List of tags',
            'examples': {
                'application/json': [
                    {"id": "1", "name": "wisdom"},
                    {"id": "2", "name": "inspiration"},
                    {"id": "3", "name": "life"}
                ]
            }
        }
    }
})
@app.route("/tags", methods=["GET"])
def get_tags():
    all_tags = tags_get()
    return jsonify(all_tags), 200

#-----Characters Endpoint-----#

# Get all characters
@swag_from({
    'tags': ['Characters'],
    'parameters': [],
    'responses': {
        200: {
            'description': 'List of characters',
            'examples': {
                'application/json': [
                    {"id": "1", "name": "Albert Einstein"},
                    {"id": "2", "name": "Isaac Newton"},
                    {"id": "3", "name": "Marie Curie"}
                ]
            }
        }
    }
})
@app.route("/characters", methods=["GET"])
def get_characters():
    all_characters = characters_get()
    return jsonify(all_characters), 200