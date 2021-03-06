import 'jquery/src/jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'jasny-bootstrap/dist/css/jasny-bootstrap.css';
import 'jasny-bootstrap/dist/js/jasny-bootstrap.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './css/index.css';
import App from './components/App';
import CreateGroupBuy from './components/CreateGroupBuy';
import JoinGroupBuy from './components/JoinGroupBuy';
import SendGroupMessages from './components/SendGroupMessages';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  (
    <Router>
        <div>
          {/* <Route path="/" component={App}/> */}
          <Route path="/createGroupBuy/" component={CreateGroupBuy}/>
          <Route path="/joinGroupBuy" component={JoinGroupBuy} />
          <Route path="/sendGroupMessages" component={SendGroupMessages} />
        </div>
    </Router>
  ),
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
