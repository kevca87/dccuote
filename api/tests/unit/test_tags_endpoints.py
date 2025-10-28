
def test_delete_tag_404_not_found(client):
    resp = client.delete('/tags/delete/9999')
    assert resp.status_code == 404
    assert resp.get_json().get("error") == "Etiqueta no encontrada"

def test_delete_tag_200_success(client):
    resp = client.delete('/tags/delete/t1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6')
    assert resp.status_code == 200
    assert resp.get_json().get("message") == "Etiqueta eliminada con éxito"

def test_get_all_tags(client):
    resp = client.get('/tags')
    assert resp.status_code == 200
    tags = resp.get_json()
    assert isinstance(tags, list)
    assert len(tags) == 7
    expected_tag_names = {"science", "inspiration", "life", "moustache", "no moustache", "fantasy", "wisdom"}
    assert expected_tag_names.issubset(set(tag["name"] for tag in tags))