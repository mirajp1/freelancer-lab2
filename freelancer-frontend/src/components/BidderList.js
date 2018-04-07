import React, {Component} from 'react';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {withRouter} from "react-router-dom";
import '../css/SkillsList.css';
import ProjectItem from "./ProjectItem";
import BidderItem from "./BidderItem";

class BidderList extends Component {
    render() {
        return (


                <div>

                    <div className="row table-header">

                        <div className="col-md-10 col-xs-6">
                            FREELANCERS BIDDING
                        </div>

                        <div className="col-md-2 col-xs-2">
                            BID(USD)
                        </div>

                    </div>

                    {this.props.bids && this.props.bids.map(function (item,key){
                      return (<BidderItem key={key} details={item} allowHire={this.props.allowHire}/>);
                    }.bind(this) )}

                </div>

        );
    }
}

export default withRouter(BidderList);
