import React from 'react';
import logo from '../images/logo.png';

const Nav = ({currentUser, handleLogout}) => {

    return (
        <nav className="navbar navbar-custom navbar-expand-lg">
            <div className="container">
                <a className="navbar-brand" href="/dashboard">
                    <img src={logo} alt="logo"/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            {
                                currentUser && <button type="button" className="nav-link nav-link-custom" href="#"><i className="far fa-user-circle"></i><span className = "username">{currentUser.username}</span></button>
                            }
                        </li>
                        <li className="nav-item">
                            <button onClick = {handleLogout} type = "button" className="nav-link nav-link-custom">Izloguj se</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

}

export default Nav;