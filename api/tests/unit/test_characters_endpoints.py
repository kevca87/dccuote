
def test_get_characters_200_success(client):
    resp = client.get('/characters')
    assert resp.status_code == 200
    data = resp.get_json()
    assert isinstance(data, list)
    assert len(data) == 9
    assert {"id", "name"}.issubset(set(data[0].keys()))

def test_delete_character_404_not_found(client):
    resp = client.delete('/characters/delete/9999')
    assert resp.status_code == 404
    assert resp.get_json().get("error") == "Personaje no encontrado"

def test_delete_character_400_has_quotes(client):
    resp = client.delete('/characters/delete/c1e5d9a8b7f6e4c3d2a1b0c9d8e7f6a5')
    assert resp.status_code == 400
    assert resp.get_json().get("error") == "No se puede eliminar un personaje con citas asociadas"

def test_delete_character_200_success(client):
    resp = client.delete('/characters/delete/c9g3f7b6a5f4e3d2c1b0a9f8e7d6c5b4')
    assert resp.status_code == 200
    assert resp.get_json().get("message") == "Personaje eliminado con éxito"

    resp2 = client.get('/characters')
    ids = [c["id"] for c in resp2.get_json()]
    assert 'c9g3f7b6a5f4e3d2c1b0a9f8e7d6c5b4' not in ids