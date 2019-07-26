import { ADD_ARTICLE, ARTICLE_POSTED, ARTICLES_LOADED, DATA_LOADED, FOUND_BAD_WORD, INFO_MESSAGE, ERROR_MESSAGE, CLEAR_MESSAGE } from "../constants/action-types";
const initialState = {
  articles: [],
  remoteArticles: [],
  message: null,
  messageType: "Info",
  pendingArticle: null,
  fetching: false,
};

function rootReducer(state = initialState, action) {
  console.log('rootReducer(' + JSON.stringify(initialState) + ', ' + JSON.stringify(action) + ')');
  // TODO switch
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      fetching: true,
      pendingArticle: action.payload
    });
  }
  if (action.type === ARTICLE_POSTED) {
    // TODO update id
    return Object.assign({}, state, {
      fetching: false,
      articles: state.articles.concat(state.pendingArticle),
      pendingArticle: null
    });
  }
  if (action.type === ARTICLES_LOADED) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  if (action.type === DATA_LOADED) {
    return Object.assign({}, state, {
      remoteArticles: state.remoteArticles.concat(action.payload)
    });
  }
  if (action.type === FOUND_BAD_WORD) {
    return Object.assign({}, state, {
      message: "One of the words in the title in not allowed",
      messageType: "Warning"
    });
  }
  if (action.type === INFO_MESSAGE) {
    return Object.assign({}, state, {
      message: action.payload.message,
      messageType: action.payload.title ? action.payload.title : "Info"
    });
  }
  if (action.type === ERROR_MESSAGE) {
    return Object.assign({}, state, {
      message: action.payload,
      messageType: "Error",
      fetching: false
    });
  }
  if (action.type === CLEAR_MESSAGE) {
    const cleared = Object.assign({}, state, {
      message: null,
      messageType: "Info"
    });
    console.log('cleared state: ' + cleared);
    return cleared;
  }
  return state;
}

export default rootReducer;
