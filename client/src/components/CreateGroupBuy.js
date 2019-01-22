import React, { Component } from 'react';
import axios from 'axios';
import request from 'request'

class CreateGroupBuy extends React.Component {

  constructor(props, context){
    super(props, context);
    this.createMenu = this.createMenu.bind( this );
    this.saveImage = this.saveImage.bind( this );
    this.pushMessage = this.pushMessage.bind( this );
  }

  createMenu(){
    const _this = this;
    axios.get('/api/getImgurClientId')
    .then(function( response ) {
      var client_id = response.data;
      return _this.saveImage( client_id );
    })
    .then(function(img_url ){
      _this.pushMessage( img_url );
    })
  }

  saveImage( client_id ){
    //post local choosen image to imgur api
    return new Promise( function( resolve , reject ){
      var form = new FormData();
      form.append('image', document.getElementById('groupBuyImage').files[0] );

      var request = new XMLHttpRequest();
      request.open("POST",'https://api.imgur.com/3/image');
      request.setRequestHeader('Authorization', 'Client-ID ' + client_id );
      request.onload = function() {
        if( request.status == 200){
          var imgur_obj =  JSON.parse( request.responseText );
          resolve( imgur_obj.data.link );
        }
        else{
          reject( 'Error :' + request.responseText);
        }
      };
      request.send( form );
    })
  }

  pushMessage( img_url ){
    var user_id = this.props.match.params.user_id;

    axios.post('/api/pushMessage', {
      user_id : user_id,
      message : {
        "type": "flex",
        "altText": "團購功能選單",
        "contents": {
            "type": "bubble",
            "hero": {
                "type": "image",
                "url": img_url,
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
                    "uri": 'http://www.google.com' 
                    }
                },
                {
                    "type": "button",
                    "style": "link",
                    "height": "sm",
                    "action": {
                    "type": "uri",
                    "label": "團購列表",
                    "uri": 'http://www.google.com' 
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
    })
    .then( function( response ) {
      console.log( response );
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render () {
    return (
      <div>
        <h1>建立團購</h1>
        請上傳團購圖片： <input id='groupBuyImage' type='file' />
        <hr/>
        <input type='button' value='建立' onClick={ this.createMenu } />
      </div>
    );
  }
}

export default CreateGroupBuy;