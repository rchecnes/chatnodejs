var express   = require('express');
var app       = express();
var server    = require('http').Server(app);
var io        = require('socket.io')(server);

var requestIp = require('request-ip');
 
// inside middleware handler 
/*var ipMiddleware = function(req, res, next) {
    var clientIp = requestIp.getClientIp(req); 
    console.log(clientIp);
    next();
};
console.log(ipMiddleware);*/
//Cargar una vista estatica
app.use(express.static('client'));
//Crear ruta
app.get('/hola-mundo',function(req, res){
    res.status(200).send("Hola-mundo desde la ruta");
});

//enviar mensaje por defecto
var messages =[{
    id:1,
    text: 'WELCOME TO CHAT OF RCHECNES 777!!',
    nickname: '200.200.200.200',
    time: '2:40.00 PM',
    date:'01/01/2030',
    raiting: 'false',
    year: '2030',
    month: '01',
    day: '01'
}]

//crear conexion
io.on('connection', function(socket){
    console.log("El equipo con IP: "+socket.handshake.address+" se ha conectado..");

    var ipClient = socket.handshake.address.replace('::ffff:','');
    
    //document.getElementById('nickname').value = ipClient;

    socket.emit('messages', messages);

    socket.on('add-message',function(data){
        //data.nickname = ipClient;
        messages.push(data);

        io.sockets.emit('messages', messages);
    });


});

//crear servidor
server.listen(6677,function(){
    console.log("Servidor esta funcionando en http://localhost:6677");
});


