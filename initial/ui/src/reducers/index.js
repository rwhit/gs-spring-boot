import { ADD_ARTICLE, DATA_LOADED, FOUND_BAD_WORD, ERROR_MESSAGE, CLEAR_MESSAGE } from "../constants/action-types";
const initialState = {
  articles: [],
  remoteArticles: [],
  message: null
};

function rootReducer(state = initialState, action) {
  console.log('rootReducer(' + JSON.stringify(initialState) + ', ' + JSON.stringify(action) + ')');
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload),
      message: null
    });
  }
  if (action.type === DATA_LOADED) {
    return Object.assign({}, state, {
      remoteArticles: state.remoteArticles.concat(action.payload)
    });
  }
  if (action.type === FOUND_BAD_WORD) {
    return Object.assign({}, state, {
      message: "One of the words in the title in not allowed"
    });
  }
  if (action.type === ERROR_MESSAGE) {
    return Object.assign({}, state, {
      message: action.payload
    });
  }
  if (action.type === CLEAR_MESSAGE) {
    const cleared = Object.assign({}, state, {
      message: null
    });
    console.log('cleared state: ' + cleared);
    return cleared;
  }
  return state;
}

export default rootReducer;
