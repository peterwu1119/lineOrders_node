import React, { Component } from 'react';

class CreateGroupBuy extends React.Component {

  pushMessage(){
    console.log( 'in push message');
    console.log( this.props ); 

    axios.post('/api/pushMessage', {
      user_id : '12345',
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