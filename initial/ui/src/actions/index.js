import { GET_ARTICLES, ADD_ARTICLE, GET_ALL_API_POSTS, GET_API_POST,
         CLEAR_MESSAGE } from "../constants/action-types";

export function addArticle(article) {
  return { type: ADD_ARTICLE, payload: article }
}

export function clearMessage() {
  return { type: CLEAR_MESSAGE }
};

export function getPost(id) {
  return { type: GET_API_POST, payload: id }
}

export function getData() {
  return { type: GET_ALL_API_POSTS }
}

export function getArticles() {
  return { type: GET_ARTICLES }
}
