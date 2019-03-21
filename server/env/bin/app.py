from flask import Flask, jsonify, request
from flask_cors import CORS
from flask.ext.mysql import MySQL

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app)

# need to hook up database
mysql = MySQL()
 
# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'shane'
app.config['MYSQL_DATABASE_PASSWORD'] = 'password'
app.config['MYSQL_DATABASE_DB'] = 'farkle'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

conn = mysql.connect()
cursor = mysql.cursor()

@app.route('/farkle', methods=['GET', 'POST'])
def scores():
    response_object = {"status":"success"}
    if request.method == "POST":
        # do the thing for posting a high score
        return
    else if request.method == "GET":
        # get the top 10 high scores
        return
    return jsonify(response_object)

if __name__ == '__main__':
    app.run()