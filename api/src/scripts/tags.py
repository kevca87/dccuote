from flask_sqlalchemy import SQLAlchemy
from src.models.models import Quote, Character, Tag, QuoteTag
from sqlalchemy import select
import hashlib

def tag_add(db: SQLAlchemy, tag_name: str) -> str:
    """
    Adds a new tag if it doesn't exist
    and returns its ID.
    """
    new_tag_id = hashlib.sha256(tag_name.encode()).hexdigest()
    db.session.add(Tag(id=new_tag_id, name=tag_name))
    db.session.commit()
    return new_tag_id

def tag_name_exists(db: SQLAlchemy, tag_name: str) -> bool:
    """
    Checks if a tag name already exists
    """
    return db.session.execute(select(Tag).filter(Tag.name == tag_name)).scalars().first() is not None

def tag_id_exists(db: SQLAlchemy, tag_id: str) -> bool:
    """
    Checks if a tag ID exists
    """
    return db.session.execute(select(Tag).filter(Tag.id == tag_id)).scalars().first() is not None

def tag_delete(db: SQLAlchemy, tag_id: str) -> None:
    """
    Deletes a tag by ID
    """
    db.session.execute(select(Tag).filter(Tag.id == tag_id)).delete()
    db.session.commit()

def tags_get(db: SQLAlchemy) -> list:
    """
    Returns all tags
    """
    tags = db.session.execute(select(Tag)).scalars().all()
    return [{'id': t.id, 'name': t.name} for t in tags]

def tag_id_get_by_name(db: SQLAlchemy, tag_name: str) -> str | None:
    """
    Returns a tag id by name or None if not found
    """
    return db.session.execute(select(Tag.id).filter(Tag.name == tag_name)).scalars().first()