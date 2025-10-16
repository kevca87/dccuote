import json


def test_get_tags(client):
    resp = client.get('/tags')
    assert resp.status_code == 200
    data = resp.get_json()
    assert isinstance(data, list)
    assert len(data) >= 1
    assert {"id", "name"}.issubset(set(data[0].keys()))


def test_delete_tag_404_not_found(client):
    resp = client.delete('/tags/delete/9999')
    assert resp.status_code == 404
    assert resp.get_json().get("error") == "Etiqueta no encontrada"
