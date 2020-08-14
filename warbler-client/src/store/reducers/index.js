//This is going to be the root reducer we export out

import {combineReducers} from "redux";
import currentUser from './currentUser';
import errors from './errors';
import messages from './messages';


const rootReducer = combineReducers({
    currentUser,
    errors,
    messages
});

export default rootReducer;