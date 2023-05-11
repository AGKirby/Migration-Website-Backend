import mysql from 'mysql';


var databaseConnection = mysql.createConnection({
    host: "localhost",
    database: "migration_website",
    user: "root",
    password: "password"
});

function openDatabaseConnection() {
    databaseConnection.connect((err) => {
        if (err) throw err;
        console.log("Connected to the database!");
    });
}

export function closeDatabaseConnection() {
    databaseConnection.end((err) => {
        if (err) {
            return console.log('Error disconnecting from the database:' + err.message);
        }
        console.log('Closed the database connection.');
    });
}

export async function query(sql, inputs, callback) {
    //openDatabaseConnection()
    try {
        databaseConnection.query(sql, inputs, (err, rows) => {
            if(err) throw err;
            callback(rows)
        });
    } catch(error) {
        throw "An error occurred exeucting the SQL statement: '" + sql + "'\n" + error
    } finally {
        //closeDatabaseConnection()
    }
}

