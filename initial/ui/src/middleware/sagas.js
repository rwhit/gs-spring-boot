import { takeEvery, put, call } from 'redux-saga/effects';
import { ARTICLE_POSTED, ERROR_MESSAGE } from '../constants/action-types';

const postArticle = article => {
  const fetchOptions = ({
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(article)
  });
  console.log('posting: ' + JSON.stringify(article));
  return fetch("http://localhost:8080/article", fetchOptions)
    .then(
      response => {
        if (response.ok) return response.json();
        const status = response.status;
        console.log('postArticle, post not ok, status: ' + status)
        return response.text()
                       .then(text => { throw new Error('failed to post - http status: ' + status + ', message: "' + text + '"' )});
      }
    )
    .then(json => ({ json }) )
    .catch(err => ({ error: 'problem posting (probably a network error/service down): ' + err.message }));
}


function* postArticleAsync(action) {
  const { json, error } = yield call(postArticle, action.payload);
  if(json) {
    yield put({ type: ARTICLE_POSTED, articlId: json })
  } else {
    yield put({ type: ERROR_MESSAGE, payload: error })
  }
}

export function* watchAddArticle() {
  yield takeEvery('ADD_ARTICLE', postArticleAsync)
}
