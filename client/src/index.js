import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="about" component={About}/>
        <Route path="users/:userId" component={Users} />
      </Route>
    </Router>
  ),
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
