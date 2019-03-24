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
