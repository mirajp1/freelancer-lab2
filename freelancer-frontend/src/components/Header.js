import React, {Component} from 'react';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {withRouter} from "react-router-dom";
import logo from '../images/logo.png'
class HomeHeader extends Component {
    render() {
        return (

            <nav className="navbar navbar-default navbar-background">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/home">
                            <img alt="Brand" src={logo}/>
                        </a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li ><a href="/profile">Profile</a></li>
                            <li><a href="/dashboard">DashBoard</a></li>
                            <li><a href="/wallet">Transaction Manager</a></li>

                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            <li><div  className="navbar-btn"><a className="btn btn-warning header-button" href="/add-project" >Post a Project</a></div></li>

                            <li><a href="#" onClick={this.props.logout.bind(this)}>Logout</a></li>

                        </ul>
                    </div>
                </div>
            </nav>


        );
    }
}

export default withRouter(HomeHeader);
