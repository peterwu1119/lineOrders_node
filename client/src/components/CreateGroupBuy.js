import React, { Component } from 'react';
import axios from 'axios';
import request from 'request';

class CreateGroupBuy extends React.Component {

  constructor(props, context){
    super(props, context);
    this.createMenu = this.createMenu.bind( this );
    this.setFileName = this.setFileName.bind( this );
    this.saveImage = this.saveImage.bind( this );
    this.pushMessage = this.pushMessage.bind( this );
    this.getUserId = this.getUserId.bind( this );
    var vConsole = new window.VConsole();
  }

  componentDidMount () {

  }

  setFileName(){
    var file_name = document.getElementById('groupBuyImage').files[0].name;
    document.getElementsByClassName('custom-file-label')[0].innerHTML = file_name;
  }

  getUserId(){
    return new Promise( function(resolve , reject ){
      window.liff.init(
        data => {
          var user_id = data.context.userId;
          console.log( user_id );
          resolve( user_id );
        },
        err => {
          reject('error occur');
        }
      );
    })
  }

  createMenu(){
    console.log('in create menu')
    const _this = this;

    var user_id = '';

    _this.getUserId()
    .then(function( userId ){
      user_id =  userId;
      return _this.saveImage();
    })
    .then(function(response ){
      var img_url = response.data;
      console.log( img_url );
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
      <div className="container mt-3">
        <div className="fileinput fileinput-new" data-provides="fileinput">
          <div className="fileinput-preview thumbnail" data-trigger="fileinput" style={{ width: '200px' , height: '150px' }}></div>
          <div>
            <span className="btn btn-default btn-file">
              <span className="fileinput-new">Select image</span>
              <span className="fileinput-exists">Change</span>
              <input type="file" name="..." />
            </span>
            <a href="#" className="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateGroupBuy;