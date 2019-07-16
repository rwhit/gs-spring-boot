import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/index';
import Game from './ticTacToe';
import Index from './mainIndex.js';
import ReduxApp from './components/reduxApp.jsx';

const routing = ({store}) => (
  <Provider store={store}>
      <Router>
          <div>
              <Route exact path="/" component={Index} />
              <Route path="/ticTacToe" component={Game} />
              <Route path="/ReduxApp" component={ReduxApp} />
          </div>
      </Router>
  </Provider>
)

ReactDOM.render(
  routing({store}),
  document.getElementById('root')
);

