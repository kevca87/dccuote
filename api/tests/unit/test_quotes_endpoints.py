
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