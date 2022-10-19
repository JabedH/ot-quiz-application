import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import reducer from "./reducer";

const reducers = persistReducer(
  { storage: storage, key: "a27" },
  combineReducers({
    reducer,
  })
);

let middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

const store = createStore(reducers, {}, applyMiddleware(...middleware));
export default store;