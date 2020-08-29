var express = require('express');
var app = express();

var userRoute = require('./routes/user.route');	

var post = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');



app.use('/users',userRoute);


app.listen(post,()=>{
	console.log(`example app listening http://localhost:${post}`);
})