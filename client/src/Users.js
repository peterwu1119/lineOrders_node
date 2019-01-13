import React, { Component } from 'react';

class Users extends React.Component {
  render () {
    const id = this.props.params.userId;
    return (
      <div>
        user id: {id}
      </div>
    )
  }
}

export default Users;