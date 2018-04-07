import React, {Component} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Radio, Row} from "react-bootstrap";
import * as AuthApi from '../api/auth';
import logo from '../images/logo.png'
class Signup extends Component {

    constructor(){
        super();
        this.state={
            error:""
        }
        this.showError=this.showError.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        var payload = {
            email:this.emailInput.value,
            password:this.passwordInput.value,
            userType:this.workInput.checked ===true ?this.workInput.value : this.hireInput.value
        };

        console.log("sending:"+payload.userType);

        AuthApi.signup(payload)
            .then((res)=>{
                console.log(res);
                if(res.error){
                    this.setState({error:res.error});
                }
                else{
                    this.props.history.push("/login")
                }
            });
    }

    showError(){
        console.log(this.props.error);
        if(this.state.error && this.state.error.length>0){
            return (
                <div className="alert alert-danger" role="alert">{this.state.error}</div>


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
                <Row>
                    <Col xs={12} md={12}>
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
                            <FormGroup>
                                <Radio value="work" inputRef={(ref)=>this.workInput=ref} name="radioGroup" inline>
                                    Work
                                </Radio>{' '}
                                <Radio value="hire"inputRef={(ref)=>this.hireInput=ref} name="radioGroup" inline>
                                    Hire
                                </Radio>{' '}
                            </FormGroup>
                            {this.showError()}
                            <br/>
                            <Button
                                block
                                bsSize="large"
                                type="submit"
                                bsStyle="primary"

                            >
                                Sign Up
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

export default Signup;
