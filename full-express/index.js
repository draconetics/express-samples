const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views',path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'img')));

app.use(function(req, res, next) {
	console.log("start");
	next();
});

app.get('/',function (req,res,next){
    res.send('getting message');
    next();
/*     console.log("sending page...");
    res.end('another message'); */
});

app.get('/first-template',function(req, res,next){
	//res.send("temlate!");
	//console.log("first_view");
	res.render('first_view',{name:"tutorial full", home_url:"/"});
	next();
});




app.post('/',(req, res)=>{
    console.log("sending a post");
    console.log(req.body);
    console.log(`name = ${req.body.name}`);
    res.send("this is post");
});

app.use(function(req, res, next) {
	console.log("end");
	next();
});

app.use(function(req, res) {
	console.log("end2");
});


app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});