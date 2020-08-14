import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_MESSAGES, REMOVE_MESSAGES } from "../actionTypes";

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const remove = id => ({
  type: REMOVE_MESSAGES,
  id
});

export const removeMessage = (user_id, message_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/messages/${message_id}`)
      .then(() => dispatch(remove(message_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};

export const fetchMessages = () => {
  return dispatch => {
    return apiCall("GET", "/api/messages")
      .then(res => {
        dispatch(loadMessages(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

//Action creator to create messages
export const postNewMessage = text => (dispatch, getState) => {
  let { currentUser } = getState();     //to get the user id, we going to destruct the current user from getState, this will give us the redux the specifically the current user; then make a variable called ID which would be the currentUser ID 
  const id = currentUser.user.id;       //we need the id to make the below apiCall
  return apiCall("POST", `/api/users/${id}/messages`, { text })
    .then(res => {})
    .catch(err => addError(err.message));
};
