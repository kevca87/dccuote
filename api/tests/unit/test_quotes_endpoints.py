import json

def test_daily_quote(client):
    resp = client.get('/quotes/daily')
    assert resp.status_code == 200
    data = resp.get_json()
    assert set(data.keys()) == {"id", "quote", "character", "source", "tags"}
    assert isinstance(data["character"], dict)
    assert {"id", "name"}.issubset(set(data["character"].keys()))
    assert isinstance(data["tags"], list)
    for t in data["tags"]:
        assert "id" in t and "name" in t

def test_get_daily_quote_no_quotes(client):
    # First, delete all quotes
    resp_del = client.get('/quotes')
    quotes = resp_del.get_json()
    for q in quotes:
        client.delete(f'/quotes/delete/{q["id"]}')

    # Now, request daily quote
    resp = client.get('/quotes/daily')
    assert resp.status_code == 200
    data = resp.get_json()
    assert data == {}

def test_add_quote_400_invalid_body_no_fields(client):
    payload = {"quote": "A new test quote"}
    resp = client.post('/quotes/add', data=json.dumps(payload), content_type='application/json')
    assert resp.status_code == 400
    assert resp.get_json().get("error") == "Faltan campos obligatorios"

def test_add_quote_400_invalid_body_empty_quote(client):
    payload = {"quote": "", "character": "Albert Einstein", "source": "Albert Einstein"}
    resp = client.post('/quotes/add', data=json.dumps(payload), content_type='application/json')
    assert resp.status_code == 400
    assert resp.get_json().get("error") == "El texto de la cita no es válido"

def test_add_quote_400_invalid_body_empty_character(client):
    payload = {"quote": "A new test quote", "character": "", "source": "Albert Einstein"}
    resp = client.post('/quotes/add', data=json.dumps(payload), content_type='application/json')
    assert resp.status_code == 400
    assert resp.get_json().get("error") == "El nombre del personaje no es válido"

def test_add_quote_400_invalid_body_empty_source(client):
    payload = {"quote": "A new test quote", "character": "Albert Einstein", "source": ""}
    resp = client.post('/quotes/add', data=json.dumps(payload), content_type='application/json')
    assert resp.status_code == 400
    assert resp.get_json().get("error") == "La fuente no es válida"

def test_add_quote_400_invalid_body_wrong_tags_type(client):
    payload = {
        "quote": "A new test quote",
        "character": "Albert Einstein",
        "source": "Albert Einstein",
        "tags": "not-a-list"
    }
    resp = client.post('/quotes/add', data=json.dumps(payload), content_type='application/json')
    assert resp.status_code == 400
    assert resp.get_json().get("error") == "Los tags deben ser una lista"

def test_add_quote_400_invalid_body_empty_tag_name(client):
    payload = {
        "quote": "A new test quote",
        "character": "Albert Einstein",
        "source": "Albert Einstein",
        "tags": ["valid-tag", ""]
    }
    resp = client.post('/quotes/add', data=json.dumps(payload), content_type='application/json')
    assert resp.status_code == 400
    assert resp.get_json().get("error") == "Los tags deben ser cadenas no vacías"


def test_add_quote_409_duplicate(client):
    # Reuse an existing quote text from tmp_db
    payload = {
        "quote": "Life is like riding a bicycle. To keep your balance you must keep moving.",
        "character": "Albert Einstein",
        "source": "Albert Einstein"
    }
    resp = client.post('/quotes/add', data=json.dumps(payload), content_type='application/json')
    assert resp.status_code == 409
    assert resp.get_json().get("error") == "La cita ya existe"


def test_add_quote_201_success(client):
    payload = {
        "quote": "Testing makes software better.",
        "character": "Juan Pablo Sandoval",
        "source": "Unit Tests",
        "tags": ["science", "life", "simple"]
    }
    resp = client.post('/quotes/add', data=json.dumps(payload), content_type='application/json')
    assert resp.status_code == 201
    data = resp.get_json()
    assert set(data.keys()) == {"id", "quote", "character", "source", "tags"}
    assert isinstance(data["character"], dict)
    assert data["quote"] == payload["quote"]
    for t in data["tags"]:
        assert t["name"] in payload["tags"]

