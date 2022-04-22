from flask import Flask, jsonify
from flask_cors import cross_origin

app = Flask(__name__)


@app.route("/", methods=["GET"])
def get_example():
    """GET in server"""
    response = jsonify(message="Simple server is running")

    # Enable Access-Control-Allow-Origin
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/", methods=["POST"])
@cross_origin()
def post_example():
    """POST in server"""
    return jsonify(message="POST request returned")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)
