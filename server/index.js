var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Cargar una vista estatica
app.use(express.static('client'));
//Crear ruta
app.get('/hola-mundo',function(req, res){
    res.status(200).send("Hola-mundo desde la ruta");
});

//enviar mensaje por defecto
var messages =[{
    id:1,
    text: 'Bienvenidos al chat de RCHECNES',
    nickname: 'Bot- rchecnes.es'
}]

//crear conexion
io.on('connection', function(socket){
    console.log("El equipo con IP: "+socket.handshake.address+" se ha conectado..");
    socket.emit('messages',messages);

    socket.on('add-message',function(data){
        messages.push(data);

        io.sockets.emit('messages',messages);
    });


});

//crear servidor
server.listen(6677,function(){
    console.log("Servidor esta funcionando en http://localhost:6677");
});