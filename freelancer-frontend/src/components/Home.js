import React, {Component} from 'react';
import * as AuthApi from '../api/auth';
import {connect} from "react-redux";
import {fetchAllOpenProjects, fetchProfile, fetchProject, fetchRelevantProjects} from "../actions/actions";
import img_default from '../images/default.png';
import '../css/Home.css';
import ProjectList from "./ProjectList";
import {withRouter} from "react-router-dom";
import * as qs from "query-string";

class Home extends Component {

    constructor(){
        super();
        this.state={
            show:"all"
        }
        this.handleToggle=this.handleToggle.bind(this);
    }



    componentDidMount(){
        console.log(this.props.match);

        this.props.fetchAllOpenProjects(localStorage.getItem("jwtToken"),"");
        this.props.fetchRelevantProjects(localStorage.getItem("jwtToken"),"");
    }

    handleToggle(e){
        e.preventDefault();

        if(e.target.name==="allToggle"){
            this.setState({show:"all"});
        }
        else{
            this.setState({show:"relevant"})
        }


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

        query=qs.stringify(query);
        this.props.fetchAllOpenProjects(localStorage.getItem("jwtToken"),query);
        this.props.fetchRelevantProjects(localStorage.getItem("jwtToken"),query);
    }


    render() {
        return (

            <div className="container">

                <div className="row">
                    <div className="col-md-5">
                        <div className="header">Freelance Jobs and Contests</div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-inline">

                            <div className="form-group ">
                                <input type="text" value={this.state.search} onChange={this.handleInputChange.bind(this)} name="search" className="form-control"/>
                            </div>
                            <button type="submit"  onClick={this.search.bind(this)} className="btn btn-primary">Search</button>
                        </div>
                    </div>

                    <div className="col-md-3">

                        <div className="btn-group pull-right" data-toggle="buttons">
                            <label className={this.state.show==="all" ? "btn btn-primary active btn-lg":"btn btn-primary btn-lg"}>
                                <input onClick={this.handleToggle} type="radio" name="allToggle"/>
                                All Projects
                            </label>
                            <label className={this.state.show==="relevant" ? "btn btn-primary active btn-lg":"btn btn-primary btn-lg"} >
                                <input onClick={this.handleToggle} type="radio" name="relevantToggle"/>
                                Relevant
                            </label>
                        </div>

                    </div>

                </div>

                <br/>

                {this.state.show == "all" && <ProjectList projects={this.props.all_projects ? this.props.all_projects : []}/> }
                {this.state.show == "relevant" && <ProjectList projects={this.props.relevant_projects ? this.props.relevant_projects : []}/> }


                {/*<ProjectList projects={this.props.projects ? this.props.projects : []}/>*/}


            </div>

        );
    }

}


function mapStateToProps(state){
    return {
        all_projects:state.allOpenProjects.all_projects,
        relevant_projects:state.allOpenProjects.relevant_projects,
        error:state.allOpenProjects.error
    }
}

export default withRouter(connect(mapStateToProps,{fetchAllOpenProjects,fetchRelevantProjects})(Home));
