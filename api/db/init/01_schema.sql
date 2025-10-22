-- Schema initialization for DCCuote

CREATE TABLE IF NOT EXISTS characters (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS quotes (
  id TEXT PRIMARY KEY,
  quote TEXT UNIQUE NOT NULL,
  character_id TEXT NOT NULL REFERENCES characters(id) ON DELETE RESTRICT,
  source TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS quote_tag (
  quote_id TEXT NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (quote_id, tag_id)
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_characters_name ON characters (name);
CREATE INDEX IF NOT EXISTS idx_tags_name ON tags (name);
CREATE INDEX IF NOT EXISTS idx_quotes_character_id ON quotes (character_id);
