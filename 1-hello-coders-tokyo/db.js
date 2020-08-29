var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync')

var adapter = new FileSync('db.json')
var db = low(adapter);

//set default
db.defaults({ users: []})
  .write();

 module.exports = db;