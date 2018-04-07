import React, {Component} from 'react';
import '../css/AddProject.css'
import {addProject} from "../actions/actions";
import {connect} from "react-redux";
import logo from '../images/logo.png'
class AddProject extends Component{

    constructor(){
        super();
        this.state = {
            name:"",
            description:"",
            skills:"",
            budget_range:"",
            file:""
        }

        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleAddProject=this.handleAddProject.bind(this);
        this.showError=this.showError.bind(this);
    }

    handleInputChange(e){
        e.preventDefault();

        if(e.target.name==="file") {
            this.setState({[e.target.name]: e.target.files[0]});
            // console.log(e.target.files[0].name);
        }
        else
            this.setState({[e.target.name]:e.target.value});
    }

    handleAddProject(e){
        e.preventDefault();

        let formData = new FormData();

        formData.append('name', this.state.name);
        formData.append('description', this.state.description);
        formData.append('budget_range', this.state.budget_range);
        formData.append('file', this.state.file);
        formData.append('skills', this.state.skills.split(','));

        var project ={
            name:this.state.name,
            description:this.state.description,
            budget_range:this.state.budget_range,
            file:"",
            skills:this.state.skills.split(',')
        }

        this.props.addProject(localStorage.getItem("jwtToken"),formData);

        console.log(project);
    }

    showError(){
        console.log(this.props.error);
        if(this.props.error && this.props.error.length>0){
            return (
                <div className="alert alert-danger" role="alert">{this.props.error}</div>


            );
        }
    }

    render(){
        return(
            <div className="container">

                <div className="row">

                    <div className="col-xs-12 col-xs-offset-0 col-md-offset-3 col-md-6">


                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <img src={logo}/>
                        </div>
                        <br/>
                    </div>
                </div>

                <div className="row">
                    <div className="">
                        <div className="header">Tell us what you need done</div>
                    </div>
                </div>

                <div className="row">
                    <div className="">

                        <p className="header-text">Get free quotes from skilled freelancers within minutes, view profiles, ratings and portfolios and chat with them. Pay the freelancer only when you are 100% satisfied with their work.</p>

                        <br/>
                    </div>
                </div>
                <div>
                    <form onSubmit={this.handleAddProject}>

                        <div className="row">
                            <div className="">
                                <div className="body-header">Choose a name for your project</div>
                                <br/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="">
                                <input type="text" name="name" onChange={this.handleInputChange}  className="text-box"  placeholder="e.g. Create an App"/>
                                <br/>
                            </div>
                        </div>

                        <br/>
                        <br/>

                        <div className="row">
                            <div className="">
                                <div className="body-header">Tell us more about your project</div>
                                <br/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="">
                                <p className="body-text">Great project descriptions include a little bit about yourself, details of what you are trying to achieve, and any decisions that you have already made about your project. If there are things you are unsure of, don't worry, a freelancer will be able to help you fill in the blanks.</p>
                                <br/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="">
                                <textarea name="description" onChange={this.handleInputChange} rows="7" cols="105" className="text-box" placeholder="Describe your project"></textarea>
                                <br/>
                            </div>
                        </div>

                        <br/>

                        <div className="row" >
                            <div className="">
                                <div className="upload-btn-box">
                                    <input type="file" name="file" onChange={this.handleInputChange} className="btn upload-btn"/>

                                    <span className="file-upload-text">Upload any document that you would like to see for the freelancers.</span>
                                </div>
                                <br/>
                            </div>
                        </div>

                        <br/>
                        <br/>

                        <div className="row">
                            <div className="">
                                <div className="body-header">What skills are required?</div>
                                <br/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="">
                                <p className="body-text">Enter up to 5 skills that best describe your project. Freelancers will use these skills to find projects they are most interested and experienced in.</p>

                                <br/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="">
                                <input type="text" name="skills"  onChange={this.handleInputChange} className="text-box"  placeholder="What skills are required?"/>
                                <br/>
                            </div>
                        </div>

                        <br/>
                        <br/>

                        <div className="row">
                            <div className="">
                                <div className="body-header">What is your estimated budget?</div>
                                <br/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="">
                                <div className="body-header">Budget Range</div>
                                <br/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="">
                                <input type="text" name="budget_range" onChange={this.handleInputChange} className="text-box"  placeholder="Budget Range"/>
                                <br/>
                            </div>
                        </div>

                        <br/>



                        <br/>
                        <br/>


                        {this.showError()}
                        <div className="row" >
                            <div className="">
                                <button type="submit" className="btn post-project-btn">Post My Project</button>
                                <br/>
                            </div>
                        </div>

                        <br/>
                        <br/>

                    </form>
                    <br/>
                    <br/>

                </div>

                    </div>

                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        error:state.addProject.error
    }
}
export default connect(mapStateToProps,{addProject})(AddProject);
