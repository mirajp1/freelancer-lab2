import React, {Component} from 'react';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {withRouter} from "react-router-dom";
import '../css/SkillsList.css';
import ProjectItem from "./ProjectItem";
import BidderItem from "./BidderItem";

class BidderList extends Component {

    constructor(props){
        super(props);
        this.state={
            sort:"ASC"
        }
        this.onSortClick=this.onSortClick.bind(this)
    }

    sortASC(a,b){
        return a.bid_amount - b.bid_amount
    }

    sortDESC(a,b){
        return b.bid_amount - a.bid_amount
    }

    onSortClick(e) {
        e.preventDefault();
        let {sort} = this.state;
        if(sort==="DESC"){
            sort="ASC";
        }
        else{
            sort="DESC"
        }

        this.setState({sort})
    }

    render() {

        const {bids} = this.props;
        if(this.state.sort==='ASC'){
            bids.sort(this.sortASC)
        }
        else{
            bids.sort(this.sortDESC)
        }

        return (


                <div>

                    <div className="row table-header">

                        <div className="col-md-10 col-xs-6">
                            FREELANCERS BIDDING
                        </div>

                        <div className="col-md-2 col-xs-2">
                            <a style={{color:'inherit'}} onClick={this.onSortClick}>BID(USD)   <span class={this.state.sort==="ASC" ? "glyphicon glyphicon-sort-by-order":"glyphicon glyphicon-sort-by-order-alt"}   aria-hidden="true"></span></a>
                        </div>

                    </div>

                    {bids.map(function (item,key){
                      return (<BidderItem handleHire={this.props.handleHire} key={key} details={item} allowHire={this.props.allowHire}/>);
                    }.bind(this) )}

                </div>

        );
    }


}

export default withRouter(BidderList);
