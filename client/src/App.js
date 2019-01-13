import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import './index.css';

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/users/1">Users 1</Link></li>
          <li><Link to="/users/2">Users 2</Link></li>
        </ul>
        {this.props.children} 
      </div>
    );
  }
}

class About extends React.Component {
  render () {
    return (<h1>About</h1>);
  }
}

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
