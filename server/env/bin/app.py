from flask import Flask, jsonify, request
from flask_cors import CORS
from flaskext.mysql import MySQL

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
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'
mysql.init_app(app)

conn = mysql.connect()
cursor = conn.cursor()

@app.route('/farkle', methods=['GET', 'POST'])
def scores():
    if request.method == "POST":
        post_data = request.get_json()
        values = post_data.get("player") + ", " + post_data.get("score")
        cursor.execute("INSERT INTO high_scores(player, score) VALUES(" + values + ")")
        conn.commit()
        return "scores added successfully"
    elif request.method == "GET":
        cursor.execute("SELECT * FROM high_scores LIMIT 10")
        r = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]
        return jsonify({'myCollection' : r})
    else:
        return "unaccepted method"

if __name__ == '__main__':
    app.run()