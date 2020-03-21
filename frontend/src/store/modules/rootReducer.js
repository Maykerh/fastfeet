import { combineReducers } from "redux";

import persistReducer from "./persistReducer";
import auth from "./auth/reducers";

const rootReducer = combineReducers({
    auth,
    persistReducer,
});

export default rootReducer;
