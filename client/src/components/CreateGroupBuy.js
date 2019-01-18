import React, { Component } from 'react';
import axios from 'axios';

class CreateGroupBuy extends React.Component {

  constructor(props, context){
    super(props, context);
    this.pushMessage = this.pushMessage.bind( this );
  }

  pushMessage(){
    //post local choosen image to imgur api
    //use request module
    const options = {
      url: 'https://api.imgur.com/3/image',
      method : 'POST',
      form : {
          'image' : document.getElementById('groupBuyImage').files[0], 
      },
      headers: {
          'Authorization': 'Client-ID {{clientId}}'
      }
    };

    function callback(error, response, body) {
      console.log( response );
    }

    request( options, callback );



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

		})
  }

  render () {
    return (
      <div>
        <h1>建立團購</h1>
        請上傳團購圖片： <input id='groupBuyImage' type='file' />
        <hr/>
        <input type='button' value='建立' onClick={ this.pushMessage } />
      </div>
    );
  }
}

export default CreateGroupBuy;