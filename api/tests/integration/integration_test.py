def test_create_quote_with_new_character_add_tags_and_retrieve(client):
    """Test: Create a quote with a new character, add tags to it, then retrieve it by ID"""
    # 1. Get all characters to verify new one will be created
    resp = client.get('/characters')
    assert resp.status_code == 200
    initial_characters = resp.get_json()
    initial_char_count = len(initial_characters)
    
    # 2. Add a new quote with a new character
    new_quote_data = {
        "quote": "The only true wisdom is in knowing you know nothing.",
        "character": "Socrates",
        "source": "Plato's Apology",
        "tags": ["philosophy", "wisdom"]
    }
    resp = client.post('/quotes/add', json=new_quote_data)
    assert resp.status_code == 201
    created_quote = resp.get_json()
    quote_id = created_quote['id']
    
    # 3. Verify character was created
    resp = client.get('/characters')
    assert resp.status_code == 200
    updated_characters = resp.get_json()
    assert len(updated_characters) == initial_char_count + 1
    
    # 4. Retrieve the quote by ID and verify tags
    resp = client.get(f'/quotes/{quote_id}')
    assert resp.status_code == 200
    retrieved_quote = resp.get_json()
    assert retrieved_quote['quote'] == new_quote_data['quote']
    assert len(retrieved_quote['tags']) == 2
    tag_names = [tag['name'] for tag in retrieved_quote['tags']]
    assert 'philosophy' in tag_names
    assert 'wisdom' in tag_names


def test_filter_quotes_by_character_and_tags_then_delete(client):
    """Test: Filter quotes by character, filter by tags, then delete filtered quotes"""
    # 1. Get all quotes by a specific character
    resp = client.get('/quotes?character=Albert Einstein')
    assert resp.status_code == 200
    einstein_quotes = resp.get_json()
    assert len(einstein_quotes) > 0
    
    # 2. Get all quotes with specific tags
    resp = client.get('/quotes?tag=science&tag=inspiration')
    assert resp.status_code == 200
    tagged_quotes = resp.get_json()
    assert len(tagged_quotes) > 0
    
    # 3. Get all tags to verify state
    resp = client.get('/tags')
    assert resp.status_code == 200
    all_tags = resp.get_json()
    initial_tag_count = len(all_tags)
    
    # 4. Delete one of the filtered quotes
    quote_to_delete = einstein_quotes[0]['id']
    resp = client.delete(f'/quotes/delete/{quote_to_delete}')
    assert resp.status_code == 200
    
    # 5. Verify quote was deleted
    resp = client.get(f'/quotes/{quote_to_delete}')
    assert resp.status_code == 404


def test_add_quote_add_more_tags_retrieve_and_verify(client):
    """Test: Add a quote, add additional tags to it, retrieve all tags, and verify the quote"""
    # 1. Create a new quote with initial tags
    new_quote_data = {
        "quote": "To be or not to be, that is the question.",
        "character": "William Shakespeare",
        "source": "Hamlet",
        "tags": ["literature"]
    }
    resp = client.post('/quotes/add', json=new_quote_data)
    assert resp.status_code == 201
    created_quote = resp.get_json()
    quote_id = created_quote['id']
    
    # 2. Add more tags to the quote
    resp = client.post(f'/quotes/{quote_id}/tags', json={"tags": ["drama", "philosophy"]})
    assert resp.status_code == 201
    
    # 3. Get all tags and verify new tags exist
    resp = client.get('/tags')
    assert resp.status_code == 200
    all_tags = resp.get_json()
    tag_names = [tag['name'] for tag in all_tags]
    assert 'literature' in tag_names
    assert 'drama' in tag_names
    assert 'philosophy' in tag_names
    
    # 4. Retrieve the quote and verify all tags are present
    resp = client.get(f'/quotes/{quote_id}')
    assert resp.status_code == 200
    retrieved_quote = resp.get_json()
    quote_tag_names = [tag['name'] for tag in retrieved_quote['tags']]
    assert len(quote_tag_names) == 3
    assert 'literature' in quote_tag_names
    assert 'drama' in quote_tag_names
    assert 'philosophy' in quote_tag_names


def test_daily_quote_delete_tag_and_verify_character_list(client):
    """Test: Get daily quote, delete one of its tags, verify characters list"""
    # 1. Get the daily quote
    resp = client.get('/quotes/daily')
    assert resp.status_code == 200
    daily_quote = resp.get_json()
    assert 'id' in daily_quote
    assert 'tags' in daily_quote
    initial_tag_count = len(daily_quote['tags'])
    
    # 2. Get all tags
    resp = client.get('/tags')
    assert resp.status_code == 200
    all_tags = resp.get_json()
    total_tags_before = len(all_tags)
    
    # 3. Delete one tag from the system
    if initial_tag_count > 0:
        tag_to_delete = daily_quote['tags'][0]['id']
        resp = client.delete(f'/tags/delete/{tag_to_delete}')
        assert resp.status_code == 200
        
        # 4. Verify tag was deleted
        resp = client.get('/tags')
        assert resp.status_code == 200
        all_tags_after = resp.get_json()
        assert len(all_tags_after) == total_tags_before - 1
    
    # 5. Get all characters and verify list is accessible
    resp = client.get('/characters')
    assert resp.status_code == 200
    characters = resp.get_json()
    assert len(characters) > 0
    assert all('id' in char and 'name' in char for char in characters)


def test_full_quote_lifecycle_with_filtering(client):
    """Test: Create quote, filter by it, add tags, filter again, then delete"""
    # 1. Get initial quote count
    resp = client.get('/quotes')
    assert resp.status_code == 200
    initial_quotes = resp.get_json()
    initial_count = len(initial_quotes)
    
    # 2. Create a new quote with unique character
    new_quote_data = {
        "quote": "I think, therefore I am.",
        "character": "René Descartes",
        "source": "Discourse on the Method",
        "tags": ["philosophy"]
    }
    resp = client.post('/quotes/add', json=new_quote_data)
    assert resp.status_code == 201
    created_quote = resp.get_json()
    quote_id = created_quote['id']
    
    # 3. Filter quotes by the new character
    resp = client.get('/quotes?character=René Descartes')
    assert resp.status_code == 200
    filtered_quotes = resp.get_json()
    assert len(filtered_quotes) == 1
    assert filtered_quotes[0]['id'] == quote_id
    
    # 4. Add more tags to the quote
    resp = client.post(f'/quotes/{quote_id}/tags', json={"tags": ["rationalism", "epistemology"]})
    assert resp.status_code == 201
    
    # 5. Filter by one of the new tags
    resp = client.get('/quotes?tag=rationalism')
    assert resp.status_code == 200
    tag_filtered_quotes = resp.get_json()
    quote_ids = [q['id'] for q in tag_filtered_quotes]
    assert quote_id in quote_ids
    
    # 6. Delete the quote
    resp = client.delete(f'/quotes/delete/{quote_id}')
    assert resp.status_code == 200
    
    # 7. Verify total quote count is back to initial
    resp = client.get('/quotes')
    assert resp.status_code == 200
    final_quotes = resp.get_json()
    assert len(final_quotes) == initial_count

