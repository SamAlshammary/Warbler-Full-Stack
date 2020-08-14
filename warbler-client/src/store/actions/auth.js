import {apiCall, setTokenHeader} from '../../services/api';
import {SET_CURRENT_USER} from '../actionTypes';
import {addError, removeError} from './errors';


export function setCurrentUser(user){
    return{
        // this is what we are going to dispatch and send to our redux reducer
        type: SET_CURRENT_USER,
        user 
    }
}

export function setAuthorizationToken(token){
    setTokenHeader(token);
}

export function logout(){
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

//function that is going to run to log in or sign up successfully
export function authUser(type, userData){
    //return a function with dispatch, by using redux thunk to do this
    return dispatch => {
        //we still have to wait for ouur API call to finish before we dispatched this action. And since we are not using =>
        //any kind of lifecycle method we need another promise to make sure that we wait untile the API call has finished before we dispatch anything.
        return new Promise((resolve, reject) => {
            return apiCall("post", `/api/auth/${type}`, userData)
             .then(({token, ...user}) => {
                    localStorage.setItem("jwtToken", token);
                    setAuthorizationToken(token);
                    dispatch(setCurrentUser(user));
                    dispatch(removeError())
                    resolve(); //indicate that the API call succeeded
            })
            .catch(err => {
                dispatch(addError(err.message));
                reject(); //indicate the API call faild!
            })
        })
    }
}
