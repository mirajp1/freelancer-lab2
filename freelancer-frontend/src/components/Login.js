import React, {Component} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Row} from "react-bootstrap";

import { connect } from 'react-redux';
import { loginUser } from '../actions/actions';
import '../css/Login.css';
import logo from '../images/logo.png';


class Login extends Component {

    constructor(){
        super();
        this.showError = this.showError.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        var payload = {
            email:this.emailInput.value,
            password:this.passwordInput.value
        };


        this.props.loginUser(payload);

        // AuthApi.login(payload)
        //     .then((res)=>{
        //         console.log(res);
        //         if(res.success === true){
        //             localStorage.setItem('jwtToken', res.token);
        //             localStorage.setItem('userId', res.user.id);
        //             this.props.history.push('/profile');
        //         }
        //     });
    }


    showError(){
        console.log(this.props.error);
        if(this.props.error && this.props.error.length>0){
            return (
                <div className="alert alert-danger" role="alert">{this.props.error}</div>


            );
        }
    }
    render() {
        return (

            <div className="container ">
            <div className="row">

                <div className="card col-xs-offset-0 col-xs-12 col-md-offset-4 col-md-4">

                    <div className="row">
                        <div className="col-md-12" align="center">

                            <br/>
                            <img src={logo} className="img-responsive"/>
                            <br/>
                            <hr/>
                            <br/>
                        </div>
                    </div>
                <Row >
                    <Col xs={12}  md={12}>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormGroup controlId="email" bsSize="large">
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    inputRef={(ref)=>this.emailInput=ref}
                                />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    type="password"
                                    inputRef={(ref)=>this.passwordInput=ref}
                                />
                            </FormGroup>
                            {this.showError()}
                            <br/>
                            <Button
                                block
                                bsSize="large"
                                type="submit"
                                bsStyle="primary"

                            >
                                Login
                            </Button>
                        <br/>
                        <br/>
                        </Form>
                    </Col>
                </Row>

                </div>
            </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    // console.log(state.auth.error);

    return {
        user: state.auth.user,
        error:state.auth.error,
    };
}

export default connect(mapStateToProps, { loginUser })(Login);

