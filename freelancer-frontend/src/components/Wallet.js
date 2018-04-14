import React, {Component} from 'react';
import {connect} from "react-redux";
import '../css/Home.css';
import ProjectList from "./ProjectList";
import {withRouter} from "react-router-dom";
import {
    addMoney, fetchEmployerProjects, fetchFreelancerProjects, fetchProfile,
    withdrawMoney
} from "../actions/actions";
import ProjectDashboardList from "./ProjectDashboardList";
import ProjectFreelancerDashboardList from "./ProjectFreelancerDashboardList";
import TransactionItem from "./TransactionItem";
import TransactionList from "./TransactionList";
import PieChart from 'react-svg-piechart';

class Wallet extends Component {


   data = [
        {title: "Data 1", value: 100, color: "#22594e"},
        {title: "Data 2", value: 60, color: "#2f7d6d"},
    ];

    constructor(){
        super();
        this.state= {
            amount_add: 0,
            amount_withdraw: 0,
            pie: []
        }

        this.showError=this.showError.bind(this);
        this.createPieData=this.createPieData.bind(this);
    }


    componentDidMount(){
        console.log(this.props.match);

        this.props.fetchProfile(localStorage.getItem('jwtToken'),localStorage.getItem('userId'));        // this.props.fetchEmployerProjects(localStorage.getItem("jwtToken"));
    }

    addMoney(e){
        e.preventDefault();

        var data = {
            amount:this.state.amount_add
        }
        this.setState({amount_add:0})
        this.props.addMoney(data);
    }

    createPieData(){
        if(this.state.pie.length===0) {
            console.log("pie data calculation")
            let data = [];
            let incoming = {
                title: "Incoming",
                color: "#22594e",
                value: 0
            }
            let outgoing = {
                title: "Outgoing",
                color: "#a1d9ce",
                value: 0
            }
            if (this.props.profile && this.props.profile.transactions) {
                let userId = localStorage.getItem('userId');
                this.props.profile.transactions.map((item) => {
                    console.log(userId+":"+item.to)
                    console.log(userId+":"+item.from)

                    if ((item.to && item.to._id == userId) || item.type === "ADD") {
                        incoming.value = incoming.value + item.amount;
                    }

                    if ((item.from && item.from._id == userId) || item.type === "WITHDRAW") {
                        outgoing.value = outgoing.value + item.amount;
                    }
                })
                data.push(incoming);
                data.push(outgoing);
                this.setState({pie: data});
            }

        }
    }

    withdrawMoney(e){
        e.preventDefault();

        var data = {
            amount:this.state.amount_withdraw
        }
        this.setState({amount_withdraw:0})
        this.props.withdrawMoney(data);
    }

    showError(){
        console.log(this.props.error);
        if(this.props.error && this.props.error.length>0){
            return (
                <div className="alert alert-danger" role="alert">{this.props.error}</div>


            );
        }
    }

    onHandleInputChange(e){
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value});
    }

    render() {

        {this.createPieData()}
        return (

            <div className="container">

                <div className="row">
                    <div className="col-md-8">
                        <div className="header">Wallet</div>
                        <br/>
                    </div>


                </div>

                <div className="row">

                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-12">
                                <div>Balance: {"$"+this.props.profile.balance}</div>
                                <br/>
                            </div>

                        </div>


                        {this.showError()}

                        <div className="row">
                            <div className="form-inline col-md-6">

                                <div className="form-group ">
                                    <input type="number" value={this.state.amount_add} onChange={this.onHandleInputChange.bind(this)} name="amount_add" className="form-control" id="amount"/>
                                </div>
                                <button type="submit"  onClick={this.addMoney.bind(this)} className="pull-right btn btn-primary">Add</button>
                            </div>

                        </div>

                        <br/>
                        <div className="row">
                            <div class="form-inline col-md-6">

                                <div class="form-group">
                                    <input type="number" value={this.state.amount_withdraw} onChange={this.onHandleInputChange.bind(this)} name="amount_withdraw" class="form-control" id="amount"/>
                                </div>

                                <button type="submit" onClick={this.withdrawMoney.bind(this)} className=" pull-right btn btn-primary">Withdraw</button>

                            </div>

                        </div>


                    </div>

                    <div className=" col-md-offset-2 col-md-2">
                        <PieChart  data={this.state.pie}/>

                        <br/>
                    </div>

                </div>


                <br/>


                <div className="row">
                    <div className="col-md-8">
                        <div className="header">Transactions</div>
                        <br/>
                    </div>

                </div>

                <TransactionList transactions={this.props.profile.transactions?this.props.profile.transactions:[] }/>



                {/*{this.state.show == "freelancer" && <ProjectFreelancerDashboardList projects={this.props.fprojects ? this.props.fprojects : []}/> }*/}
                {/*{this.state.show == "employer" && <ProjectDashboardList projects={this.props.eprojects ? this.props.eprojects : []}/> }*/}



            </div>

        );
    }

}


function mapStateToProps(state){
    return {
        profile: state.profile.profile,
        error:state.profile.error
    };
}

export default withRouter(connect(mapStateToProps,{fetchProfile,addMoney,withdrawMoney})(Wallet));
