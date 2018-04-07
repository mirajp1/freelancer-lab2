import React, {Component} from 'react';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {withRouter} from "react-router-dom";
import '../css/SkillsList.css';

class SkillsList extends Component {
    render() {

        return (
            <div className="skills">

                <div className="row">

                    <div className="col-md-12"><h3 className="skills-title">My Top Skills</h3></div>

                </div>
                <hr/>

                <div className="row">

                    <div className="col-md-12">

                        <ul className="list">

                            {this.props.skills && this.props.skills.map(function(skill,index){
                                return <li key={index}className="item">{skill.name}</li>;
                            })}

                        </ul>

                    </div>

                </div>

            </div>
        );
    }
}

export default withRouter(SkillsList);
