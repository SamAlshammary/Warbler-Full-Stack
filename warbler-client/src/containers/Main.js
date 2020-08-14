//this is responsible for our routing logic!

import React from "react";
import {Switch, Route, WithRouter, Redirect} from 'react-router-dom';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import {connect} from "react-redux";
import Homepage from '../components/Homepage';
import AuthForm from "../components/AuthForm";
import {authUser} from '../store/actions/auth';
import {removeError} from '../store/actions/errors';
import withAuth from '../hocs/withAuth';
import MessageForm from "../containers/MessageForm"; 

const Main = props => {
    const {authUser, errors, removeError, currentUser} = props;
    return(
        <div className='container'>
            {/* Switch component allow us to have multiple routes and 404 logic */}
            <Switch>    
                                                            {/* Hompepage will either display a landing page or the timeline of messages. So we need some state from current user to help determine that */}
                <Route exact path='/' render={props => <Homepage currentUser={currentUser} {...props}/>} />
                        {/* Log In route */}
                <Route exact path='/signin' render ={props => {
                    return (
                        <AuthForm 
                            removeError={removeError}
                            errors = {errors}
                            onAuth={authUser} 
                            buttonText="Log in" 
                            heading="Welcome Back." 
                            {...props} 
                        />
                    )
                }}/>
                        {/* Sign Up route */}
                 <Route exact path='/signup' render ={props => {
                    return (
                        <AuthForm 
                            removeError={removeError}
                            errors = {errors}
                            onAuth={authUser}
                            signUp
                            buttonText="Sign me up!" 
                            heading="Join Warbler Today." {...props} 
                        />
                     )
                  }}
                />
                        {/* New Messages Route */}
                   <Route 
                            path='/users/:id/messages/new' 
                            component={withAuth(MessageForm)}
                         />
            </Switch>

        </div>
    );
};

//make sure we have a mapStateToProps thats going to accept some kind of state and return an object
 function mapStateToProps(state){
     return{
         //getting current user in state information
         currentUser: state.currentUser,
         errors: state.errors
     }
 }
// we'll call our main compoonent once we connected with the redux store.
export default withRouter(
    connect(mapStateToProps, {authUser, removeError})(Main)
    );
