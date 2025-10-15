from .tmp_db import *

def quote_daily() -> dict:
    """
    Returns a daily quote
    """
    quote = quotes[3]

    character = next((c for c in characters if c["id"] == quote["character_id"]), None)
    
    tags_labels = []
    for qt in quote_tags:
        if qt["quote_id"] == quote["id"]:
            tag = next((t for t in tags if t["id"] == qt["tag_id"]), None)
            if tag:
                tags_labels.append(tag)
    
    return {
        "id": quote["id"],
        "quote": quote["quote"],
        "character": character["name"],
        "source": quote["source"],
        "tags": tags_labels
    }

def quotes_get_all() -> list:
    """
    Returns all quotes with their characters and tags
    """
    all_quotes = []
    for quote in quotes:
        character = next((c for c in characters if c["id"] == quote["character_id"]), None)
        
        tags_labels = []
        for qt in quote_tags:
            if qt["quote_id"] == quote["id"]:
                tag = next((t for t in tags if t["id"] == qt["tag_id"]), None)
                if tag:
                    tags_labels.append(tag)
        
        all_quotes.append({
            "id": quote["id"],
            "quote": quote["quote"],
            "character": character,
            "source": quote["source"],
            "tags": tags_labels
        })
    return all_quotes

def quotes_get(character_filter: str = None, tags_filter: list = []) -> list:
    """
    Returns all quotes, optionally filtered by character and/or tags
    """
    filtered = quotes_get_all()
    if character_filter:
        filtered = [q for q in filtered if character_filter in q["character"]["name"]]
    if tags_filter:
        aux = []
        for q in filtered:
            quote_tag_names = [t["name"] for t in q["tags"]]
            if all(tag in quote_tag_names for tag in tags_filter):
                aux.append(q)
        filtered = aux
    return filtered

def quote_add(quote: dict) -> None:
    """
    Adds a new quote to the quotes list
    """
    new_quote_id = str(len(quotes) + 1)
    character_id = None
    for char in characters:
        if char["name"] == quote["character"]:
            character_id = char["id"]
            break
    
    if character_id is None:
        character_id = str(len(characters) + 1)
        characters.append({ "id": character_id, "name": quote["character"] })
    
    quotes.append({
        "id": new_quote_id,
        "quote": quote["quote"],
        "character_id": character_id,
        "source": quote["source"]
    })

    if "tags" in quote:
        for tag_name in quote["tags"]:
            tag_id = None
            for tag in tags:
                if tag["name"] == tag_name:
                    tag_id = tag["id"]
                    break
            quote_tags.append({ "quote_id": new_quote_id, "tag_id": tag_id })
    
    return {
        "id": new_quote_id,
        "quote": quote["quote"],
        "character": {'id': character_id, 'name': quote["character"]},
        "source": quote["source"],
        "tags": quote.get("tags", [])
    }

def quote_validate(quote: dict) -> bool:
    """
    Validates the structure of a quote
    """

    # Check for required fields
    required_fields = {"quote", "character", "source"}
    if not all(field in quote for field in required_fields):
        return False
    
    # Validate the quote text
    if not isinstance(quote["quote"], str) or not quote["quote"].strip():
        return False
    
    # Validate the character
    if not isinstance(quote["character"], str) or not quote["character"].strip():
        return False

    character_id = None
    for char in characters:
        if char["name"] == quote["character"]:
            character_id = char["id"]
            break
    if character_id is None:
        return False
    
    # Validate the source
    if not isinstance(quote["source"], str) or not quote["source"].strip():
        return False

    # Validate tags if present
    if "tags" in quote:
        if not isinstance(quote["tags"], list):
            return False
        for tag in quote["tags"]:
            if not isinstance(tag, str) or not tag.strip():
                return False
            if tag not in [t["name"] for t in tags]:
                return False

    return True

def quote_exists(quote_text: str) -> bool:
    """
    Checks if a quote already exists
    """
    return any(q["quote"] == quote_text for q in quotes)

def quote_id_exists(quote_id: str) -> bool:
    """
    Checks if a quote ID exists
    """
    return any(q["id"] == quote_id for q in quotes)

def quote_delete(quote_id: str) -> None:
    """
    Deletes a quote by its ID
    """
    global quotes, quote_tags
    
    quote_tags = [qt for qt in quote_tags if qt["quote_id"] != quote_id]
    quotes = [q for q in quotes if q["id"] != quote_id]