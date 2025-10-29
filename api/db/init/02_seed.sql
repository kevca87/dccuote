-- Insert characters
INSERT INTO characters (id, name) VALUES
  ('c1e5d9a8b7f6e4c3d2a1b0c9d8e7f6a5', 'Albert Einstein'),
  ('c2f6e0b9c8a7d5e4f3b2a1c0d9e8f7b6', 'Isaac Newton'),
  ('c3a7f1c0d9b8e6f5a4c3b2a1d0e9f8c7', 'Marie Curie'),
  ('c4b8a2d1e0c9f7a6b5d4c3b2e1f0a9d8', 'Theodore Roosevelt'),
  ('c5c9b3e2f1d0a8b7c6e5d4c3f2a1b0e9', 'Gandalf'),
  ('c6d0c4f3a2e1b9c8d7f6e5d4a3b2c1f0', 'Elend Venture'),
  ('c7e1d5a4b3c2f0e9d8c7b6a5f4e3d2c1', 'Sazed'),
  ('c8f2e6b5c4d3a1f0e9d8c7b6a5f4e3d2', 'Uncle Iroh'),
  ('c9g3f7b6a5f4e3d2c1b0a9f8e7d6c5b4', 'Aang');

-- Insert tags
INSERT INTO tags (id, name) VALUES
  ('t1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6', 'science'),
  ('t2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7', 'inspiration'),
  ('t3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8', 'life'),
  ('t4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9', 'moustache'),
  ('t5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0', 'no moustache'),
  ('t6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1', 'fantasy'),
  ('t7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2', 'wisdom')
ON CONFLICT (name) DO NOTHING;

-- Insert quotes
INSERT INTO quotes (id, quote, character_id, source) VALUES
  ('q1f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4', 'Life is like riding a bicycle. To keep your balance you must keep moving.', 'c1e5d9a8b7f6e4c3d2a1b0c9d8e7f6a5', 'Albert Einstein'),
  ('q2a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5', 'If I have seen further it is by standing on the shoulders of Giants.', 'c2f6e0b9c8a7d5e4f3b2a1c0d9e8f7b6', 'Isaac Newton'),
  ('q3b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6', 'Nothing in life is to be feared, it is only to be understood.', 'c3a7f1c0d9b8e6f5a4c3b2a1d0e9f8c7', 'Marie Curie'),
  ('q4c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7', 'Do what you can, with what you have, where you are.', 'c4b8a2d1e0c9f7a6b5d4c3b2e1f0a9d8', 'Theodore Roosevelt'),
  ('q5d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8', 'All we have to decide is what to do with the time that is given us.', 'c5c9b3e2f1d0a8b7c6e5d4c3f2a1b0e9', 'Lord of the Rings'),
  ('q6e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9', 'In the end, they will kill us. But first, they shall fear us!', 'c6d0c4f3a2e1b9c8d7f6e5d4a3b2c1f0', 'Mistborn'),
  ('q7f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0', 'Our belief is often strongest when it should be weakest. That is the nature of hope.', 'c7e1d5a4b3c2f0e9d8c7b6a5f4e3d2c1', 'Mistborn'),
  ('q9b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2', 'Life happens wherever you are, whether you make it or not.', 'c8f2e6b5c4d3a1f0e9d8c7b6a5f4e3d2', 'Avatar: The Last Airbender'),
  ('q0c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3', 'Sometimes the best way to solve your own problems is to help someone else.', 'c8f2e6b5c4d3a1f0e9d8c7b6a5f4e3d2', 'Avatar: The Last Airbender')
ON CONFLICT (quote) DO NOTHING;

-- Insert quote_tag relationships
INSERT INTO quote_tag (quote_id, tag_id) VALUES
  ('q1f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4', 't1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6'),
  ('q1f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4', 't2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7'),
  ('q1f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4', 't3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8'),
  ('q1f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4', 't4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9'),
  ('q2a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5', 't1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6'),
  ('q2a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5', 't2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7'),
  ('q2a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5', 't5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0'),
  ('q3b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6', 't1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6'),
  ('q3b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6', 't2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7'),
  ('q3b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6', 't3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8'),
  ('q3b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6', 't5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0'),
  ('q4c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7', 't2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7'),
  ('q4c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7', 't3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8'),
  ('q4c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7', 't4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9'),
  ('q5d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8', 't2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7'),
  ('q5d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8', 't3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8'),
  ('q5d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8', 't6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1'),
  ('q6e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9', 't2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7'),
  ('q6e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9', 't3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8'),
  ('q6e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9', 't6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1'),
  ('q7f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0', 't2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7'),
  ('q7f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0', 't3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8'),
  ('q7f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0', 't6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1'),
  ('q7f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0', 't7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2'),
  ('q9b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2', 't2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7'),
  ('q9b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2', 't3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8'),
  ('q9b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2', 't6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1'),
  ('q9b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2', 't7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2'),
  ('q0c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3', 't2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7'),
  ('q0c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3', 't3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8'),
  ('q0c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3', 't6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1'),
  ('q0c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3', 't7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2')
ON CONFLICT DO NOTHING;
