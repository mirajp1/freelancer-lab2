import React, {Component} from 'react';
import '../css/ProjectItem.css';

class ProjectItem extends Component {



    render() {

        const {Skills,Bids,User:{Profile}} = this.props.details;
        return (



            <div className="row project-item">

                <div className="col-md-4">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="project-name"><a href={"/projects/"+this.props.details.id}>{this.props.details.name}</a></div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="project-description">{this.props.details.description}</div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="project-skills">{Skills.map((item)=>{return item.name+","})}</div>
                        </div>
                    </div>

                </div>

                <div className="col-md-2">

                    <a className="project-bid pull-right">{Profile && Profile.name}</a>

                </div>

                <div className="col-md-2">

                    <div className="project-bid pull-right">{"$"+Bids.length*100+""}</div>

                </div>

                <div className="col-md-2">

                    <div className="row ">

                        <div className="col-md-12">
                            <div className="pull-right project-started">{"$101"}</div>
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
                            <div className="project-budget pull-right">{this.props.key%2 === 0 ? "OPEN" : "DONE"}</div>
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

