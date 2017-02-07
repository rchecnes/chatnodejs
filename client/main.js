var socket=io.connect('http://192.168.20.167:6677',{'forceNew':true});

socket.on('messages',function(data){
    //console.log(data);
    render(data);
});

pad = function(value, length) {
    return (value.toString().length < length) ? pad("0"+value, length):value;
}

getMonthText = function(month){

  var textMonth = '';

  switch(month) {

    case '01':
      textMonth = 'Jan';
      break;
    case '02':
      textMonth = 'Feb';
      break;
    case '03':
      textMonth = 'Mar';
      break;
    case '04':
      textMonth = 'Apr';
      break;
    case '05':
      textMonth = 'May';
      break;
    case '06':
      textMonth = 'June';
      break;
    case '07':
      textMonth = 'July';
      break;
    case '08':
      textMonth = 'Aug';
      break;
    case '09':
      textMonth = 'Sept';
      break;
    case '10':
      textMonth = 'Oct';
      break;
    case '11':
      textMonth = 'Nov';
      break;
    case '12':
      textMonth = 'Dec';
      break;
  }

  return textMonth;

}

formatAMPM = function(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours +':'+minutes+':'+seconds+' '+ampm;
  return strTime;
}


function render(data){

    var html        = '';
    var direct      = 'left';
    var directdate  = 'right';
    var txtnickname = '';
    var imguser     = '';
    var ipClient    = '';

    for (var i = 0; i < data.length; i++) {
      //console.log(ipClient+'='+data[i].nicknames);
      if (data[i].nickname == ipClient) {
        direct     = 'right';
        directdate = 'left';
        //txtnickname = ' :Dice '+data[i].nickname;
        txtnickname = 'MY MESSAGE';
        imguser = 'user1.jpg';
      }else{
        
        txtnickname = data[i].nickname+' Dice:';
        imguser     = 'user.jpg';
      }

      //Month text
      var monthtext = getMonthText(data[i].month);

      //console.log(data[i].nickname);
      html+= '<div class="direct-chat-msg '+direct+'">';
        html+= '<div class="direct-chat-info clearfix">';
          html+= '<span class="direct-chat-name pull-'+direct+'">'+txtnickname+'</span>';
          html+= '<span class="direct-chat-timestamp pull-'+directdate+'">'+data[i].day+' '+monthtext+' '+data[i].year+'  '+data[i].time+'</span>';
        html+= '</div>';
        html+= '<img class="direct-chat-img" src="img/'+imguser+'" alt="Message User Image">';
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
  
  //Date
  var date = new Date().toLocaleDateString();
  //var time = new Date().toLocaleTimeString();
  var d = new Date();



  var message = {
      nickname: document.getElementById('myip').value,
      text: text,
      time: formatAMPM(d),
      date: date,
      raiting: 'true',
      year: d.getFullYear(),
      month: pad(d.getMonth()+1,2),
      day: pad(d.getDate(),2)
  };

  socket.emit('add-message',message);

  return false;
}


/*function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
    noop = function() {},
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

     //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });
        
        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function(reason) {
        // An error occurred, so handle the failure to connect
    });

    //listen for candidate events
    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}*/

/*getUserIP(function(ip){
    alert("Got IP! :" + ip);
});*/