import React from 'react';
import List from './List';
import Form from './Form';
import Post from './Posts';
import MessageBox from './MessageBox';
import DevTools from './DevTools';

const ReduxApp = () => (
  <div className="row mt-5">
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
      <div id="DevTools">
          <DevTools/>
      </div>
  </div>
)

export default ReduxApp;
  
