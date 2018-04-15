import React, {Component} from 'react';
import {connect} from "react-redux";
import '../css/Home.css';
import ProjectList from "./ProjectList";
import {withRouter} from "react-router-dom";
import {fetchEmployerProjects, fetchFreelancerProjects} from "../actions/actions";
import ProjectDashboardList from "./ProjectDashboardList";
import ProjectFreelancerDashboardList from "./ProjectFreelancerDashboardList";
import * as qs from "query-string";

class DashBoard extends Component {

    constructor(){
        super();
        this.state={
            show:"freelancer",
            status:"all",
            search:"",
        }
        this.handleToggle=this.handleToggle.bind(this);
    }


    componentDidMount(){
        console.log(this.props.match);

        this.props.fetchFreelancerProjects(localStorage.getItem("jwtToken"),"");
        this.props.fetchEmployerProjects(localStorage.getItem("jwtToken"),"");
    }

    handleInputChange(e){
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value});
    }

    search(e){
        e.preventDefault();
        var query={
            name:this.state.search
        }

        if(this.state.status!=="all")
            query.status=this.state.status;

        query=qs.stringify(query);
        this.props.fetchFreelancerProjects(localStorage.getItem("jwtToken"),query);
        this.props.fetchEmployerProjects(localStorage.getItem("jwtToken"),query);
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
                    <div className="col-md-5">
                        <div className="header">Dashboard</div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-inline">

                            <div className="form-group ">
                                <input type="text" value={this.state.search} onChange={this.handleInputChange.bind(this)} name="search" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <select className="form-control" name="status" value={this.state.status} onChange={this.handleInputChange.bind(this)}>
                                    <option value="all">All</option>
                                    <option value="OPEN">OPEN</option>
                                    <option value="HIRED">HIRED</option>
                                    <option value="CLOSED">CLOSED</option>
                                </select>
                            </div>
                            <button type="submit"  onClick={this.search.bind(this)} className="btn btn-primary">Search</button>
                        </div>
                    </div>

                    <div className="col-md-3">

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
