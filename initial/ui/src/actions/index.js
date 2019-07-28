import { ADD_ARTICLE, ARTICLES_LOADED, GET_API_POST, CLEAR_MESSAGE, INFO_MESSAGE, ERROR_MESSAGE, DATA_LOADED } from "../constants/action-types";

export function addArticle(article) {
  return { type: ADD_ARTICLE, payload: article }
}

export function clearMessage() {
  return { type: CLEAR_MESSAGE }
};

export function getPost(id) {
  return { type: GET_API_POST, payload: id }
}

// TODO switch next 2 to saga

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
