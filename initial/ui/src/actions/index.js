import { ADD_ARTICLE, CLEAR_MESSAGE } from "../constants/action-types";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload }
};

export function clearMessage() {
  return { type: CLEAR_MESSAGE }
};
