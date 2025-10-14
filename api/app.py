from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/get_daily_quote", methods=["GET"])
def get_daily_quote():
    return jsonify({
        "quote": "Do what you can, with what you have, where you are.",
        "author": "Theodore Roosevelt",
        "tags": ["president", "mustache"],
        
    })