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
      .then(function( results ){
        _this.createTableHtml( results.data );
        console.log( results.data );
      })
    })
  }

  createTableHtml( user_groups ){
    var table = [];

    table.push( <tr><td>使用者名稱</td><td>群組名稱</td></tr> )
    for( var i = 0 ; i < user_groups.length ; i++){
      var children = []
      children.push( <td>{ user_groups[i].user_id }</td> )
      children.push( <td>{ user_groups[i].group_name }</td> )
      table.push( <tr>{children}</tr> )
    }

    this.setState({
      tableHtml : table
    });
  }

  createGroupBuy(){
    console.log('in create group buy');
  }

  render () {
    return (
      <div>
        <div className="container mt-3">
          <p></p> <p></p>
          <div className="fileinput fileinput-new" data-provides="fileinput">
            <div className="fileinput-preview thumbnail" data-trigger="fileinput" style={{ width: '200px' , height: '150px' }}></div>
            <div>
              <span className="btn btn-default btn-file">
                <span className="fileinput-new">選擇圖檔</span>
                <span className="fileinput-exists">重新選擇</span>
                <input type="file" id="groupBuyImage" />
              </span>
              <a href="#" className="btn btn-default fileinput-exists" data-dismiss="fileinput">移除</a>
            </div>
          </div>
          <div class="mt-3">
              <button class="btn btn-primary" onClick={ this.createMenu }>建立團購</button>
          </div>
        </div>

        <table>
          { this.state.tableHtml }
        </table>
        <button onClick={ this.createGroupBuy }>傳送</button>
      </div>
    )
  }
}

export default SendGroupMessages;