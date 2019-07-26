import { ADD_ARTICLE, ARTICLES_LOADED, CLEAR_MESSAGE, INFO_MESSAGE, ERROR_MESSAGE, DATA_LOADED } from "../constants/action-types";

export function addArticle(article) {
  return { type: ADD_ARTICLE, payload: article }
}

  export function clearMessage() {
  return { type: CLEAR_MESSAGE }
};

// TODO switch next 3 to saga
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
