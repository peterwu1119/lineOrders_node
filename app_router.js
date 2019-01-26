const express = require('express');
const linebot = require('linebot');
const request = require('request');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const imgur = require('imgur');
const Ftp = require('ftp');
const fileUpload = require('express-fileupload');
var app = module.exports = express();


const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_TOKEN
});

const linebotParser = bot.parser();

// Redirect linebot webhook url to linebot parser

var host_url = '';

app.post('/linewebhook',
        function(req ,res , next){ 
            host_url = 'https://' + req.get('host');
            next();
        } , 
        linebotParser
);

bot.on('follow' , function(event){
    console.log( event );
    bot.push( event.source.userId , 'welcome');
})

bot.on('join' , function(event){
    console.log( event );
    bot.push( event.source.userId , 'welcome');
})

// reply token can only be used one time , 
// if we want to reply multiple times in single webhook event
// use push message

bot.on('message', function (event) {
    if( event.message.text === "我要團購" ){
        create_flex_group_buy_message( event.source.userId );
    }
});

//Express API --------- App.get('path', callback function);
//routes HTTP GET requests to the specified path with the specified callback functions
app.get('/', function (request, response) {
    response.json({ message: 'response from node service!' });
});

app.use( bodyParser.urlencoded( { extended : false }) );
app.use( bodyParser.json() );

app.post('/ajax', function (request, response) {
    response.send("response by ajax");
});

app.post('/api/pushMessage', function(request, response){
    console.log( request.body );
    bot.push( request.body.user_id , request.body.message );
})

app.get('/api/getImgurClientId', function(request, response){
    response.send( process.env.IMGUR_CLIENT_ID );
})

app.use( fileUpload());
app.post('/api/putImageToFtp', function( request, response){
    console.log( request.files );
    var ftp = new Ftp();

    var image = request.files.image;

    ftp.on('ready', function() {
      ftp.put( image.data , '/public_html/pictures/line/' + image.name, function( err ) {
        if ( err ) throw err;
        ftp.end();
      });
    });

    var ftpConfig = {
        'host' : process.env.FTP_HOST,
        'user' : process.env.FTP_USER,
        'password' : process.env.FTP_PASSWORD,
    }

    ftp.connect( ftpConfig );
    
    var image_url = 'https://gam.jzm.mybluehost.me/pictures/line/' + image.name;
    response.send( image_url );
})


function create_flex_group_buy_message( user_id ){
    
    var message =  {
        "type": "flex",
        "altText": "團購功能選單",
        "contents": {
            "type": "bubble",
            "hero": {
                "type": "image",
                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                "size": "full",
                "aspectRatio": "20:13",
                "aspectMode": "cover",
                "action": {
                "type": "uri",
                "uri": "http://www.google.com"
                }
            },
            "footer": {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                {
                    "type": "button",
                    "style": "link",
                    "height": "sm",
                    "action": {
                    "type": "uri",
                    "label": "建立團購",
                    "uri": 'line://app/1625435475-XBBzeWbL' 
                    }
                },
                {
                    "type": "button",
                    "style": "link",
                    "height": "sm",
                    "action": {
                    "type": "uri",
                    "label": "團購列表",
                    "uri": host_url + '/joinGroupBuy'
                    }
                },
                {
                    "type": "spacer",
                    "size": "sm"
                }
                ],
                "flex": 0
            }
        }
    }
    console.log( host_url );

    bot.push( user_id , message );
}
