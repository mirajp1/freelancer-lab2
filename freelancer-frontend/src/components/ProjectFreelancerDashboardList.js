import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import '../css/ProjectList.css';
import ProjectItem from "./ProjectItem";
import ProjectDashboardItem from "./ProjectDashboardItem";
import ProjectFreelancerDashboardItem from "./ProjectFreelancerDashboardItem";

class ProjectFreelancerDashboardList extends Component {
    render() {
        return (


                <div>

                    <div className="row table-header">

                        <div className="col-md-4 col-xs-6">
                            <div>PROJECT</div>
                        </div>

                        <div className="col-md-2 col-xs-2">
                            <div className="pull-right">Employer</div>
                        </div>

                        <div className="col-md-2 col-xs-2">
                            <div className="pull-right">AVG BID</div>

                        </div>

                        <div className="col-md-2 col-xs-2">
                            <div className="pull-right">YOUR BID</div>
                        </div>

                        <div className="col-md-2 col-xs-2">
                            <div className="pull-right">STATUS</div>
                        </div>

                    </div>

                    {this.props.projects.map(function (item,key){
                      return (<ProjectFreelancerDashboardItem key={key} details={item}/>);
                    } )}

                </div>

        );
    }
}

export default withRouter(ProjectFreelancerDashboardList);
