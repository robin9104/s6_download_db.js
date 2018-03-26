var express = require('express')
var app = express()
var http = require('http')
const fs = require('fs')

mysql = require('mysql')
var connection = mysql.createConnection({
	host: 'localhost',
	user: '20121568',
	password: '123qwe',
	database: 'mydb'
})
connection.connect()

app.get("/data",function(req, res){
	console.log("param=" + req.query)

	var qstr = 'select * from sensors '
	connection.query(qstr, function(err, rows, cols) {
		if (err) {
			throw err
			res.send('query error.' + qstr)
			return
		}
		
		console.log("Got " + rows.length + " records")
		html = ""
		for(var i = 0; i < rows.length; i++) {
			html += JSON.stringify(rows[i])
		}
		res.send(html);
	})
})

app.get('/download',function(req, res){
	var file = fs.createWriteStream("data.csv")
	var request = http.get("http://163.239.76.204:8083/data", function(response) {
		response.pipe(file)
	})	
})

var server = app.listen(8083, function () {
	var host = server.address().address
	var port = server.address().port
	console.log('listening at http://%s:%s', host, port)
}) 