def test_delete_quote_404_not_found(client):
    resp = client.delete('/quotes/delete/9999')
    assert resp.status_code == 404
    assert resp.get_json().get("error") == "Cita no encontrada"

def test_delete_quote_200_success(client):
    resp = client.delete('/quotes/delete/q0c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3')
    assert resp.status_code == 200
    assert resp.get_json().get("message") == "Cita eliminada con éxito"

    resp2 = client.get('/quotes')
    ids = [q["id"] for q in resp2.get_json()]
    assert "q0c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3" not in ids

def test_add_tags_to_quote_404_quote_not_found(client):
    payload = {
        "tags": [{"id": "t1"}, {"id": "t2"}]
    }
    resp = client.post('/quotes/nonexistent-quote-id/tags', data=json.dumps(payload), content_type='application/json')
    assert resp.status_code == 404
    assert resp.get_json().get("error") == "Cita no encontrada"

def test_add_tags_to_quote_400_no_tags_provided(client):
    payload = {}
    resp = client.post('/quotes/q1f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4/tags', data=json.dumps(payload), content_type='application/json')
    assert resp.status_code == 400
    assert resp.get_json().get("error") == "No se proporcionó ninguna etiqueta"

def test_add_tags_to_quote_400_invalid_format_tags_type(client):
    payload = {
        "tags": "not-a-list"
    }
    resp = client.post('/quotes/q1f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4/tags', data=json.dumps(payload), content_type='application/json')
    assert resp.status_code == 400
    assert resp.get_json().get("error") == "El formato de las etiquetas es inválido"

def test_add_tags_to_quote_400_invalid_format_tags_item(client):
    payload = {
        "tags": ["item1", 2]
    }
    resp = client.post('/quotes/q1f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4/tags', data=json.dumps(payload), content_type='application/json')
    assert resp.status_code == 400
    assert resp.get_json().get("error") == "El formato de las etiquetas es inválido"

def test_add_tags_to_quote_200_success(client):
    payload = {
        "tags": ["t1", "fantasy"]
    }
    resp = client.post('/quotes/q1f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4/tags', data=json.dumps(payload), content_type='application/json')
    assert resp.status_code == 201
    tags = resp.get_json()
    for t in payload["tags"]:
        assert t in [tag["name"] for tag in tags]

def test_get_quotes_no_filters(client):
    resp = client.get('/quotes')
    assert resp.status_code == 200
    data = resp.get_json()
    assert isinstance(data, list)
    assert len(data) >= 1
    sample = data[0]
    # Shape returned by scripts.quotes.quotes_get_all: character is an object
    assert set(sample.keys()) == {"id", "quote", "character", "source", "tags"}
    assert isinstance(sample["character"], dict)
    assert {"id", "name"}.issubset(set(sample["character"].keys()))


def test_get_quotes_filter_by_character(client):
    resp = client.get('/quotes?character=Albert')
    assert resp.status_code == 200
    data = resp.get_json()
    assert len(data) >= 1
    assert all("Albert" in q["character"]["name"] for q in data)


def test_get_quotes_filter_by_tags_all_match(client):
    # Expect only quotes that have both 'inspiration' and 'wisdom'
    resp = client.get('/quotes?tag=inspiration&tag=wisdom')
    assert resp.status_code == 200
    data = resp.get_json()
    assert len(data) >= 1
    for q in data:
        tag_names = [t["name"] for t in q["tags"]]
        assert "inspiration" in tag_names and "wisdom" in tag_names

def test_get_quote_404_not_found(client):
    resp = client.get('/quotes/nonexistent-quote-id')
    assert resp.status_code == 404
    assert resp.get_json().get("error") == "Cita no encontrada"

def test_get_quote_200_success(client):
    resp = client.get('/quotes/q1f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4')
    assert resp.status_code == 200
    data = resp.get_json()
    assert set(data.keys()) == {"id", "quote", "character", "source", "tags"}
    assert data["id"] == "q1f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4"
    assert isinstance(data["character"], dict)
    assert {"id", "name"}.issubset(set(data["character"].keys()))
    assert isinstance(data["tags"], list)
    for t in data["tags"]:
        assert "id" in t and "name" in t