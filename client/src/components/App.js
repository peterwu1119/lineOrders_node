import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios';
import logo from '../logo.svg';
import '../css/App.css';
import '../css/index.css';

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/createGroupBuy/:user_id">Create Group Buy</Link></li>
          <li><Link to="/joinGroupBuy">Join Group Buy</Link></li>
        </ul>
      </div>
    );
  }
}





/*
class App extends Component {

	constructor (props) {
		super (props);

		this.state = {
			ajaxResult: 'wait .....',
		}
	}

	componentDidMount () {
		const _this = this;
		axios.post('/ajax', {}).then(function(response) {
			_this.setState({
				ajaxResult: response.data,
			});
		})
		.catch(function(err) {console.log(err);});
	}

	render() {
		return (
			<div id="App">
				Hello Cat
				<div className="ajaxText">{this.state.ajaxResult}</div>
				<div className="ajaxText">{this.state.ajaxResult}</div>
			</div>
		);
	}
}
*/

export default App;
