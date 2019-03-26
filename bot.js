var HTTPS = require('https');

var botID = process.env.BOT_ID;
    
var request = "";

function respond() {
  request = JSON.parse(this.req.chunks[0]);
  var nameRegex = /[Mm]y name is \w/;
  var spreadRegex = /!sheet/;
  var flipRegex = /!flip/;
  var randRegex = /!dice[\s]*[0123456789]*/

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
            (request.text.indexOf("?") > -1 || request.text.indexOf("do i") > -1 || request.text.indexOf("do we") > -1 || request.text.indexOf("Do I") > -1 || request.text.indexOf("Do we") > -1)) {
    this.res.writeHead(200);
    apFAQ();
    this.res.end();
  } else if (request.text && (request.text.indexOf("Berkeley") > -1 || request.text.indexOf("berkeley") > -1) && (request.text.indexOf("I see you're") < 0)) {
    this.res.writeHead(200);
    berkeleyShade();
    this.res.end();   
  } else if (request.text && randRegex.test(request.text)) {
    this.res.writeHead(200);
    rando(request.text);
    this.res.end();     
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function rando(tempTxt) {
  var botResponse, options, body, botReq;
    
  var txt = tempTxt.substring(tempTxt.indexOf("e") + 1, tempTxt.length);
    
  console.log("Made it");
    
  if(txt.length > 1) {
      var num = 1+ Math.floor(Math.random() * parseInt(txt.substring(1)));
      botResponse = num.toString();
  } else {
      botResponse = (1 + Math.floor(Math.random() * 6)).toString();
  }


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

function berkeleyShade() {
  var botResponse, options, body, botReq;
    
  var temp = Math.random();
    
  botResponse = "I see you're discussing Berkeley! For more information, visit http://stanfordrejects.com/";
    
  /*if(temp<0.05) {
      botResponse = "https://www.stanfordrejects.com/";
  } else if (temp<0.167) {
      botResponse = "https://www.stanforddaily.com/2019/02/26/mens-swimming-sinks-in-berkeley/";
  } else if (temp<0.333) {
      botResponse = "https://www.stanforddaily.com/2019/02/04/mens-basketball-ices-berkeley-in-final-minutes-keeps-them-winless-in-pac-12/";
  } else if (temp<0.5) {
      botResponse = "https://www.stanforddaily.com/2014/05/21/center-for-human-rights-and-international-justice-moves-to-stanford/";
  } else if (temp<0.66667) {
      botResponse = "https://www.stanforddaily.com/2010/01/20/m-gymnastics-no-1-stanford-demolishes-cal-in-berkeley/";
  } else if (temp<0.83333) {
      botResponse = "https://www.mercurynews.com/2018/11/30/the-big-game-how-long-has-it-been-since-cal-beat-stanford/";
  } else {
      botResponse = "https://calbears.com/news/2018/12/1/football-bears-fall-to-stanford-in-121st-big-game.aspx";
  } */
    
    /* else if (temp<0.35) {
      botResponse = "Tails!"
  } else if (temp<0.4) {
      botResponse = "Tails!"
  } else if (temp<0.45) {
      botResponse = "Tails!"
  } else if (temp<0.5) {
      botResponse = "Tails!"
  } else if (temp<0.55) {
      botResponse = "Tails!"
  } else if (temp<0.6) {
      botResponse = "Tails!"
  } else if (temp<0.65) {
      botResponse = "Tails!"
  } else if (temp<0.7) {
      botResponse = "Tails!"
  } else if (temp<0.75) {
      botResponse = "Tails!"
  } else if (temp<0.8) {
      botResponse = "Tails!"
  } else if (temp<0.85) {
      botResponse = "Tails!"
  } else if (temp<0.95) {
      botResponse = "Tails!"
  } else {
      botResponse = "Tails!"
  } */

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


function flip() {
  var botResponse, options, body, botReq;
    
  var temp = Math.random();
    
  if(temp<0.5) {
      botResponse = "Heads!"
  } else {
      botResponse = "Tails!"
  }

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
