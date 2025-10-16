import importlib
import pytest

# We want a clean in-memory DB for each test. Since tmp_db keeps module-level
# lists, we reload it and its dependents between tests.

def _reload_app_modules():
    # Reload tmp_db first, then modules that import it, then app
    from src.scripts import tmp_db as tmp_db
    import src.app as app_module

    importlib.reload(tmp_db)
    importlib.reload(app_module)

    return app_module


@pytest.fixture()
def client():
    app_module = _reload_app_modules()
    app = app_module.app
    app.testing = True
    with app.test_client() as client:
        yield client
