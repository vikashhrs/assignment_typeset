let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let port = process.env.PORT || 3000;

let rootRoute = require('./routes/rootRoute');
let postRoute = require('./routes/postRoute');
let paragraphRoute = require('./routes/paragraphRoute');

const app = express();

mongoose.connect("mongodb://localhost/typeset",function(err){
	if(err)
		throw err;

	console.log("Connected to DB");
});

app.use(bodyParser.json());

app.use(rootRoute);
app.use(postRoute);
app.use(paragraphRoute);

app.listen(port,function(){
	console.log("Server running at port "+port);
});

module.exports = app;
