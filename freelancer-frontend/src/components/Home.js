import React, {Component} from 'react';
import * as AuthApi from '../api/auth';
import {connect} from "react-redux";
import {fetchAllOpenProjects, fetchProfile, fetchProject} from "../actions/actions";
import img_default from '../images/default.png';
import '../css/Home.css';
import ProjectList from "./ProjectList";
import BidderList from "./BidderList";
import {withRouter} from "react-router-dom";

class Home extends Component {

    componentDidMount(){
        console.log(this.props.match);

        this.props.fetchAllOpenProjects(localStorage.getItem("jwtToken"));
    }

    render() {
        return (

            <div className="container">

                <div className="row">
                    <div className="col-md-12">
                        <div className="header">Freelance Jobs and Contests</div>
                        <br/>
                    </div>
                </div>




                <ProjectList projects={this.props.projects ? this.props.projects : []}/>


            </div>

        );
    }

}


function mapStateToProps(state){
    return {
        projects:state.allOpenProjects.projects,
        error:state.allOpenProjects.error
    }
}

export default withRouter(connect(mapStateToProps,{fetchAllOpenProjects})(Home));
