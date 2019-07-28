import { takeEvery, put, call, all } from 'redux-saga/effects';
import { ADD_ARTICLE, ARTICLE_POSTED, GET_API_POST, INFO_MESSAGE, ERROR_MESSAGE } from '../constants/action-types';

const getMessage = url => {
  console.log('GETing ' + url)
  return fetch(url)
    .then(response => {
      if (response.ok) return response.json();
      const status = response.status;
      console.log('getMessage, GET not ok, status: ' + status)
      return response.text()
                     .then(text => { throw new Error('failed to GET - http status: ' + status + ', message: "' + text + '"')});
    })
    .then(json => ({ json }))
    .catch(err => ({ error: 'problem GETing (probably a network error/service down): ' + err.message }));
}
const postMessage = (url, payload) => {
  const fetchOptions = ({
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  console.log('POSTing: ' + JSON.stringify(payload));
  return fetch(url, fetchOptions)
    .then(
      response => {
        if (response.ok) return response.json();
        const status = response.status;
        console.log('postMessage, POST not ok, status: ' + status)
        return response.text()
                       .then(text => { throw new Error('failed to POST - http status: ' + status + ', message: "' + text + '"' )});
      }
    )
    .then(json => ({ json }) )
    .catch(err => ({ error: 'problem POSTing (probably a network error/service down): ' + err.message }));
}


function* postArticleAsync(action) {
  const { json, error } = yield call(postMessage, 'http://localhost:8080/article', action.payload);
  if(json) {
    yield put({ type: ARTICLE_POSTED, articlId: json })
  } else {
    yield put({ type: ERROR_MESSAGE, payload: error })
  }
}

function* watchAddArticle() {
  yield takeEvery(ADD_ARTICLE, postArticleAsync)
}

function* getApiPostAsync(action) {
  const{ json, error } = yield call(getMessage, 'https://jsonplaceholder.typicode.com/posts?id=' + action.payload)
  if(json) {
    yield put({ type: INFO_MESSAGE, payload: { message: json[0].body, title: json[0].title } })
  } else {
    yield put({ type: ERROR_MESSAGE, payload: error })
  }
}

function* watchGetApiPost() {
  yield takeEvery(GET_API_POST, getApiPostAsync)
}

export function* rootSaga() {
  // see https://redux-saga.js.org/docs/advanced/RootSaga.html
  // for other patterns
  yield all([
    watchAddArticle(),
    watchGetApiPost()
  ])
}
