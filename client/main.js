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


text = text.replace(":)emot10","<label class='emoticon-send emot10-send'></label>");
text = text.replace(":)emot20","<label class='emoticon-send emot20-send'></label>");
text = text.replace(":)emot30","<label class='emoticon-send emot30-send'></label>");
text = text.replace(":)emot40","<label class='emoticon-send emot40-send'></label>");
text = text.replace(":)emot50","<label class='emoticon-send emot50-send'></label>");
text = text.replace(":)emot60","<label class='emoticon-send emot60-send'></label>");
text = text.replace(":)emot70","<label class='emoticon-send emot70-send'></label>");
text = text.replace(":)emot80","<label class='emoticon-send emot80-send'></label>");
text = text.replace(":)emot90","<label class='emoticon-send emot90-send'></label>");
text = text.replace(":)emot110","<label class='emoticon-send emot110-send'></label>");
text = text.replace(":)emot120","<label class='emoticon-send emot120-send'></label>");
text = text.replace(":)emot130","<label class='emoticon-send emot130-send'></label>");
text = text.replace(":)emot140","<label class='emoticon-send emot140-send'></label>");
text = text.replace(":)emot150","<label class='emoticon-send emot150-send'></label>");
text = text.replace(":)emot160","<label class='emoticon-send emot160-send'></label>");


    var message = {
        //nickname: '4000',
        text: text
    };

    socket.emit('add-message',message);

    return false;
}