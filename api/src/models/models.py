from sqlalchemy.orm import DeclarativeBase, relationship
from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Text, BigInteger
from sqlalchemy.schema import PrimaryKeyConstraint, ForeignKeyConstraint

class Base(DeclarativeBase):
    pass

class Character(Base):
    __tablename__ = 'characters'

    id = Column(String, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

class Tag(Base):
    __tablename__ = 'tags'

    id = Column(String, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

class Quote(Base):
    __tablename__ = 'quotes'

    id = Column(String, primary_key=True, index=True)
    quote = Column(Text)
    character_id = Column(String, ForeignKey('characters.id'))
    source = Column(String)

class QuoteTag(Base):
    __tablename__ = 'quote_tag'

    quote_id = Column(String, ForeignKey('quotes.id'))
    tag_id = Column(String, ForeignKey('tags.id'))

    __table_args__ = (
        PrimaryKeyConstraint('quote_id', 'tag_id'),
    )

    