import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from './Navbar';
import Main from './Main';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode'; //this is going to take the second part, the payload and decode it into the correct object that we pass to set current user.

//create the store
const store = configureStore()

//to check if there's already a token when the page refreshes
if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  //when the page refreshes we could still see if theres a token in local storage and if so, we can repopulate or rehydrate our state with the curren user.
  //prevent someone from manually tampering with the key of jwtToken in local storage.
  try{ 
      store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch(e){
    //set the current user to an empty object will force them logging out.
    store.dispatch(setCurrentUser({}))
  }
}


const App = () => (
  <Provider store={store}>
    <Router>
      <div className='onboarding'>
        <Navbar/>
        <Main/>
      </div>
    </Router>
  </Provider>
)

export default App;