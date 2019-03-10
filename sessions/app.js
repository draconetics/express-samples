var app = require('express')();
var session = require('express-session');

app.use(session({
	name: 'newname',
	secret: 'secret word'}));

app.use(function printSession(req, res, next) {
  console.log('req.session', req.session);
  //console.log(req);
  return next();
});

app.use(function(req, res, next){
	console.log(req.session);
	next();
});

/*
app.get('/', function (req, res) {
     if(req.session.nombre){
      res.send('Hola ' + req.session.nombre);
   }else{
      var nombre = 'Tito';
      req.session.nombre = nombre;
      res.send('Hola usuario desconocido. De ahora en adelante te llamaremos ' + nombre);
   }
});

*/

// Access the session as req.session
app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
});

app.set('port', process.env.PORT || 3000)
var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});