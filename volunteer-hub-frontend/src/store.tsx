import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/RootReducer";

function configureStore(state: any = {}) {
  return createStore(rootReducer, state, applyMiddleware(thunk));
}
export default configureStore;
