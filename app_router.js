const express = require('express');
const linebot = require('linebot');
const request = require('request');
var app = module.exports = express();

const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_TOKEN
});

const linebotParser = bot.parser();

// Redirect linebot webhook url to linebot parser
app.post('/linewebhook', linebotParser);

bot.on('follow' , function(event){
    console.log( event );
    bot.push( event.source.userId , 'welcome');
})

bot.on('join' , function(event){
    console.log( event );
    bot.push( event.source.userId , 'welcome');
})

bot.on('message', function (event) {
    console.log( event )
    bot.push( event.source.userId , 'http://www.google.com');

    if( event.message.text.indexOf("團購") !== -1 ){
        event.reply( '妳想要團購嗎？' ).then(function (data) {
            console.log('Success', data);
        }).catch(function (error) {
            console.log('Error', error);
        });
    }

    event.reply({
        type: 'sticker',
        packageId: '1',
        stickerId: '1'
    })

    console.log( event.source.profile() )
    event.source.profile().then(function (profile) {
        console.log( profile )
        bot.push( event.source.userId , 'Hello ' + profile.displayName );

        // reply token can only be used one time , 
        // if we want to reply multiple times in single webhook event
        // use push message 
        /*
        event.reply('Hello ' + profile.displayName).then(function(data){
            console.log('Success' , data);
        }).catch(function(error){
            console.log('Error' , error);
        });
        */
    });

    create_flex_message( event.source.userId );

    /*
    event.reply(event.message.text).then(function (data) {
        console.log('Success', data);
    }).catch(function (error) {
        console.log('Error', error);
    });
    */
});

//Express API --------- App.get('path', callback function);
//routes HTTP GET requests to the specified path with the specified callback functions
app.get('/', function (request, response) {
    response.json({ message: 'response from node service!' });
});

app.post('/ajax', function (request, response) {
    response.send("response by ajax");
});

function create_flex_message( user_id ){
    console.log( user_id );
    /*
    request.post(
        'https://api.line.me/v2/bot/message/push',
        { json: { key: 'value' } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );
    */

    const options = {
        url: 'https://api.line.me/v2/bot/message/push',
        method : 'POST',
        json : true,
        form : JSON.stringify({
            'to' : user_id, 
            'messages' : [
                {
                  "type": "flex",
                  "altText": "This is a Flex Message",
                  "contents": {
                    "type": "bubble",
                    "body": {
                      "type": "box",
                      "layout": "horizontal",
                      "contents": [
                        {
                          "type": "text",
                          "text": "Hello,"
                        },
                        {
                          "type": "text",
                          "text": "World!"
                        }
                      ]
                    }
                  }
                }
            ]
        }),
        headers: {
            'Authorization': 'Bearer {' + process.env.CHANNEL_TOKEN +'}'
        }
    };

    function callback(error, response, body) {
        console.log( error );
        console.log( body );
        console.log( response.statusCode );
    }

    console.log('before request');
    console.log( options )

    request( options, callback );
}
