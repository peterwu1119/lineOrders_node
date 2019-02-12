import React, { Component } from 'react';
import axios from 'axios';

class SendGroupMessages extends React.Component {

  constructor(props, context){
    super(props, context);
    this.findUserGroups();
  }

  getUserId(){
    return new Promise( function( resolve , reject ){
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

  findUserGroups(){
    this.getUserId()
    .then(function( userId ){
      var queryObj = { params : { user_id : userId } }
      axios.get('/api/getUserGroups', queryObj )
      .then(function( user_groups ){
        console.log( user_groups );
      })
    })
  }

  render () {
    return (
      <div>
        <h1>傳送訊息123</h1>
      </div>
    )
  }
}

export default SendGroupMessages;