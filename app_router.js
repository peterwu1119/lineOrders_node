const express = require('express');
const linebot = require('linebot');
const request = require('request');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const imgur = require('imgur');
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

app.post('/api/uploadImageToImgur', function(request, response){

    imgur.setClientId( process.env.IMGUR_CLIENT_ID );

    const form = new FormData();
    
    new formidable.IncomingForm().parse(request, ( err, fields, files) => {
        console.log( files.image );

        imgur.uploadFile( files.image )
        .then(function (json) {
            console.log(json.data.link);
        })
        .catch(function (err) {
            console.error(err.message);
        });

        /*        
        form.append( 'image', Buffer.from( JSON.stringify( files.image ) ) );

        fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                'Authorization' : 'Client-ID ' + process.env.IMGUR_CLIENT_ID
            },
            body: JSON.stringify( form )
        })
        .then(function( json ) {
            console.log('in then');
            console.log( json );
        })
        .catch(function( err ){
            console.error('in error ')
            console.error(err)
        });
        */
    })
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
                "uri": "http://linecorp.com/"
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
                    "uri": host_url + '/createGroupBuy/' + user_id
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
