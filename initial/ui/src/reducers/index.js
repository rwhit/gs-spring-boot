import { ADD_ARTICLE, ARTICLE_POSTED, GET_ARTICLES, ARTICLES_LOADED, DATA_LOADED, FOUND_BAD_WORD, INFO_MESSAGE, ERROR_MESSAGE, CLEAR_MESSAGE } from "../constants/action-types";
const initialState = {
  articles: [],
  totalArticles: 0,
  articleOffset: 0,
  remoteArticles: [],
  message: null,
  messageType: "Info",
  pendingArticle: null,
  fetching: false,
};

function rootReducer(state = initialState, action) {
  console.log('rootReducer(' + JSON.stringify(initialState) + ', ' + JSON.stringify(action) + ')');
  switch (action.type) {
    case ADD_ARTICLE:
      return Object.assign({}, state, {
        fetching: true,
        pendingArticle: action.payload
      });
    case ARTICLE_POSTED:
      // TODO update id
      return Object.assign({}, state, {
        fetching: false,
        articles: state.articles.concat(state.pendingArticle),
        pendingArticle: null
      });
    case GET_ARTICLES:
      return Object.assign({}, state, {
        articleOffset: action.payload.offset
      });
    case ARTICLES_LOADED:
      return Object.assign({}, state, {
        articles: action.payload.articles,
        totalArticles: action.payload.total,
      });
    case DATA_LOADED:
      return Object.assign({}, state, {
        remoteArticles: state.remoteArticles.concat(action.payload)
      });
    case FOUND_BAD_WORD:
      return Object.assign({}, state, {
        message: "One of the words in the title in not allowed",
        messageType: "Warning",
        fetching: false,
        pendingArticle: null
      });
    case INFO_MESSAGE:
      return Object.assign({}, state, {
        message: action.payload.message,
        messageType: action.payload.title ? action.payload.title : "Info"
      });
    case ERROR_MESSAGE:
      return Object.assign({}, state, {
        message: action.payload,
        messageType: "Error",
        fetching: false
      });
    case CLEAR_MESSAGE:
      const cleared = Object.assign({}, state, {
        message: null,
        messageType: "Info"
      });
      console.log('cleared state: ' + cleared);
      return cleared;
    default:
      return state;
  }
}

export default rootReducer;
