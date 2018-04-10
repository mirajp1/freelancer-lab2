import React, {Component} from 'react';
import '../css/ProjectItem.css';

class SubmitSolution extends Component {

    constructor(){
        super();
        this.state = {
            solution_file:"",
            text:"",
        }
        this.submitSolution = this.submitSolution.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e){
        e.preventDefault();

        if(e.target.name==="solution_file") {
            this.setState({[e.target.name]: e.target.files[0]});
        }
        else
            this.setState({[e.target.name]:e.target.value})
    }


    submitSolution(e){
        e.preventDefault();
        console.log(this.state);


        this.props.submitSolution(this.state);
    }



    render() {

        return (

            <div className="row">

                <div className="col-md-12 project-data">


                        <div className="row">
                            <div className="col-md-offset-3 col-md-6">
                                <div className="body-header">Submit your Solution to the Employer</div>
                                <br/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-offset-3 col-md-6">
                                <textarea type="text" name="text" rows="4" onChange={this.handleInputChange} value={this.state.text} className="text-box" placeholder="Your solution..."/>
                                <br/>
                            </div>
                        </div>
                        <br/>

                        <div className="row">
                            <div className="col-md-offset-3 col-md-6">
                                <div className="body-header">Solution File:</div>
                                <br/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-offset-3 col-md-6">
                                <input type="file" name="solution_file" onChange={this.handleInputChange} className="btn upload-btn"/>
                                <br/>
                            </div>
                        </div>

                        <div className="row" >
                            <div className="col-md-offset-3 col-md-6">
                                <button type="button" onClick={this.submitSolution} className="btn post-project-btn">Submit</button>
                                <br/>
                            </div>
                        </div>


                    <br/>

                </div>
            </div>



        );
    }

}


export default SubmitSolution;

