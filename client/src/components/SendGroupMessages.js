import React, { Component } from 'react';
import axios from 'axios';

class SendGroupMessages extends React.Component {

  constructor(props, context){
    super(props, context);
    var vConsole = new window.VConsole();

    this.state = {
      tableHtml : [] 
    };

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
    var _this = this;
    _this.getUserId()
    .then(function( userId ){
      var queryObj = { params : { user_id : userId } }
      axios.get('/api/getUserGroups', queryObj )
      .then(function( user_groups ){
        _this.createTableHtml( user_groups );
        console.log( user_groups );
      })
    })
  }

  createTableHtml( user_groups ){
    var table = [];

    table.push( <tr><td>使用者名稱</td><td>群組名稱</td></tr> )
    for( var i = 0 ; i < user_groups.length ; i++){
      var children = []
      children.push( <td>{ user_groups[i].user_id }</td> )
      children.push( <td>{ user_groups[i].group_id }</td> )
      table.push( <tr>{children}</tr> )
    }

    this.setState({
      tableHtml : table
    });
  }

  render () {
    return (
      <table>
        { this.state.tableHtml }
      </table>
    )
  }
}

export default SendGroupMessages;