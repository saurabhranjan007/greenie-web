from app import app # importing app initialization from root nodule 

@app.route("/about", methods=['GET'])
def about():
    return "<p>About route..</p>", 200 

@app.route('/test', methods=['GET'])
def test():
    return '<>this is test route..<>', 200