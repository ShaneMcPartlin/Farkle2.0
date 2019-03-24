# Farkle2.0
### Client
To run the client, use `npm install` then `npm run dev` in the `/client` directory. To run the unit tests, use `npm run test`. By default, the application will appear in your browser at `localhost:8080`.
### Server
To run the server, you must first enter the virtual environment. Navigate to `/server`, then run `source env/bin/activate`. Once in the virtual environment (denoted by `(env)` at the front of the command line), run `python env/bin/app.py`.
### Database
In order for the application to be fully functional, a MySQL database is required with a table called `high_scores`. Make sure MySQL is installed (you can follow the guide here: https://dev.mysql.com/doc/refman/8.0/en/installing.html) Run the following script inside a MySQL database to get the table needed for the application:
```
CREATE TABLE high_scores (
    id INT AUTO_INCREMENT,
    playerName VARCHAR(64),
    score INT,
    PRIMARY KEY(id)
);
```
Make sure that the configuration in app.py matches the credentials needed on the MySQL connection:
```
# this should match YOUR database connection, which could be slightly different
app.config['MYSQL_DATABASE_USER'] = 'shane'
app.config['MYSQL_DATABASE_PASSWORD'] = 'password'
app.config['MYSQL_DATABASE_DB'] = 'farkle'
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'
mysql.init_app(app)
```

### Using the application
Add all players before starting the game. This can be done via the "add" button or the enter key on the keyboard. Players added erroneously can be removed by clicking the red `-` button right of their name.

Once all players have been added, click "Start Game"

The player whose turn it is will have their name highlighted in green. Add their score to the input, which only accepts numbers, and hit the enter key. Then to move to the next player, either use the right arrow key or the "Next Player" button.

If you need to go back the the previous player for any reason, use the left arrow key or the "Last Player" button.

NOTE! Be careful not to change the player when using the arrow keys to fix a mistake in the entered score. Make sure that the
correct player is highlighted when you hit enter. If a mistake is made, you can add a negative number to said player's score
to revert it.

Once a player breaks 10000 points, their name and score will be recorded in a high scores database. If that score is amongst the top 10 high scores of all time, it will appear on the start page under "High Scores"

