var socket=io.connect('http://192.168.20.167:6677',{'forceNew':true});

socket.on('messages',function(ipClient, data){
    //console.log(data);

    render(ipClient, data);
});

getMonthText = function(month){

  var textMonth = '';

  switch(month) {

    case 1:
      textMonth = 'Jan';
      break;
    case 2:
      textMonth = 'Feb';
      break;
    case 3:
      textMonth = 'Mar';
      break;
    case 4:
      textMonth = 'Apr';
      break;
    case 5:
      textMonth = 'May';
      break;
    case 6:
      textMonth = 'June';
      break;
    case 7:
      textMonth = 'July';
      break;
    case 8:
      textMonth = 'Aug';
      break;
    case 9:
      textMonth = 'Sept';
      break;
    case 10:
      textMonth = 'Oct';
      break;
    case 11:
      textMonth = 'Nov';
      break;
    case 12:
      textMonth = 'Dec';
      break;
  }

  return textMonth;

}


function render(ipClient, data){

    var html        = '';
    var direct      = 'left';
    var directdate  = 'right';
    var txtnickname = '';

    for (var i = 0; i < data.length; i++) {

      if (data[i].nickname == ipClient) {
        direct     = 'right';
        directdate = 'left';
        txtnickname = ' :Dice '+data[i].nickname;
      }else{
        
        txtnickname = data[i].nickname+' Dice:';
      }

      //Month text
      var monthtext = getMonthText(data[i].month);

      //console.log(data[i].nickname);
      html+= '<div class="direct-chat-msg '+direct+'">';
        html+= '<div class="direct-chat-info clearfix">';
          html+= '<span class="direct-chat-name pull-'+direct+'">'+txtnickname+'</span>';
          html+= '<span class="direct-chat-timestamp pull-'+directdate+'">'+data[i].day+' '+monthtext+' '+data[i].year+'  '+data[i].time+'</span>';
        html+= '</div>';
        html+= '<img class="direct-chat-img" src="img/user.jpg" alt="Message User Image">';
        html+= '<div class="direct-chat-text">'+data[i].text+'</div>';
      html+= '</div>';

    }

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
  
  var date = new Date().toLocaleDateString();
  var time = new Date().toLocaleTimeString();
  var d = new Date();

  var message = {
      //nickname: '4000',
      text: text,
      time: time,
      date: date,
      raiting: 'true',
      year: d.getFullYear(),
      month: d.getMonth()+1,
      day: d.getDate()
  };

  socket.emit('add-message',message);

  return false;
}