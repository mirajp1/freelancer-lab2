import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import '../css/ProjectList.css';
import ProjectItem from "./ProjectItem";
import Pagination from "react-js-pagination";


class ProjectList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            itemsPerPage:2
        };
        this.handlePageChange=this.handlePageChange.bind(this)
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    render() {
        const { activePage, itemsPerPage } = this.state;
        const { projects } = this.props;
        const indexOfLastTodo = activePage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        const currentprojects = projects.slice(indexOfFirstTodo, indexOfLastTodo);


        return (

                <div>

                    <div className="row table-header">

                        <div className="col-md-6 col-xs-6">
                            <div>PROJECT</div>
                        </div>

                        <div className="col-md-2 col-xs-2">
                            <div className="pull-right">EMPLOYER</div>
                        </div>

                        <div className="col-md-2 col-xs-2">
                            <div className="pull-right">BIDS</div>

                        </div>

                        {/*<div className="col-md-2 col-xs-2">*/}
                            {/*<div className="pull-right">DATE</div>*/}
                        {/*</div>*/}

                        <div className="col-md-2 col-xs-2">
                            <div className="pull-right">BUDGET</div>
                        </div>

                    </div>

                    {currentprojects.map(function (item,key){
                      return (<ProjectItem key={key} details={item}/>);
                    } )}

                    <div>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage ={this.state.itemsPerPage}
                            totalItemsCount={this.props.projects.length}
                            pageRangeDisplayed={10}
                            onChange={this.handlePageChange}
                        />
                    </div>

                </div>

        );
    }
}

export default withRouter(ProjectList);
