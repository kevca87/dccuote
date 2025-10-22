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


def test_add_quote_400_invalid_body(client):
    # Missing required fields
    payload = {"quote": "A new test quote"}
    resp = client.post('/quotes/add', data=json.dumps(payload), content_type='application/json')
    assert resp.status_code == 400
    assert resp.get_json().get("error") == "Faltan campos obligatorios"


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
        "character": "Albert Einstein",  # must exist per validator
        "source": "Unit Tests",
        "tags": ["science", "life"]
    }
    resp = client.post('/quotes/add', data=json.dumps(payload), content_type='application/json')
    assert resp.status_code == 201
    data = resp.get_json()
    assert set(data.keys()) == {"id", "quote", "character", "source", "tags"}
    assert isinstance(data["character"], dict)
    assert data["quote"] == payload["quote"]
    assert data["tags"] == payload["tags"]


def test_delete_quote_404_not_found(client):
    resp = client.delete('/quotes/delete/9999')
    assert resp.status_code == 404
    assert resp.get_json().get("error") == "Cita no encontrada"


def test_delete_quote_200_success(client):
    # delete an existing one
    resp = client.delete('/quotes/delete/q0c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3')
    assert resp.status_code == 200
    assert resp.get_json().get("message") == "Cita eliminada con éxito"

    # Verify it was deleted
    resp2 = client.get('/quotes')
    ids = [q["id"] for q in resp2.get_json()]
    assert "q0c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3" not in ids
