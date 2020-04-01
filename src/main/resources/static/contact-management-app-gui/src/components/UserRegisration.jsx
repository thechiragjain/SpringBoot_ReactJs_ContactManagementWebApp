import React, { Component } from 'react';
import UserMgmtService from '../api/UserMgmtService.js';
import './components.css';

class UserRegisration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            email: "",
            address: "",
            loginName: "",
            password: "",
            role: "2",
            loginStatus: "1",
            message:""
        }

        this.updateStateValue = this.updateStateValue.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    updateStateValue(event) {
        /* 
        this.setState({name : event.target.userName})
        this.setState({phone : event.target.phone})
        this.setState({email : event.target.email})
        this.setState({address : event.target.address})
        this.setState({loginName : event.target.loginName})
        this.setState({password : event.target.password})   */
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSave(event) {
        event.preventDefault();
        const newUser = {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address,
            loginName: this.state.loginName,
            password: this.state.password,
            role: this.state.role,
            loginStatus: this.state.loginStatus
        }
        console.log("=== On save() =====> "+newUser.name+" "+newUser.loginName);
        UserMgmtService.postUser(newUser)
            .then(response => {
                    console.log(response)
                    this.setState({
                        message : `User ${newUser.loginName} has been successfully Registered!`,
                        name: "",
                        phone: "",
                        email: "",
                        address: "",
                        loginName: "",
                        password: "",
                        role: "",
                        loginStatus: "",
                })
                    //this.props.history.push(`/login`);
                }
            )
            .catch(error => {
                this.setState({message : error.response.data.message, loginName:""})
            })
    }
    render() {
        return (

            <div className="page-body">
                <p className="page-title">Registration</p>
                {this.state.message && <p className="text-center bg-warning text-danger p-3">{this.state.message}</p>}
                <div className="row justify-content-center">
                    <div className="col-lg-4 form-inner-container">
                        <p className="form-title-bar text-white">Sign UP!</p>
                        <form onSubmit={this.onSave}>
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <input type="text"
                                        className="form-control"
                                        placeholder="User Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.updateStateValue} />
                                    <div className="validation-feedback"></div>

                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Enter Phone No."
                                        name="phone"
                                        value={this.state.phone}
                                        onChange={this.updateStateValue} />
                                    <div className="validation-feedback"></div>
                                </div>

                            </div>

                            <div className="from-group row">
                                <div className="col-lg-12">
                                    <input type="email"
                                        className="form-control"
                                        placeholder="Enter Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.updateStateValue} />
                                    <div className="validation-feedback"></div>
                                </div>


                            </div>

                            <div className="from-group row">
                                <div className="col-lg-12">
                                    <textarea
                                        className="form-control mt-3"
                                        placeholder="Enter your full Address"
                                        name="address"
                                        value={this.state.address}
                                        onChange={this.updateStateValue} />

                                    <div className="validation-feedback"></div>
                                </div>


                            </div>
                            <div className="form-row row">
                                <div className="col-lg-12">
                                    <input type="text"
                                        id="id_loginName"
                                        className="form-control"
                                        placeholder="Enter your Login Name"
                                        name="loginName"
                                        value={this.state.loginName}
                                        onChange={this.updateStateValue} />

                                    <div className="validation-feedback" id="id_valid_msg"></div>
                                </div>

                            </div>




                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <input type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.updateStateValue} />

                                    <div className="validation-feedback"></div>
                                </div>
                            </div>
                            
                            <div className="form-group col-md-2">
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>




        );
    }
}
export default UserRegisration;