import React, {Component} from 'react';
import '../css/ProjectItem.css';

class TransactionItem extends Component {



    render() {

        const {to,from,project,amount,type} = this.props.details;
        const userId = localStorage.getItem('userId');

        return (


            <div className="row project-item">

                <div className="col-md-2">

                    <div className="row">
                        <div className="col-md-12">
                            <div><a href="#">{to?(to._id===userId ? "You":to.name):"-"}</a></div>
                        </div>
                    </div>

                </div>

                <div className="col-md-2">

                    <a className="project-bid pull-right">{from?(from._id===userId ? "You":from.name):"-"}</a>

                </div>

                <div className="col-md-3">

                    <div className="project-bid pull-right">{project ? <a href={"/projects/"+project._id}>{project.name}</a>:"-"}</div>

                </div>

                {/*<div className="col-md-2">*/}

                    {/*<div className="row ">*/}

                        {/*<div className="col-md-12">*/}
                            {/*<div className="pull-right project-started">{"Today"}</div>*/}
                        {/*</div>*/}


                    {/*</div>*/}

                    {/*<div className="row ">*/}

                        {/*<div className="col-md-12">*/}
                           {/*<div className="project-days pull-right">{"6d 15h"}</div>*/}
                        {/*</div>*/}


                    {/*</div>*/}

                {/*</div>*/}

                <div className="col-md-2">

                    <div className="row">

                        <div className="col-md-12">
                            <div className="project-budget pull-right">{type ? type:"-"}</div>
                        </div>


                    </div>

                </div>

                <div className="col-md-3">

                    <div className="row">

                        <div className="col-md-12">
                            <div className="project-budget pull-right">{amount ? "$"+amount:"-"}</div>
                        </div>


                    </div>

                </div>

            </div>


        );
    }

}


export default TransactionItem;

