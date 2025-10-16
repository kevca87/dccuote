from .tmp_db import *

def tag_add(tag_name: str) -> str:
    """
    Adds a new tag if it doesn't exist
    and returns its ID.
    """
    new_tag_id = str(len(tags) + 1)
    tags.append({ "id": new_tag_id, "name": tag_name })
    return new_tag_id

def tag_name_exists(tag_name: str) -> bool:
    """
    Checks if a tag name already exists
    """
    return any(t["name"] == tag_name for t in tags)

def tag_id_exists(tag_id: str) -> bool:
    """
    Checks if a tag ID exists
    """
    return any(t["id"] == tag_id for t in tags)

def tag_delete(tag_id: str) -> None:
    """
    Deletes a tag by ID
    """
    global tags, quote_tags
    quote_tags = [qt for qt in quote_tags if qt["tag_id"] != tag_id]
    tags = [t for t in tags if t["id"] != tag_id]

def tags_get() -> list:
    """
    Returns all tags
    """
    return tags

def tag_id_get_by_name(tag_name: str) -> str | None:
    """
    Returns a tag id by name or None if not found
    """
    for t in tags:
        if t["name"] == tag_name:
            return t["id"]
    return None