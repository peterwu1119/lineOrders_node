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
const mongodb = require('mongodb');
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
    console.log( event );
    if( event.message.text.startsWith('###') && event.source.type == 'group'){

        find_in_mongodb( 'user_groups' , {
            user_id : event.source.userId , 
            group_id : event.source.groupId 
        })
        .then(function( results ){
            console.log( 'results = ');
            console.log( results)

            if ( results.length == 0 ){
                save_to_mongodb( 'user_groups' , { 
                    user_id : event.source.userId, 
                    user_name : '',
                    group_id : event.source.groupId, 
                    group_name : event.message.text.replace('###' , ''), 
                })
            }
        })
    }

    if( event.source.type == 'group'){
        save_to_mongodb( 'messages' , { 
            user_id : event.source.userId, 
            group_id : event.source.groupId, 
            source_type : event.source.type, 
            message_text : event.message.text, 
            message_type : event.message.type, 
        })
    }

    if( event.message.text === "我要團購" ){
        create_flex_group_buy_message( event.source.userId );
    }

    if( event.message.text === 'imagemap test'){
        create_image_map_message( event.source.userId );
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

    var ids = request.body.ids;
    for( var i = 0 ; i < ids.length ; i++){
        bot.push( request.body.ids[i] , request.body.message );
    }
    response.send('');
})

app.get('/api/getImgurClientId', function(request, response){
    response.send( process.env.IMGUR_CLIENT_ID );
})

app.get('/api/getUserGroups', function(request, response){
    console.log( request.query );
    
    find_in_mongodb( 'user_groups' , {
        user_id : request.query.user_id
    })
    .then(function( results ){
        response.send( results );
    })
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

function create_image_map_message( user_id ){
    
    var message =  {
        "type": "imagemap",
        "baseUrl": "https://gam.jzm.mybluehost.me/pictures/line/7C93D4F3-202F-4486-BF7D-F2000FAA701D#",
        "altText": "imagemap message",
        "baseSize": {
            "height": 1040,
            "width": 1040
        },
        "actions": [
            {
                "type": "uri",
                "linkUri": "https://www.google.com.tw/",
                "label": "https://www.google.com.tw/",
                "area": {
                    "x": 0,
                    "y": 0,
                    "width": 520,
                    "height": 1040
                }
            },
            {
                "type": "message",
                "text": "aaa",
                "area": {
                    "x": 520,
                    "y": 0,
                    "width": 520,
                    "height": 1040
                }
            }
        ]
    }
    bot.push( user_id , message );
}

function save_to_mongodb( collection_name , document ){
    var mongoClient = mongodb.MongoClient;
    var url = process.env.MONGODB_URL;

    mongoClient.connect(url, function(err, db) {
        if ( err ) throw err;
        var dbo = db.db( 'line_orders' );
        dbo.collection( collection_name ).insertOne(document , function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
    });
}

function find_in_mongodb( collection_name , search_obj){
    return new Promise( function(resolve , reject ){
        var mongoClient = mongodb.MongoClient;
        var url = process.env.MONGODB_URL;

        mongoClient.connect( url, function( err, db ) {
            if ( err ) throw err;
            var dbo = db.db( 'line_orders' );
            dbo.collection( collection_name ).find( search_obj ).toArray(function(err, result) {
                if ( err ){ 
                    reject( err );
                }
                console.log( 'find result = ');
                console.log( result );
                resolve( result );
                db.close();
            });
        });
    })
}