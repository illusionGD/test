const mysql = require('mysql');

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password: 'hollow14250*',
  port: '3306',
  database:'atguigudb'
});

connection.connect(function(err){
  if(err){
      console.log(err)
  } else {
    console.log('connect success!')
  }
});
