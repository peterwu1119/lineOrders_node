import React, { Component } from 'react';
import axios from 'axios';

class CreateGroupBuy extends React.Component {

  constructor(props, context){
    super(props, context);
    this.pushMessage = this.pushMessage.bind( this );
  }

  pushMessage(){
    var user_id = this.props.match.params.user_id;

    axios.post('/api/pushMessage', {
      user_id : user_id,
      message : {



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