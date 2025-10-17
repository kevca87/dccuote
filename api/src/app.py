from flask import Flask, request, jsonify
from flasgger import Swagger, swag_from
from src.scripts.quotes import *
from src.scripts.tags import *
from src.scripts.characters import *
from flask_cors import CORS

app = Flask(__name__)
Swagger(app)
CORS(app)

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
                    "character": {"id": "2", "name": "Theodore Roosevelt"},
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
    validation = quote_validate(new_quote)
    if not validation['is_valid']:
        return jsonify({"error": validation['error']}), 400
    
    if quote_exists(new_quote["quote"]):
        return jsonify({"error": "La cita ya existe"}), 409

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
        return jsonify({"error": "Cita no encontrada"}), 404
    quote_delete(quote_id)
    return jsonify({"message": "Cita eliminada con éxito"}), 200

@swag_from({
    'tags': ['Quotes'],
    'parameters': [
        {
            'name': 'quote_id',
            'in': 'path',
            'type': 'string',
            'required': True,
            'description': 'ID of the quote to add tags to'
        },
        {
            'name': 'tag',
            'in': 'query',
            'type': 'array',
            'items': {'type': 'string'},
            'required': True,
            'description': 'Tag names to add to the quote'
        }
    ],
    'responses': {
        201: {
            'description': 'Tags added to quote successfully',
            'examples': {
                'application/json': {'message': 'Tags added to quote successfully'}
            }
        },
        400: {
            'description': 'No tag provided',
            'examples': {
                'application/json': {'error': 'No tag provided'}
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
@app.route("/quotes/<quote_id>/tags", methods=["POST"])
def add_tag_to_quote(quote_id):
    if not quote_id_exists(quote_id):
        return jsonify({"error": "Cita no encontrada"}), 404

    tag_name = request.args.getlist("tag")
    if not tag_name:
        return jsonify({"error": "No se proporcionó ninguna etiqueta"}), 400

    for tag in tag_name:
        if not tag_name_exists(tag):
            tag_id = tag_add(tag)
        else:
            tag_id = tag_id_get_by_name(tag)
        quote_tag_add(quote_id, tag_id)
    return jsonify({"message": "Etiquetas añadidas a la cita con éxito"}), 201

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

@swag_from({
    'tags': ['Quotes'],
    'parameters': [
        {
            'name': 'quote_id',
            'in': 'path',
            'type': 'string',
            'required': True,
            'description': 'ID of the quote to retrieve'
        }
    ],
    'responses': {
        200: {
            'description': 'Quote details',
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
        },
        404: {
            'description': 'Quote not found',
            'examples': {
                'application/json': {'error': 'Quote not found'}
            }
        }
    }
})
@app.route("/quotes/<quote_id>", methods=["GET"])
def get_quote(quote_id):
    quote = quote_get_by_id(quote_id)
    if quote is None:
        return jsonify({"error": "Cita no encontrada"}), 404
    return jsonify(quote), 200

#-----Tags Endpoints-----#

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
        return jsonify({"error": "Etiqueta no encontrada"}), 404
    tag_delete(tag_id)
    return jsonify({"message": "Etiqueta eliminada con éxito"}), 200

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

if __name__ == "__main__":
    app.run(debug=True)