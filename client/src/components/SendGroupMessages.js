import React, { Component } from 'react';
import axios from 'axios';

class SendGroupMessages extends React.Component {

  findUserGroups(){
    var queryObj = { params : { user_id : ''} }

    axios.get('/api/getUserGroups', queryObj )
    .then(function( user_groups ){
      console.log( user_groups );

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