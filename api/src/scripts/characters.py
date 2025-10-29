from src.models.models import Character, Quote
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import select

def characters_get(db: SQLAlchemy) -> list:
    """
    Returns all characters
    """
    characters = db.session.execute(select(Character)).scalars().all()
    return [{'id': c.id, 'name': c.name} for c in characters]

def character_id_exists(db: SQLAlchemy, character_id: int) -> bool:
    """
    Checks if a character with the given ID exists
    """
    character = db.session.get(Character, character_id)
    return character is not None

def character_has_quotes(db: SQLAlchemy, character_id: int) -> bool:
    """
    Checks if a character has associated quotes
    """
    quotes = db.session.execute(
        select(Quote).where(Quote.character_id == character_id)
    ).scalars().first()
    return quotes is not None

def character_delete(db: SQLAlchemy, character_id: int) -> None:
    """
    Deletes a character with the given ID
    """
    character = db.session.get(Character, character_id)
    if character:
        db.session.delete(character)
        db.session.commit()