import React, {Component} from 'react';
import '../css/Project.css'
import BidderList from "./BidderList";
import {fetchProject, placeBid} from "../actions/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Bid from "./Bid";

class Project extends Component{


    constructor(){
        super();
        this.state={
            showBidBlock:false,
            allowBid:true,
            allowHire:true
        }
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

    cancelBid(){
        this.setState({showBidBlock:false});
    }

    bidNowButton(e){
        e.preventDefault();
        this.setState({showBidBlock:true});
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
                                    6 days, 23 hours left
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

                    </div>
                </div>
                <br/>
                <br/>

                {this.state.showBidBlock && <Bid placeBid={this.placeBid.bind(this)} cancelBid={this.cancelBid.bind(this)}/>}


                <BidderList bids={bids? bids :[]} allowHire={this.state.allowHire}/>


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

export default withRouter(connect(mapStateToProps,{fetchProject,placeBid})(Project));
