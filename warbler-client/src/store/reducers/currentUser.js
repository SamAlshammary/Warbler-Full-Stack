import {SET_CURRENT_USER} from '../actionTypes';

const DEFAULT_STATE = {
    isAuthenticated: false, //hopefully be true, when logged in
    user: {}    //all the user info when logged in
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type){
        case SET_CURRENT_USER:
            return {    
                isAuthenticated: !!Object.keys(action.user).length, //turn empty object into false or if theree are keys, true!
                user: action.user
            }
            default:
                return state;
    }
}