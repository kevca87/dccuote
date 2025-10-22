from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import select
from src.models.models import Quote, Character, Tag, QuoteTag
from .tags import tag_add
import hashlib


def quote_daily(db: SQLAlchemy) -> dict:
    """
    Returns a daily quote
    """
    stmt = select(Quote).order_by(Quote.id)
    quote = db.session.execute(stmt).scalars().first()

    # If no quote found, return empty dict
    if quote is None:
        return {}

    character = db.session.execute(select(Character).filter_by(id=quote.character_id)).scalars().first()
    
    tags_labels = db.session.execute(
        select(Tag).join(QuoteTag, Tag.id == QuoteTag.tag_id).filter(QuoteTag.quote_id == quote.id)
    ).scalars().all()

    tags_labels = [ {'id': tag.id, 'name': tag.name} for tag in tags_labels ]
    
    return {
        "id": quote.id,
        "quote": quote.quote,
        "character": {'id': character.id, 'name': character.name} if character else None,
        "source": quote.source,
        "tags": tags_labels
    }

def quotes_get_all(db: SQLAlchemy) -> list:
    """
    Returns all quotes with their characters and tags
    """
    all_quotes = []
    quotes = db.session.execute(select(Quote)).scalars().all()
    for quote in quotes:
        character = db.session.execute(select(Character).filter_by(id=quote.character_id)).scalars().first()
        
        tags_labels = []
        tags = db.session.execute(
            select(Tag).join(QuoteTag, Tag.id == QuoteTag.tag_id).filter(QuoteTag.quote_id == quote.id)
        ).scalars().all()
        for tag in tags:
            tags_labels.append({'id': tag.id, 'name': tag.name})

        all_quotes.append({
            "id": quote.id,
            "quote": quote.quote,
            "character": {'id': character.id, 'name': character.name} if character else None,
            "source": quote.source,
            "tags": tags_labels
        })
    return all_quotes

def quotes_get(db: SQLAlchemy, character_filter: str = None, tags_filter: list = []) -> list:
    """
    Returns all quotes, optionally filtered by character and/or tags
    """
    filtered = quotes_get_all(db)
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

def quote_get_by_id(db: SQLAlchemy, quote_id: str) -> dict | None:
    """
    Returns a quote by its ID, or None if not found
    """
    quote = db.session.execute(select(Quote).filter_by(id=quote_id)).scalars().first()
    if quote is None:
        return None

    character = db.session.execute(select(Character).filter_by(id=quote.character_id)).scalars().first()
    
    tags_labels = []
    tags = db.session.execute(
        select(Tag).join(QuoteTag, Tag.id == QuoteTag.tag_id).filter(QuoteTag.quote_id == quote.id)
    ).scalars().all()
    for tag in tags:
        tags_labels.append({'id': tag.id, 'name': tag.name})

    return {
        "id": quote.id,
        "quote": quote.quote,
        "character": {'id': character.id, 'name': character.name} if character else None,
        "source": quote.source,
        "tags": tags_labels
    }

def quote_add(db: SQLAlchemy, quote: dict) -> None:
    """
    Adds a new quote to the quotes list
    """
    new_quote_id = hashlib.sha256(quote["quote"].encode()).hexdigest()
    character = db.session.execute(select(Character).filter(Character.name == quote["character"])).scalars().first()
    character_id = character.id if character else None
    
    if character_id is None:
        character_id = hashlib.sha256(quote["character"].encode()).hexdigest()
        db.session.add(Character(id=character_id, name=quote["character"]))
    
    db.session.add(Quote(id=new_quote_id, quote=quote["quote"], character_id=character_id, source=quote["source"]))

    if "tags" in quote:
        for tag_name in quote["tags"]:
            tag = db.session.execute(select(Tag).filter(Tag.name == tag_name)).scalars().first()
            tag_id = tag.id if tag else None
            if tag_id is None:
                tag_id = tag_add(db, tag_name)
            db.session.add(QuoteTag(quote_id=new_quote_id, tag_id=tag_id))

    db.session.commit()
    return {
        "id": new_quote_id,
        "quote": quote["quote"],
        "character": {'id': character_id, 'name': quote["character"]},
        "source": quote["source"],
        "tags": quote.get("tags", [])
    }

def quote_validate(quote: dict) -> dict:
    """
    Validates the structure of a quote
    """

    # Check for required fields
    required_fields = {"quote", "character", "source"}
    if not all(field in quote for field in required_fields):
        return {"is_valid": False, "error": "Faltan campos obligatorios"}
    
    # Validate the quote text
    if not isinstance(quote["quote"], str) or not quote["quote"].strip():
        return {"is_valid": False, "error": "El texto de la cita no es válido"}

    # Validate the character
    if not isinstance(quote["character"], str) or not quote["character"].strip():
        return {"is_valid": False, "error": "El nombre del personaje no es válido"}
    
    # Validate the source
    if not isinstance(quote["source"], str) or not quote["source"].strip():
        return {"is_valid": False, "error": "La fuente no es válida"}

    # Validate tags if present
    if "tags" in quote:
        new_tags = []
        if not isinstance(quote["tags"], list):
            return {"is_valid": False, "error": "Los tags deben ser una lista"}
        for tag in quote["tags"]:
            if not isinstance(tag, str) or not tag.strip():
                return {"is_valid": False, "error": "Los tags deben ser cadenas no vacías"}

    return {"is_valid": True}

def quote_exists(db: SQLAlchemy, quote_text: str) -> bool:
    """
    Checks if a quote already exists
    """
    stmt = select(Quote).filter(Quote.quote == quote_text)
    existing_quote = db.session.execute(stmt).scalars().first()
    return existing_quote is not None

def quote_id_exists(db: SQLAlchemy, quote_id: str) -> bool:
    """
    Checks if a quote ID exists
    """
    quote = db.session.execute(select(Quote).filter(Quote.id == quote_id)).scalars().first()
    return quote is not None

def quote_delete(db: SQLAlchemy, quote_id: str) -> None:
    """
    Deletes a quote by its ID
    """
    quote = db.session.execute(select(Quote).filter(Quote.id == quote_id)).scalars().first()
    if quote:
        db.session.delete(quote)
        db.session.commit()

def quote_tag_exists(db: SQLAlchemy, quote_id: str, tag_id: str) -> bool:
    """
    Checks if a tag is already associated with a quote
    """
    stmt = select(QuoteTag).filter(QuoteTag.quote_id == quote_id, QuoteTag.tag_id == tag_id)
    existing_qt = db.session.execute(stmt).scalars().first()
    return existing_qt is not None

def quote_tag_add(db: SQLAlchemy, quote_id: str, tag_id: str) -> None:
    """
    Adds a tag to a quote
    """
    if not quote_tag_exists(db, quote_id, tag_id):
        db.session.add(QuoteTag(quote_id=quote_id, tag_id=tag_id))