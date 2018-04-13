import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import HomeHeader from './components/HomeHeader';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import { withRouter } from "react-router-dom";
import AddProject from "./components/AddProject";
import Home from "./components/Home";
import Project from "./components/Project";
import DashBoard from "./components/DashBoard";

import * as API from './api/auth';

class App extends Component {

    constructor(){
        super();
        this.isLoggedIn=this.isLoggedIn.bind(this);
        this.redirectToLogin=this.redirectToLogin.bind(this);
        this.redirectToDashboard=this.redirectToDashboard.bind(this);
    }
  render() {
    return (
      <div>
          {this.isLoggedIn() && <Header logout={this.logout}/>}
          {!this.isLoggedIn() && <HomeHeader/>}
          <div className="main">

              <Route path="/login" render={() => {

                  if (this.isLoggedIn()) {
                      this.redirectToDashboard();
                      return null;
                  }
                  return <Login/>

              }
              }/>
              <Route path="/signup" component={Signup}/>

              <Route path='/profile' render={() => {

                  if (!this.isLoggedIn()) {
                      this.redirectToLogin();
                      return null;
                  }
                  return <Profile/>

              }
              }
              />


              <Route path='/add-project' render={() => {

                  if (!this.isLoggedIn()) {
                      this.redirectToLogin();
                      return null;
                  }
                  return <AddProject/>

              }
              }
              />

              <Route path='/home' render={() => {

                  if (!this.isLoggedIn()) {
                      this.redirectToLogin();
                      return null;
                  }
                  return <Home/>

              }
              }
              />

              <Route path={"/projects/:projectId"} render={() => {

                  if (!this.isLoggedIn()) {
                      this.redirectToLogin();
                      return null;
                  }
                  return <Project/>

              }
              }
              />

              <Route path={"/dashboard"} render={() => {

                  if (!this.isLoggedIn()) {
                      this.redirectToLogin();
                      return null;
                  }
                  return <DashBoard/>

              }
              }
              />


          </div>

      </div>

    );
  }

    redirectToLogin(){
      this.props.history.push('/login');
    }

    redirectToDashboard(){
        this.props.history.push('/profile');
    }

    isLoggedIn(){
        return localStorage.getItem('userId')!==null;
    }

    logout(){
        API.logout();
        localStorage.removeItem('userId');
        this.props.history.push('/login');
    }

}


export default withRouter(App);
