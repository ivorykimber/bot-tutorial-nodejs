var HTTPS = require('https');

var botID = process.env.BOT_ID;
    
var request = "";

function respond() {
  request = JSON.parse(this.req.chunks[0]);
  var nameRegex = /[Mm]y name is \w/;
  var spreadRegex = /!sheet/;
  var flipRegex = /!flip/;

  if(request.text && nameRegex.test(request.text)) {
    this.res.writeHead(200);
    nameResponse();
    this.res.end();
  } else if (request.text && spreadRegex.test(request.text)) {
    this.res.writeHead(200);
    sheetLink();
    this.res.end();       
  } else if (request.text && flipRegex.test(request.text)) {
    this.res.writeHead(200);
    flip();
    this.res.end();     
  }  else if ((request.text.indexOf("AP ") > -1 || request.text.indexOf("ap ") > -1) && 
            (request.text.indexOf("exams") > -1 || request.text.indexOf("tests") > -1 || request.text.indexOf("exam") > -1 || request.text.indexOf("test") > -1) &&
            request.text.indexOf("?") > 1) {
    this.res.writeHead(200);
    apFAQ();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}


function flip() {
  var botResponse, options, body, botReq;
    
  var temp = Math.random();
    
  if(temp<0.5) {
      botResponse = "Heads!"
  } else {
      botResponse = "Tails!"
  }

  botResponse = "Sounds like you're asking about AP exams! Officially, Stanford recommends that students take all of the AP exams " +
      "they originally signed up for. However, many admits have reported success emailing their admissions officers and asking if " +
      "they could be excused from taking them. Stanford's website should have information on your regional admissions officer.";

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

function apFAQ() {
  var botResponse, options, body, botReq;

  botResponse = "Sounds like you're asking about AP exams! Officially, Stanford recommends that students take all of the AP exams " +
      "they originally signed up for. However, many admits have reported success emailing their admissions officers and asking if " +
      "they could be excused from taking them.";

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
