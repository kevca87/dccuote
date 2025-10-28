from src.models.models import Character
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import select

def characters_get(db: SQLAlchemy) -> list:
    """
    Returns all characters
    """
    characters = db.session.execute(select(Character)).scalars().all()
    return [{'id': c.id, 'name': c.name} for c in characters]