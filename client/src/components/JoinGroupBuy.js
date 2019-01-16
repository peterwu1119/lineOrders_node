import React, { Component } from 'react';

class JoinGroupBuy extends React.Component {
  render () {
    const id = this.props.match.params.userId;
    return (
      <div>
        user id: {id}
      </div>
    )
  }
}

export default JoinGroupBuy;