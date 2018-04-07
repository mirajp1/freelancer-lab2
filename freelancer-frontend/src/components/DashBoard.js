import React, {Component} from 'react';
import {connect} from "react-redux";
import '../css/Home.css';
import ProjectList from "./ProjectList";
import {withRouter} from "react-router-dom";
import {fetchEmployerProjects, fetchFreelancerProjects} from "../actions/actions";
import ProjectDashboardList from "./ProjectDashboardList";
import ProjectFreelancerDashboardList from "./ProjectFreelancerDashboardList";

class DashBoard extends Component {

    constructor(){
        super();
        this.state={
            show:"freelancer"
        }
        this.handleToggle=this.handleToggle.bind(this);
    }


    componentDidMount(){
        console.log(this.props.match);

        this.props.fetchFreelancerProjects(localStorage.getItem("jwtToken"));
        this.props.fetchEmployerProjects(localStorage.getItem("jwtToken"));
    }

    handleToggle(e){
        e.preventDefault();

        if(e.target.name==="freelancerToggle"){
            this.setState({show:"freelancer"});
        }
        else{
            this.setState({show:"employer"})
        }


    }

    render() {
        return (

            <div className="container">

                <div className="row">
                    <div className="col-md-8">
                        <div className="header">Dashboard</div>
                        <br/>
                    </div>

                    <div className="col-md-4">

                        <div className="btn-group pull-right" data-toggle="buttons">
                            <label className={this.state.show==="freelancer" ? "btn btn-primary active btn-lg":"btn btn-primary btn-lg"}>
                                <input onClick={this.handleToggle} type="radio" name="freelancerToggle"/>
                                Freelancer
                            </label>
                            <label className={this.state.show==="employer" ? "btn btn-primary active btn-lg":"btn btn-primary btn-lg"} >
                                <input onClick={this.handleToggle} type="radio" name="employerToggle"/>
                                Employer
                            </label>
                        </div>

                    </div>
                </div>


                {this.state.show == "freelancer" && <ProjectFreelancerDashboardList projects={this.props.fprojects ? this.props.fprojects : []}/> }
                {this.state.show == "employer" && <ProjectDashboardList projects={this.props.eprojects ? this.props.eprojects : []}/> }



            </div>

        );
    }

}


function mapStateToProps(state){
    return {
        fprojects:state.dashboard.fprojects,
        eprojects:state.dashboard.eprojects,
        error:state.dashboard.error
    }
}

export default withRouter(connect(mapStateToProps,{fetchFreelancerProjects,fetchEmployerProjects})(DashBoard));
