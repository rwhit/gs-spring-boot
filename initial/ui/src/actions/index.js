import { ADD_ARTICLE, CLEAR_MESSAGE, ERROR_MESSAGE, DATA_LOADED } from "../constants/action-types";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload }
};

export function clearMessage() {
  return { type: CLEAR_MESSAGE }
};

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
