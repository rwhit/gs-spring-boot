import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
//import './index.css';
import Game from './ticTacToe';
import Index from './mainIndex.js';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={Index} />
        <Route path="/ticTacToe" component={Game} />
      </div>
    </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

