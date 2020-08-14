//HOC: Higher Order Component
//is going to handle validation to make sure that a suer is logged in before they see that component


import React, { Component } from 'react';
import {connect} from 'react-redux'; //connect is important because we need to connect to a redux store to see if that user is authenticated,


export default function withAuth(ComponentToBeRendered){
    class Authenticate extends Component {
        componentWillMount(){
            if(this.props.isAuthenticated === false){
                this.props.history.push("/signin");
            }
        }
        componentWillUpdate(nextProps){
            if(nextProps.isAuthenticated === false) {
                this.props.history.push("/signin");
            }
        }
        render(){
            return <ComponentToBeRendered {...this.props} />
        }
    }




function mapStateToProps(state){
    return {
        isAuthenticated: state.currentUser.isAuthenticated
    }
}

return connect(mapStateToProps)(Authenticate);

}