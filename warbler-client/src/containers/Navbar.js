import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'; //connect usage: since this is a container we also want to connect it to our redux store
import {logout} from '../store/actions/auth';
import Logo from '../images/warbler-logo.png';


class Navbar extends Component{
    logout = e => {
        e.preventDefault();
        this.props.logout();
    }
    render(){
        return(
            <nav className="navbar navbar-expand">
                {/* container-fluid to make sure to get a full width */}
               <div className='container-fluid'>
                   {/* Link to take us to home page, and its coming from router-dom */}
                    <div className='navbar-header'> 
                  
                            <Link to="/" className='navbar-brand'>
                                    <img src={Logo} alt='Warbler Home'/>
                            </Link>
                    </div> 
                    {this.props.currentUser.isAuthenticated ? (
                        <ul className='nav navbar-nav navbar-right'>
                            <li>
                              <Link to={`/users/${this.props.currentUser.user.id}/messages/new`}>
                                 New Message
                              </Link>
                             </li>
                             <li>
                                 <a onClick={this.logout}>Log out</a>
                             </li>
                        </ul>
                    )

                    :
                    (    
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to='/signup'>Sign Up</Link>
                        </li>
                        <li>
                            <Link to='/signin'>Log In</Link>
                        </li>
                    </ul>
                    )}
                </div> 
            </nav>
        )
    }
}

// evenvtually we are going to need here is the current user because if the current users cuthenticated we dont want to show them Log in nore Sign up, but stomething else
function mapStateToProps(state){
    return{
        currentUser: state.currentUser
    };
}


export default connect(mapStateToProps, {logout})(Navbar);