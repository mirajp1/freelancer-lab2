import React, {Component} from 'react';
import '../css/BidderItem.css';
import img_default from '../images/default.png';

class BidderItem extends Component {



    render() {
        const {bidder} = this.props.details;
        return (



            <div className="row bid-item">


                <div className="col-md-10">


                    <div className="row">

                        <div className="col-md-2">
                            <img src={img_default} className="img-thumbnail" />
                        </div>

                        <div className="col-md-10">
                            <div className="bid-user-name"><a>{bidder.name}</a></div>
                        </div>
                    </div>


                </div>


                <div className="col-md-2"  align="center">

                    <div className="row">

                        <div className="col-md-12">
                            <div className="bid-amount">${this.props.details.bid_amount?this.props.details.bid_amount:"-"}</div>
                        </div>


                    </div>

                    <div className="row">

                        <div className="col-md-12">
                            <div className="bid-days">in {this.props.details.days?this.props.details.days:"-"} days</div>
                        </div>


                    </div>

                    <div className="row">

                        {this.props.allowHire && <a className="btn btn-info">Hire Me</a>}

                    </div>

                </div>

            </div>


        );
    }

}


export default BidderItem;

