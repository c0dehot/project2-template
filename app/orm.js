const mysql = require("mysql");
// an external npm package we are using
const moment = require("moment")

class Database {
  constructor( config ) {
      this.connection = mysql.createConnection( config );
  }
  query( sql, args ) {
      return new Promise( ( resolve, reject ) => {
          this.connection.query( sql, args, ( err, rows ) => {
              if ( err )
                  return reject( err );
              resolve( rows );
          } );
      } );
  }
  close() {
      return new Promise( ( resolve, reject ) => {
          this.connection.end( err => {
              if ( err )
                  return reject( err );
              resolve();
          } );
      } );
  }
}

const db = new Database({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  insecureAuth : true
});

function getList( criteria={} ){
    return db.query( "SELECT * FROM tasks "+( criteria ? "WHERE ? " : "" ), criteria )
}

function insertTask( priority, info, due ){
    if( priority=='' ) priority = 'primary'
    // no due? set to 7 days from now
    if( due=='' ) due = moment().add(7, 'days').format("YYYY-MM-DD" )
    console.log( ` inserting task data: `, { priority, info, due } )
    return db.query( "INSERT INTO tasks SET ? ", 
        { priority, info, due } )
}

function updateTask( id, priority, info, due ){
    return db.query( "UPDATE tasks SET ? WHERE id=?", 
        [ { priority, info, due }, id ] )
}

function deleteTask( id ){
    return db.query( "DELETE FROM tasks WHERE id=?", [ id ] )
}

module.exports = {
    getList, insertTask, updateTask, deleteTask
}