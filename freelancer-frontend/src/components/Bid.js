import React, {Component} from 'react';
import '../css/ProjectItem.css';

class Bid extends Component {

    constructor(){
        super();
        this.state = {
            days:"",
            value:"",
        }
        this.placeBidButton = this.placeBidButton.bind(this);
        this.cancelBid = this.cancelBid.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e){
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value})
    }


    placeBidButton(e){
        e.preventDefault();
        console.log(this.state);
        const {days,value} = this.state;
        this.props.placeBid(days,value);
    }

    cancelBid(e){
        e.preventDefault();
        this.props.cancelBid();
    }

    render() {

        return (

            <div className="row">

                <div className="col-md-12 project-data">


                        <div className="row">
                            <div className="col-md-offset-3 col-md-6">
                                <div className="body-header">Days</div>
                                <br/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-offset-3 col-md-6">
                                <input type="text" name="days" onChange={this.handleInputChange} value={this.state.days} className="text-box" placeholder="Deliver in"/>
                                <br/>
                            </div>
                        </div>
                        <br/>

                        <div className="row">
                            <div className="col-md-offset-3 col-md-6">
                                <div className="body-header">Bid Amount</div>
                                <br/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-offset-3 col-md-6">
                                <input type="text" name="value" onChange={this.handleInputChange} value={this.state.value} className="text-box" placeholder="Bid amount"/>
                                <br/>
                            </div>
                        </div>
                        <br/>

                        <div className="row" >
                            <div className="col-md-offset-3 col-md-6">
                                <button type="button" onClick={this.placeBidButton} className="btn post-project-btn">Bid Now</button>
                                <span>             </span><button type="button" onClick={this.cancelBid} className="btn btn-danger post-project-btn">Cancel</button>

                                <br/>
                            </div>
                        </div>

                        <br/>

                    <br/>

                </div>
            </div>



        );
    }

}


export default Bid;

