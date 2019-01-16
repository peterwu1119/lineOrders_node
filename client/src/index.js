import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './css/index.css';
import App from './components/App';
import About from './components/About';
import Users from './components/Users';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  (
    <Router>
        <div>
          <Route path="/" component={App}/>
          <Route path="/about" component={About}/>
          <Route path="/users/:userId" component={Users} />
        </div>
    </Router>
  ),
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
