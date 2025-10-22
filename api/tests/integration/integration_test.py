def test_get_quotes_and_delete_them(client):
    resp = client.get('/quotes')
    assert resp.status_code == 200
    data = resp.get_json()

    for quote in data:
        resp = client.delete(f'/quotes/delete/{quote["id"]}')
        assert resp.status_code == 200
    resp = client.get('/quotes')
    assert resp.status_code == 200
    data = resp.get_json()
    assert len(data) == 0
