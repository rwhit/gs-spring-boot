import React from 'react';
import List from './List';
import Form from './Form';
import Post from './Posts';
import MessageBox from './MessageBox';
import Spinner from './Spinner';
import DevTools from './DevTools';

const ReduxApp = () => (
  <div className="row mt-5">
      <React.StrictMode>
          <div className="col-md-4 offset-md-1">
              <h2>Articles</h2>
              <List />
          </div>
          <div className="col-md-4 offset-md-1">
              <h2>Add a new article</h2>
              <Form />
          </div>
          <div className="col-md-4 offset-md-1">
              <h2>API posts</h2>
              <Post />
          </div>
          <div>
              <MessageBox />
          </div>
          <div>
              <Spinner />
          </div>
      </React.StrictMode>
      <div id="DevTools">
          <DevTools/>
      </div>
  </div>
)

export default ReduxApp;
