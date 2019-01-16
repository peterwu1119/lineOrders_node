import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './css/index.css';
import App from './components/App';
import CreateGroupBuy from './components/CreateGroupBuy';
import JoinGroupBuy from './components/JoinGroupBuy';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  (
    <Router>
        <div>
          {/* <Route path="/" component={App}/> */}
          <Route path="/createGroupBuy" component={CreateGroupBuy}/>
          <Route path="/joinGroupBuy" component={JoinGroupBuy} />
        </div>
    </Router>
  ),
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
