import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/diary_logo.png';
import './layout.css';
import UserAuthenticationService from '../../api/UserAuthenticationService'


class Header extends Component {

    render() {

        const isUserLoggedIn = UserAuthenticationService.isUserLoggedIn();
        const isUserRole = UserAuthenticationService.isUser();
        const isAdminRole = UserAuthenticationService.isAdmin();
        //console.log("user Name : ==> "+sessionStorage.getItem('authenticatedUserName').split(' ')[0]);
        
        console.log("iS USER LOGGED IN ========> "+isUserLoggedIn);
        console.log("iS user role ========> "+isUserRole);
        console.log("session added user id ========> "+UserAuthenticationService.getUserId());
        return (
                      
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                    <Link to="/">
                        <img className="navbar-brand diary_logo" src={Logo} alt="Diary-logo" />
                    </Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarresponsive">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarresponsive">
                        <ul className="navbar-nav ml-auto">
                            {isUserLoggedIn && 
                            <li className="nav-item">
                                <span className="text-warning">Welcome</span> : <span className="text-warning">{sessionStorage.getItem('authenticatedUserName').split(' ')[0]} </span>
                            </li>
                            }

                            {!isUserLoggedIn && <li className="nav-item">
                                <Link className="nav-link" to="/">| Home | </Link>
                            </li>}

                            {isUserRole && <li className="nav-item">
                                <Link className="nav-link" to="/userDashBoard">| Home | </Link>
                            </li>}

                            {isAdminRole && <li className="nav-item">
                                <Link className="nav-link" to="/adminDashBoard">| Home | </Link>
                            </li>}


                            {!isUserLoggedIn &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login | </Link>
                            </li>
                            }

                            {!isUserLoggedIn &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/userRegisration">Sign UP & Free | </Link>
                            </li>
                            }

                            {isUserRole && 
                                <li className="nav-item">
                                    <Link className="nav-link" to="/addContact">Add Contact | </Link>
                                </li>
                            }

                            {isAdminRole && 
                                <li className="nav-item">
                                    <Link className="nav-link" to="/listUser">Users | </Link>
                                </li>
                            }

                            {isUserRole && 
                                <li className="nav-item">
                                    <Link className="nav-link" to="/listContact">Contacts | </Link>
                                </li>
                            }

                            {isUserLoggedIn && 
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={UserAuthenticationService.logout} to="/logout">Logout |</Link>
                                </li>
                            }
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}
export default Header;