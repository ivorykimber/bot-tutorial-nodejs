var HTTPS = require('https');

var botID = process.env.BOT_ID;
    
var request = "";

function respond() {
  request = JSON.parse(this.req.chunks[0]);
  var nameRegex = /[Mm]y name is \w/;
  var spreadRegex = /!sheet/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    nameResponse();
    this.res.end();
  } else if (request.text && spreadRegex.test(request.text)) {
    this.res.writeHead(200);
    sheetLink();
    this.res.end();       
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}


function sheetLink() {
  var botResponse, options, body, botReq;

  botResponse = "Here is the link: https://bit.ly/2FuzbPs";

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}
    
function nameResponse() {
  var botResponse, options, body, botReq;

  botResponse = "Hi " + request.text.substring(request.text.indexOf("s")+1, request.text.length) +"!";

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
