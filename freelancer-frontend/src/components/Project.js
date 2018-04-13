import React, {Component} from 'react';
import '../css/Project.css'
import BidderList from "./BidderList";
import {fetchProject, hire, makePayment, placeBid, submitSolution} from "../actions/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Bid from "./Bid";
import SubmitSolution from "./SubmitSolution";

class Project extends Component{


    constructor(){
        super();
        this.state={
            showBidBlock:false,
            allowBid:true,
            allowHire:true,
            hired:false,
            employer:false,
            employee:false,
        }
        this.hire=this.hire.bind(this);
        this.makePayment=this.makePayment.bind(this);
        this.submitSolution=this.submitSolution.bind(this);
    }

    componentDidMount(){
        console.log(this.props.match);

        this.props.fetchProject(localStorage.getItem("jwtToken"),this.props.match.params.projectId);
    }

    placeBid(days,value){
        var data ={
            days:days,
            bid_amount:value
        }


        console.log(data);
        this.props.placeBid(localStorage.getItem("jwtToken"),data,this.props.match.params.projectId)
        this.setState({showBidBlock:false});


    }

    submitSolution(data){

        const {solution_file,text} = data
        let formData = new FormData();

        formData.append('text', text);
        formData.append('solution_file', solution_file);

        console.log("submit solution called");
        console.log(solution_file+":"+text);

        this.props.submitSolution(localStorage.getItem("jwtToken"),formData,this.props.match.params.projectId)

    }

    makePayment(e){
        e.preventDefault();

        console.log("make payment called");

        this.props.makePayment(this.props.match.params.projectId)

    }

    cancelBid(){
        this.setState({showBidBlock:false});
    }

    bidNowButton(e){
        e.preventDefault();
        this.setState({showBidBlock:true});
    }

    hire(user){
        console.log("hire");
        var data ={
            userId:user._id
        }
        this.props.hire(localStorage.getItem("jwtToken"),data,this.props.match.params.projectId)
    }

