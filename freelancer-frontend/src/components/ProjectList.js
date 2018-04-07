import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import '../css/ProjectList.css';
import ProjectItem from "./ProjectItem";

class ProjectList extends Component {
    render() {
        return (


                <div>

                    <div className="row table-header">

                        <div className="col-md-4 col-xs-6">
                            <div>PROJECT</div>
                        </div>

                        <div className="col-md-2 col-xs-2">
                            <div className="pull-right">EMPLOYER</div>
                        </div>

                        <div className="col-md-2 col-xs-2">
                            <div className="pull-right">BIDS</div>

                        </div>

                        <div className="col-md-2 col-xs-2">
                            <div className="pull-right">DATE</div>
                        </div>

                        <div className="col-md-2 col-xs-2">
                            <div className="pull-right">BUDGET</div>
                        </div>

                    </div>

                    {this.props.projects.map(function (item,key){
                      return (<ProjectItem key={key} details={item}/>);
                    } )}

                </div>

        );
    }
}

export default withRouter(ProjectList);
