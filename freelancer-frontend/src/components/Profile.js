import React, {Component} from 'react';
import * as AuthApi from '../api/auth';
import {connect} from "react-redux";
import {fetchProfile, updateProfile} from "../actions/actions";
import img_default from '../images/default.png';
import '../css/Profile.css';
import SkillsList from "./SkillsList";

class Profile extends Component {

    constructor(){
        super();
        this.renderEmail = this.renderEmail.bind(this);
        this.state={
            profileImage:"",
            editMode:false,
            email:"",
            name:"",
            about:"",
            phone:"",

        }
        this.onHandleInputChange = this.onHandleInputChange.bind(this);
        // this.uploadImage = this.uploadImage.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleUpdateButton = this.handleUpdateButton.bind(this);
        this.handleCancelButton = this.handleCancelButton.bind(this);
    }

    componentDidMount(){

        this.props.fetchProfile(localStorage.getItem('jwtToken'),localStorage.getItem('userId'));

        // AuthApi.getProfile(localStorage.getItem('jwtToken'),localStorage.getItem('userId'))
        //     .then(res=>{
        //         this.setState({email:res.User.email,name:res.User.name});
        //     });
    }

    renderEmail(){
        if(this.props.profile){
            return "email:"+this.props.profile.email;
        }
    }

    // uploadImage(e){
    //     e.preventDefault();
    //
    //     let formData = new FormData();
    //
    //     formData.append('image', this.state.profileImage);
    //     formData.append('email', this.state.email);
    //     formData.append('about', this.state.about);
    //     formData.append('name', this.state.name);
    //
    //
    //     this.props.updateProfile(localStorage.getItem("jwtToken"),formData);
    //
    //
    // }

    onHandleInputChange(e){
        e.preventDefault();

        if(e.target.name==="profileImage") {
            this.setState({[e.target.name]: e.target.files[0]});
        }
        else{
            this.setState({[e.target.name]:e.target.value});
        }
    }

    handleEditButton(e){
        e.preventDefault();

        this.setState({
            editMode:true,
            email:this.props.profile ? this.props.profile.email:"",
            about:this.props.profile ? this.props.profile.about:"",
            name:this.props.profile ? this.props.profile.name:"",
            phone:this.props.profile ? this.props.profile.phone:"",


        });
    }

    handleUpdateButton(e){
        e.preventDefault();
        this.setState({editMode:false});
        console.log(this.state);

        let formData = new FormData();

        formData.append('image', this.state.profileImage);
        formData.append('email', this.state.email);
        formData.append('about', this.state.about);
        formData.append('name', this.state.name);
        formData.append('phone', this.state.phone);


        this.props.updateProfile(localStorage.getItem("jwtToken"),formData);
    }

    handleCancelButton(e){
        e.preventDefault();

        this.setState({editMode:false});
    }



    render() {
        if(this.props.profile) {
            var {skills} = this.props.profile;
            // console.log(skills);
        }
        return (

            <div className="container">


                <div className="row profile-top-row">

                    <div className="col-md-3 left-background"  align="center">

                        <div className="row">

                            <div className="col-md-12">
                                <img className="img-responsive  " src={this.props.profile? this.props.profile.image:""}/>
                                {this.state.editMode && <span>
                                    <br/><input type="file" name="profileImage" onChange={this.onHandleInputChange} accept="image/x-png,image/gif,image/jpeg" /><br/>
                                </span>}

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-12">
                                {!this.state.editMode && <h5>{this.props.profile ? this.props.profile.email : ""}</h5>}
                                {this.state.editMode && <div className="row">
                                    <div className="form-group">
                                        <input type="email" className="form-control input-lg"  onChange={this.onHandleInputChange} value={this.state.email} name="email" placeholder="Email"/>
                                    </div>
                                </div>}

                                {!this.state.editMode && <h5>{this.props.profile ? this.props.profile.phone : ""}</h5>}
                                {this.state.editMode && <div className="row">
                                    <div className="form-group">
                                        <input type="text" className="form-control input-lg"  onChange={this.onHandleInputChange} value={this.state.phone} name="phone" placeholder="Phone No."/>
                                    </div>
                                </div>}

                            </div>

                        </div>

                    </div>

                    <div className="col-md-6 left-background">

                        <div className="row">

                            <div className="col-md-12">
                                {!this.state.editMode && <h3>{this.props.profile ? this.props.profile.name : null}</h3>}
                                {this.state.editMode && <div className="row">
                                    <div className="form-group">
                                        <input type="text" className="form-control input-lg"  onChange={this.onHandleInputChange} value={this.state.name} name="name" placeholder="Name"/>
                                    </div>
                                </div>}
                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-12">
                                {!this.state.editMode && <div>{this.props.profile ? this.props.profile.about : ""}</div>}
                                {this.state.editMode && <div className="row">
                                    <div className="form-group">
                                        <textarea rows="5" className="form-control input-lg"  onChange={this.onHandleInputChange} value={this.state.about} name="about" placeholder="Description"/>
                                    </div>
                                </div>}
                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 right-background">

                        <div className="row">

                            <div className="col-md-12">


                                {!this.state.editMode && <button onClick={this.handleEditButton} className="btn btn-primary btn-lg btn-block">
                                    <span className="glyphicon glyphicon-edit" aria-hidden="true"/> Edit Profile
                                </button>}

                                {this.state.editMode &&
                                <button onClick={this.handleCancelButton} className="btn btn-primary btn-lg btn-block">
                                    <span className="glyphicon glyphicon-remove" aria-hidden="true"/> Cancel
                                </button>}
                                {this.state.editMode && <button onClick={this.handleUpdateButton} className="btn btn-primary btn-lg btn-block">
                                    <span className="glyphicon glyphicon-edit" aria-hidden="true"/> Update
                                </button>
                                }
                            </div>

                        </div>
                        <br/>
                        <div className="row">

                            <div className="col-md-12">
                                {!this.state.editMode && <h2 className="rate-amount">$40 USD/hr</h2>}
                                {this.state.editMode && <div className="row">
                                    <div className="form-group">
                                        <input type="text" className="form-control input-lg"  value="40" name="rate" placeholder="rate"/>
                                    </div>
                                </div>}
                            </div>

                        </div>
                        <hr/>
                    </div>




                </div>





                <div className="row profile-skill-row">

                    <div className="profile-skill-column col-md-3 col-md-offset-9">

                        <SkillsList skills={skills ? skills :[]}/>

                    </div>

                </div>



                {/*{console.log(JSON.stringify(this.props.user.password))}*/}
                {/*{this.renderEmail()}*/}




            </div>


        );
    }

}

function mapStateToProps(state) {
    return {
        profile: state.profile.profile,
    };
}

export default connect(mapStateToProps, { fetchProfile,updateProfile })(Profile);