    render(){

         const {creator,bids,skills} = this.props.project;
         console.log(creator);
         console.log(bids);

         //check to allow bid
        if(this.props.project && this.state.allowBid){
            const {creator,bids} = this.props.project;
            let user = localStorage.getItem('userId');

            if(creator && creator._id == user){
                console.log("creator - cant't bid")
                this.setState({allowBid:false});
            }
            else if(bids){
                bids.some(function(item){
                    if(item.bidder && item.bidder._id ==user){
                        this.setState({allowBid:false});
                        console.log("already bid!")
                        return true;
                    }
                }.bind(this));
            }
            else if(this.state.hired){
                this.setState({allowBid:false});
            }
        }

        //check to allow hire
        if(this.props.project && this.state.allowHire){
            const {creator,freelancer} = this.props.project;
            let user = localStorage.getItem('userId');


            if(creator && creator._id != user ){
                console.log("not creator - cant't hire")
                this.setState({allowHire:false});
            }
            else if(freelancer){
                console.log("already hired - cant't hire")
                this.setState({allowHire:false});
            }
        }

        //check employer
        if(this.props.project && !this.state.employer){
            const {creator} = this.props.project;
            let user = localStorage.getItem('userId');


            if(creator && creator._id == user ){
                console.log("you are creator")
                this.setState({employer:true});
            }
        }

        //check employee
        if(this.props.project && !this.state.employee){
            const {freelancer} = this.props.project;
            let user = localStorage.getItem('userId');


            if(freelancer && freelancer._id == user ){
                console.log("you are freelancer")
                this.setState({employee:true});
            }
        }


        //check hired
        if(this.props.project && !this.state.hired){
            const {freelancer} = this.props.project;
            if(freelancer){
                console.log("Hired");
                this.setState({hired:true});
            }
        }


        return(



            <div className="container project-details-background">

                <div className="row">
                    <div className="col-md-12">
                        <div className="header">{this.props.project ? this.props.project.name:"loading"}</div>
                        <br/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 project-data">
                        <div className="row">
                            <div className="col-md-1 column-center column-border-right">
                                <div className="row">
                                    Bids
                                </div>
                                <div className="row number-text">
                                    {bids ? bids.length : 0}
                                </div>
                            </div>
                            <div className="col-md-2 column-center column-border-right">
                                <div className="row">
                                    Avg Bid (USD)
                                </div>
                                <div className="row number-text">
                                    ${this.props.project.average_bid? this.props.project.average_bid:0 } / hr
                                </div>
                            </div>
                            <div className="col-md-2 column-center">
                                <div className="row">
                                    Project Budget (USD)
                                </div>
                                <div className="row number-text">
                                    ${this.props.project? this.props.project.budget_range:0} / hr
                                </div>
                            </div>
                            <div className="col-md-offset-4 col-md-3 column-center days-colors">
                                <div className="row">
                                    STATUS
                                </div>
                                <div className="row open-text">
                                    {this.props.project.status}
                                </div>
                            </div>

                        </div>
                        <br/>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="row">

                    <div className="col-md-12 project-data">

                        <div className="row">
                            <div className="col-md-6">
                                <div className="body-header">Project Description</div>
                            </div>
                            {this.state.allowBid && <div className="col-md-6 ">
                                <a  onClick={this.bidNowButton.bind(this)} className="pull-right btn btn-primary btn-lg">Bid On this Project</a>
                            </div>}

                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <p className="body-text">{this.props.project ? this.props.project.description:"loading"}</p>
                                <br/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="body-header">Skills required</div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-7">
                                <p className="body-text">{skills ? skills.map((item)=>{return item.name+","}):"loading" }</p>
                                <br/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="body-header">Project File</div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-7">
                                <p className="body-text">{this.props.project.file ? <a href={this.props.project.file}>Download</a>:"No File"}</p>
                                <br/>
                            </div>
                        </div>

                    </div>
                </div>
                <br/>
                <br/>

                {this.state.showBidBlock && <Bid placeBid={this.placeBid.bind(this)} cancelBid={this.cancelBid.bind(this)}/>}

                {this.state.hired && <div className="row">

                    <div className="col-md-12 project-data">

                        <div className="row">
                            <div className="col-md-6">
                                <div className="body-header">Hired Freelancer</div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-md-7">
                                <p className="body-text">{this.props.project.freelancer ? this.props.project.freelancer.name:"NaN"}</p>
                                <br/>
                            </div>
                        </div>



                    </div>

                </div>}

                {this.state.hired && this.state.employer && <div className="row">
                    <br/>
                    <br/>
                    <div className="col-md-12 project-data">

                        <div className="row">
                            <div className="col-md-6">
                                <div className="body-header">Submitted Solution</div>
                            </div>
                            {this.props.project.status!=="CLOSED" &&<div className="col-md-6">
                                <button className="btn pull-right btn-primary btn-md" onClick={this.makePayment}>Make Payment</button>
                            </div>}

                        </div>

                        <div className="row">
                            <div className="col-md-8">
                                <p><div className="body-text">{this.props.project.solution && this.props.project.solution.text}</div></p>
                            </div>

                        </div>


                        <div className="row">
                            <div className="col-md-6">
                                <div className="body-header">Files</div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-7">
                                <p className="body-text">{(this.props.project.solution && this.props.project.solution.solution_file)? <a href={this.props.project.solution.solution_file}>File Download</a>:"No Solution Yet!"}</p>
                            </div>
                        </div>

                        {/*<div className="row">*/}
                            {/*<div className="col-md-7">*/}
                                {/*<button className="btn btn-primary btn-lg" onClick={this.makePayment}>Make Payment</button>*/}
                                {/*<br/>*/}
                            {/*</div>*/}
                        {/*</div>*/}

                    <br/>

                    </div>

                </div>}

                <br/>

                {this.state.hired && this.state.employee && <div className="row">
                    <br/>
                    <div className="col-md-12 project-data">



                        {this.props.project.solution &&

                        <div className="col-md-12">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="body-header">Submitted Solution</div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <p><div className="body-text">{this.props.project.solution.text}</div></p>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="body-header">Files</div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-7">
                                    <p className="body-text">{this.props.project.solution.solution_file ? <a href={this.props.project.solution.solution_file}>Download</a>:"No File Submitted"}</p>
                                    <br/>
                                </div>
                            </div>

                        </div>

                        }

                        {!this.props.project.solution &&

                            <div className="row">
                                <div className="col-md-12">
                                    <SubmitSolution submitSolution={this.submitSolution}/>
                                </div>

                            </div>

                        }


                    </div>

                </div>}

                <br/>


                <BidderList bids={bids? bids :[]} allowHire={this.state.allowHire} handleHire={this.hire}/>

                <br/>
                <br/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        project:state.project.project,
        error:state.project.error
    }
}

export default withRouter(connect(mapStateToProps,{fetchProject,placeBid,hire,submitSolution,makePayment})(Project));
