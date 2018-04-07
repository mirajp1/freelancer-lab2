import React, {Component} from 'react';
import '../css/ProjectItem.css';

class ProjectItem extends Component {



    render() {

        const {freelancer,skills,bids,creator} = this.props.details;
        return (



            <div className="row project-item">

                <div className="col-md-4">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="project-name"><a href={"/projects/"+this.props.details._id}>{this.props.details.name}</a></div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="project-description">{this.props.details.description}</div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="project-skills">{skills && skills.map((item)=>{return item.name+","})}</div>
                        </div>
                    </div>

                </div>

                <div className="col-md-2">

                    <a className="project-bid pull-right">{freelancer ? freelancer.name:"Not Assigned"}</a>

                </div>

                <div className="col-md-2">

                    <div className="project-bid pull-right">{"$"+this.props.details.average_bid+""}</div>

                </div>

                <div className="col-md-2">

                    <div className="row ">

                        <div className="col-md-12">
                            <div className="pull-right project-started">{"April 30,2018"}</div>
                        </div>


                    </div>

                    <div className="row ">

                        <div className="col-md-12">
                           <div className="project-days pull-right">{}</div>
                        </div>


                    </div>

                </div>

                <div className="col-md-2">

                    <div className="row">

                        <div className="col-md-12">
                            <div className="project-budget pull-right">{this.props.details && this.props.details.status}</div>
                        </div>


                    </div>

                    <div className="row">

                        <br/>
                        {/*<a className="btn btn btn-warning btn-sm pull-right" href={"/projects/"+this.props.details.id} >Bid Now</a>*/}


                    </div>

                </div>

            </div>


        );
    }

}


export default ProjectItem;

