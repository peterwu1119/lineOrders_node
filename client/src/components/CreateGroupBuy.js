import React, { Component } from 'react';
import axios from 'axios';
import request from 'request';

class CreateGroupBuy extends React.Component {

  constructor(props, context){
    super(props, context);
    this.createMenu = this.createMenu.bind( this );
    this.saveImage = this.saveImage.bind( this );
    this.pushMessage = this.pushMessage.bind( this );
    var vConsole = new window.VConsole();
  }

  componentDidMount () {

  }

  getUserId(){
    return new Promise( function(resolve , reject ){
      window.liff.init(
        data => {
          var user_id = data.context.userId;
          resolve( user_id );
        },
        err => {
          reject('error occur');
        }
      );
    })
  }

  createMenu(){
    const _this = this;

    var user_id = '';

    _this.getUserId()
    .then(function( userId ){
      user_id =  userId;
      return _this.saveImage();
    })
    .then(function(response ){
      var img_url = response.data;
      return _this.pushMessage( img_url , user_id );
    })
    .then(function(){
      window.liff.closeWindow() ;
    })
  }

  saveImage(){
    //post local choosen image to imgur api
    var form = new FormData();
    form.append('image', document.getElementById('groupBuyImage').files[0] );

    return axios.post('/api/putImageToFtp', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  pushMessage( img_url , user_id ){

    return axios.post('/api/pushMessage', {
      user_id : user_id,
      message : {
        "type": "flex",
        "altText": "團購功能",
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