import React, { Component } from 'react';

class CreateGroupBuy extends React.Component {
  render () {
    return (
      <div>
        <h1>建立團購</h1>
        請上傳團購圖片： <input id='groupBuyImage' type='file' />
        <hr/>
        <input type='button' value='建立' />
      </div>
    );
  }
}

export default CreateGroupBuy;