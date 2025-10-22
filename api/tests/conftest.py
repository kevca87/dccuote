import importlib
import pytest
import src.app as app_module
import os

@pytest.fixture()
def client():
    app = app_module.app
    app.testing = True
    with app.test_client() as client:
        yield client

@pytest.fixture(autouse=True)
def reset_db():
    app = app_module.app
    db = app_module.db
    with app.app_context():
        conn = db.engine.raw_connection()
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM quote_tag;")
        cursor.execute("DELETE FROM quotes;")
        cursor.execute("DELETE FROM tags;")
        cursor.execute("DELETE FROM characters;")
        
        seed_path = os.path.join(os.path.dirname(__file__), '../db/init/02_seed.sql')
        with open(seed_path, 'r') as f:
            seed_sql = f.read()
        
        for statement in seed_sql.split(';'):
            stmt = statement.strip()
            if stmt:
                cursor.execute(stmt)
        conn.commit()
        cursor.close()
        conn.close()
