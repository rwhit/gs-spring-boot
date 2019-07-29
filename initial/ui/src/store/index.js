import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from "../middleware/sagas";
import DevTools from "../components/DevTools";

// TODO configure based on prod vs. dev
// see https://github.com/reduxjs/redux-devtools/blob/master/docs/Walkthrough.md#manual-integration for one way
const sagaMiddleware = createSagaMiddleware();
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(sagaMiddleware), DevTools.instrument())
);

sagaMiddleware.run(rootSaga);

export default store;
