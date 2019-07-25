import { ADD_ARTICLE, ARTICLES_LOADED, CLEAR_MESSAGE, INFO_MESSAGE, ERROR_MESSAGE, DATA_LOADED } from "../constants/action-types";

// TODOS
// * more detail for error message
// - doh! the post isn't getting filtered by reducer. How do we do it right?
//   one option: mv fetch to middleware - see https://www.codementor.io/vkarpov/beginner-s-guide-to-redux-middleware-du107uyud
//               and https://redux.js.org/advanced/middleware
//   or, use saga: see at end of https://www.valentinog.com/blog/redux/
//                 If we go this route, remove thunk so we don't go insane
//   "obvious" solution: seems like split ADD_ARTICLE & (say) POST_ARTICLE - ADD does filter, the dispatches POST. But, _where_
//                       would that dispatch happen. Not in reducer - so that still puts us in middleware
export function addArticle(article) {
  return function(dispatch) {
    dispatch( { type: ADD_ARTICLE, payload: article } );
    const fetchOptions = ({
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(article)
    });
    console.log('fetch options: ' + JSON.stringify(fetchOptions))
    return fetch("http://localhost:8080/article", fetchOptions)
      .then(
        response => {
          if (response.ok) return response.json();
          const status = response.status;
          console.log('failed status: ' + status)
          response.text()
                 .then(text => dispatch( {type: ERROR_MESSAGE, payload: 'failed to post - http status: ' + status + ', message: "' + text + '"'} ));
          return null;
        },
        err => {
          dispatch( {type: ERROR_MESSAGE, payload: 'failed to post: ' + err.message } );
          return null;
        })
      .then(json => {
        if (json) {
          // TODO what to do w/result?
          console.log('TODO: update id for article to: ' + json)
        }
      });
  };
}

  export function clearMessage() {
  return { type: CLEAR_MESSAGE }
};

export function getPost(id) {
  return function(dispatch) {
    return fetch("https://jsonplaceholder.typicode.com/posts?id=" + id)
      .then(response => response.json(),
            err => {
              console.log("TODO: handle errors in handlePostClick");
              return null;
            })
      .then(json => {
        if (json) {
          // TODO destructure json?
          dispatch( {type: INFO_MESSAGE, payload: { message: json[0].body, title: json[0].title }} );
        }
      });
  };
}

export function getData() {
  return function(dispatch) {
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json(),
            err => {
              dispatch( { type: ERROR_MESSAGE, payload: err.message } );
              return null;
            })
      .then(json => {
        if (json) {
          dispatch( { type: DATA_LOADED, payload: json } );
        }
      });
  };
}

export function getArticles() {
  return function(dispatch) {
    return fetch("http://localhost:8080/articles")
      .then(response => response.json(),
            err => {
              dispatch( { type: ERROR_MESSAGE, payload: err.message } );
              return null;
            })
      .then(json => {
        if (json) {
          dispatch( { type: ARTICLES_LOADED, payload: json } );
        }
      });
  };
}
