

def test_get_characters(client):
    resp = client.get('/characters')
    assert resp.status_code == 200
    data = resp.get_json()
    assert isinstance(data, list)
    assert len(data) >= 1
    assert {"id", "name"}.issubset(set(data[0].keys()))
