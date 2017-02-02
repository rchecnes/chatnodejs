var socket=io.connect('http://192.168.20.167:6677',{'forceNew':true});

socket.on('messages',function(data){
    //console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(message,index){
        return (`
            <div class="message">
                <div class="row">
                    <div class="col-lg-2 col-md-3 col-sm-3 col-xs-3">
                        <img src="http://www.subinet.es/wp-content/uploads/2010/03/batman-for-facebook.jpg" width="100" height="100"></img>
                    </div>
                    <div class="col-lg-10 col-md-9 col-sm-9 col-xs-9">
                        <strong>${message.nickname} Dice:</strong>
                        <p>${message.text}</p>
                    </div>
                </div>
            </div>
            `);
    }).join(' ');

    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML=html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){

    var text = document.getElementById('text').value;

    text = text.replace(':)', "<span class='emoticon feliz'></span>");
    text = text.replace('::)', "<span class='emoticon triste'></span>");
    text = text.replace('@@)', "<span class='emoticon amor'></span>")



    var message = {
        //nickname: '4000',
        text: text
    };

    socket.emit('add-message',message);

    return false;
}