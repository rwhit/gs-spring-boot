import { takeEvery, put, call, all } from 'redux-saga/effects';
import { FOUND_BAD_WORD, GET_ARTICLES, ARTICLES_LOADED, ADD_ARTICLE, ARTICLE_POSTED,
         GET_API_POST, GET_ALL_API_POSTS, DATA_LOADED,
         INFO_MESSAGE, ERROR_MESSAGE } from '../constants/action-types';
import { containsForbiddenWords } from './index';
//
// generic GET, POST utils
//
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

const defaultOnError = error => {
  return ({ type: ERROR_MESSAGE, payload: error })
}

// onSuccess & onError should return simple actions
// onSuccess takes single arg - json payload response for url
// onError takes single arg - { error: message }
function* getMessageAsync(url, onSuccess, onError = defaultOnError) {
  const{ json, error } = yield call(getMessage, url)
  if(json) {
    yield put( onSuccess(json) )
  } else {
    yield put( onError(error) )
  }
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

// onSuccess & onError should return simple actions
// onSuccess takes single arg - json payload response for url
// onError takes single arg - { error: message }
function* postMessageAsync(url, payload, onSuccess, onError = defaultOnError) {
  const { json, error } = yield call(postMessage, url, payload)
  if(json) {
    yield put( onSuccess(json) )
  } else {
    yield put( onError(error) )
  }
}

//
// app specific watchers
//

// pulled this out since had conditional logic
function* addArticle(action) {
  if (containsForbiddenWords(action.payload.title))
    yield put( ({ type: FOUND_BAD_WORD }) )
  yield* postMessageAsync('http://localhost:8080/article', action.payload,
                          json => ({ type: ARTICLE_POSTED, articleId: json }))
}

function* watchAddArticle() {
  yield takeEvery(ADD_ARTICLE, addArticle)
}

function* watchGetArticles() {
  yield takeEvery(GET_ARTICLES,
                  action => getMessageAsync(`http://localhost:8080/articlePage?offset=${action.payload.offset}&pageSize=${action.payload.pageSize}`,
                                            json => ({ type: ARTICLES_LOADED, payload: json })))
}

function* watchGetApiPost() {
  yield takeEvery(GET_API_POST,
                  action => getMessageAsync('https://jsonplaceholder.typicode.com/posts?id=' + action.payload,
                                            json => ({ type: INFO_MESSAGE, payload: { message: json[0].body, title: json[0].title }})))
}

function* watchGetAllApiPosts() {
  yield takeEvery(GET_ALL_API_POSTS,
                  action => getMessageAsync("https://jsonplaceholder.typicode.com/posts",
                                            json => ({type: DATA_LOADED, payload: json })))
}

export function* rootSaga() {
  // see https://redux-saga.js.org/docs/advanced/RootSaga.html
  // for other patterns
  yield all([
    watchGetArticles(),
    watchAddArticle(),
    watchGetApiPost(),
    watchGetAllApiPosts()
  ])
}
