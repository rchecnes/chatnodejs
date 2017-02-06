var express   = require('express');
var app       = express();
var server    = require('http').Server(app);
var io        = require('socket.io')(server);

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
    time: '2.40pm',
    date:'04/02/2017',
    raiting: 'false',
    year: 2017,
    month: 2,
    day: 1
}]

//crear conexion
io.on('connection', function(socket){
    console.log("El equipo con IP: "+socket.handshake.address+" se ha conectado..");

    var ipClient = socket.handshake.address.replace('::ffff:','');
    
    //document.getElementById('nickname').value = ipClient;

    socket.emit('messages', ipClient, messages);

    socket.on('add-message',function(data){
        data.nickname = ipClient;
        messages.push(data);

        io.sockets.emit('messages', ipClient, messages);
    });


});

//crear servidor
server.listen(6677,function(){
    console.log("Servidor esta funcionando en http://localhost:6677");
});


