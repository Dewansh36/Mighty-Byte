import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { postReducer } from "./reducers/postReducer";

const reducer = combineReducers({
    posts: postReducer
});
let initalState={};
const middleWare = [thunk]

const store= createStore(reducer,initalState,composeWithDevTools(applyMiddleware(...middleWare)))

export default store;