import { ADD_ARTICLE, FOUND_BAD_WORD, CLEAR_MESSAGE } from "../constants/action-types";
const initialState = {
  articles: [],
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
  if (action.type === FOUND_BAD_WORD) {
    return Object.assign({}, state, {
      message: "One of the words in the title in not allowed"
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
