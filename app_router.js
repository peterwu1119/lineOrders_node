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
    //bot.push( event.source.userId , 'http://www.google.com');

    if( event.message.text === "我要團購" ){
        create_flex_message( event.source.userId );
    }

    /*
    event.reply({
        type: 'sticker',
        packageId: '1',
        stickerId: '1'
    })
    */

    console.log( event.source.profile() )
    event.source.profile().then(function (profile) {
        console.log( profile )
        //bot.push( event.source.userId , 'Hello ' + profile.displayName );

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
        body : {
            'to' : user_id, 
            'messages' : [
                {
                    "type": "flex",
                    "altText": "This is a Flex Message",
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
                                "uri": process.env.DOMAIN_NAME
                              }
                            },
                            {
                              "type": "button",
                              "style": "link",
                              "height": "sm",
                              "action": {
                                "type": "uri",
                                "label": "團購列表",
                                "uri": process.env.DOMAIN_NAME
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
            ]
        },
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
    console.log( process.env);

    request( options, callback );
}
