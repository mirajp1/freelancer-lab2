import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import '../css/ProjectList.css';
import ProjectItem from "./ProjectItem";
import Pagination from "react-js-pagination";
import TransactionItem from "./TransactionItem";


class TransactionList extends Component {




    render() {

        return (

                <div>

                    <div className="row table-header">

                        <div className="col-md-2 col-xs-4">
                            <div>TO</div>
                        </div>

                        <div className="col-md-2 col-xs-2">
                            <div className="pull-right">FROM</div>
                        </div>

                        <div className="col-md-3 col-xs-2">
                            <div className="pull-right">PROJECT</div>

                        </div>

                        <div className="col-md-2 col-xs-2">
                            <div className="pull-right">TYPE</div>
                        </div>

                        <div className="col-md-3 col-xs-2">
                            <div className="pull-right">AMOUNT</div>
                        </div>



                    </div>

                    {this.props.transactions.map(function (item,key){
                      return (<TransactionItem key={key} details={item}/>);
                    } )}


                </div>

        );
    }
}

export default withRouter(TransactionList);
