# Temporary in-memory database
# This is just for demonstration purposes and should be replaced with a real database in production

characters = [
    { "id": "1", "name": "Albert Einstein"},
    { "id": "2", "name": "Isaac Newton"},
    { "id": "3", "name": "Marie Curie"},
    { "id": "4", "name": "Theodore Roosevelt"},
    { "id": "5", "name": "Gandalf"},
    { "id": "6", "name": "Elend Venture"},
    { "id": "7", "name": "Sazed"},
    { "id": "8", "name": "Uncle Iroh"}
]

tags = [
    { "id": "1", "name": "science"},
    { "id": "2", "name": "inspiration"},
    { "id": "3", "name": "life"},
    { "id": "4", "name": "moustache"},
    { "id": "5", "name": "no moustache"},
    { "id": "6", "name": "fantasy"},
    { "id": "7", "name": "wisdom"}
]

quotes = [
    {
        "id": "1",
        "quote": "Life is like riding a bicycle. To keep your balance you must keep moving.",
        "character_id": "1",
        "source": "Albert Einstein",
    },
    {
        "id": "2",
        "quote": "If I have seen further it is by standing on the shoulders of Giants.",
        "character_id": "2",
        "source": "Isaac Newton",
    },
    {
        "id": "3",
        "quote": "Nothing in life is to be feared, it is only to be understood.",
        "character_id": "3",
        "source": "Marie Curie",
    },
    {
        "id": "4",
        "quote": "Do what you can, with what you have, where you are.",
        "character_id": "4",
        "source": "Theodore Roosevelt",
    },
    {
        "id": "5",
        "quote": "All we have to decide is what to do with the time that is given us.",
        "character_id": "5",
        "source": "Lord of the Rings",
    },
    {
        "id": "6",
        "quote": "In the end, they will kill us. But first, they shall fear us!",
        "character_id": "6",
        "source": "Mistborn",
    },
    {
        "id": "7",
        "quote": "Our belief is often strongest when it should be weakest. That is the nature of hope.",
        "character_id": "7",
        "source": "Mistborn",
    },
    {
        "id": "8",
        "quote": "Our belief is often strongest when it should be weakest. That is the nature of hope.",
        "character_id": "8",
        "source": "Avatar: The Last Airbender",
    },
    {
        "id": "9",
        "quote": "Life happens wherever you are, whether you make it or not.",
        "character_id": "8",
        "source": "Avatar: The Last Airbender",
    },
    {
        "id": "10",
        "quote": "Sometimes the best way to solve your own problems is to help someone else.",
        "character_id": "8",
        "source": "Avatar: The Last Airbender",
    },
    {
        "id": "11",
        "quote": "Sometimes the best way to solve your own problems is to help someone else.",
        "character_id": "8",
        "source": "Avatar: The Last Airbender",
    }
]

quote_tags = [
    { "quote_id": "1", "tag_id": "1"},
    { "quote_id": "1", "tag_id": "2"},
    { "quote_id": "1", "tag_id": "3"},
    { "quote_id": "1", "tag_id": "4"},
    { "quote_id": "2", "tag_id": "1"},
    { "quote_id": "2", "tag_id": "2"},
    { "quote_id": "2", "tag_id": "5"},
    { "quote_id": "3", "tag_id": "1"},
    { "quote_id": "3", "tag_id": "2"},
    { "quote_id": "3", "tag_id": "3"},
    { "quote_id": "3", "tag_id": "5"},
    { "quote_id": "4", "tag_id": "2"},
    { "quote_id": "4", "tag_id": "3"},
    { "quote_id": "4", "tag_id": "4"},
    { "quote_id": "5", "tag_id": "2"},
    { "quote_id": "5", "tag_id": "3"},
    { "quote_id": "5", "tag_id": "6"},
    { "quote_id": "6", "tag_id": "2"},
    { "quote_id": "6", "tag_id": "3"},
    { "quote_id": "6", "tag_id": "6"},
    { "quote_id": "7", "tag_id": "2"},
    { "quote_id": "7", "tag_id": "3"},
    { "quote_id": "7", "tag_id": "6"},
    { "quote_id": "7", "tag_id": "7"},
    { "quote_id": "8", "tag_id": "2"},
    { "quote_id": "8", "tag_id": "3"},
    { "quote_id": "8", "tag_id": "6"},
    { "quote_id": "8", "tag_id": "7"},
    { "quote_id": "9", "tag_id": "2"},
    { "quote_id": "9", "tag_id": "3"},
    { "quote_id": "9", "tag_id": "6"},
    { "quote_id": "9", "tag_id": "7"},
    { "quote_id": "10", "tag_id": "2"},
    { "quote_id": "10", "tag_id": "3"},
    { "quote_id": "10", "tag_id": "6"},
    { "quote_id": "10", "tag_id": "7"},
    { "quote_id": "11", "tag_id": "2"},
    { "quote_id": "11", "tag_id": "3"},
    { "quote_id": "11", "tag_id": "6"},
    { "quote_id": "11", "tag_id": "7"}
]