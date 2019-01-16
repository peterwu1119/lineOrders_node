import React, { Component } from 'react';

class JoinGroupBuy extends React.Component {
  render () {
    const id = this.props.match.params.userId;
    return (
      <div>
        <h1>訂購</h1>
      </div>
    )
  }
}

export default JoinGroupBuy;