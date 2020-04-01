import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './components.css';
import UserMgmtService from '../api/UserMgmtService.js';
import UserAuthenticationService from '../api/UserAuthenticationService.js';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginName: "",
            password: "",
        }
        this.updateField = this.updateField.bind(this);
        this.login = this.login.bind(this);
    }

    updateField(event) {
        console.log(event.target.name);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    login(event) {
        event.preventDefault();
        console.log(this.state.loginName + " " + this.state.password);
        UserMgmtService.userLogin(this.state.loginName)
            .then(response => {
                if (response.data.password !== this.state.password) {
                    this.setState({ message: "Invalid Password! Try again", loginName: "", password: "" })
                } else {
                    UserAuthenticationService.loginSuccessful(response)
                    if(response.data.role === 1){
                        this.props.history.push("/adminDashBoard")
                    }
                    else{
                        this.props.history.push("/userDashBoard")
                    }
                }    
            })
            .catch(error => {
                console.log(error.response)
                let errorMessage = "";

                if(error.message){
                    errorMessage += error.message
                }
                if(error.response && error.response.data){
                    errorMessage += error.response.data.message
                }

                this.setState({ message: errorMessage, loginName: "", password: "" })
            });
    }

    render() {
        return (
            <div className="page-body">
                <p className="page-title">Login</p>
                {this.state.message && <p className="text-danger bg-warning p-3 text-center">{this.state.message}</p>}
                <div className="row justify-content-center form-container">
                    <div className="col-lg-4  form-inner-container">
                        <p className="form-title-bar text-white">Sign In!</p>
                        <form onSubmit={this.login}>
                            <div className="form-group row">
                                <label for="inputLoginName" className=" col-lg-4 col-form-label">User Name:</label>
                                <div className="col-lg-8 col-sm-10">
                                    <input type="text"
                                        name="loginName"
                                        className="form-control"
                                        placeholder="Login Name"
                                        onChange={this.updateField}
                                        value={this.state.loginName}
                                        id="inputLoginName" 
                                        required/>

                                </div>
                            </div>

                            <div className="form-group row">
                                <label for="inputPassword" className=" col-lg-4 col-form-label">Password :</label>
                                <div className="col-lg-8 col-sm-10">
                                    <input type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={this.updateField}
                                        value={this.state.password}
                                        id="inputPassword" 
                                        required/>

                                </div>

                            </div>

                            <div className="form-group">
                                <input type="submit" className="btn btn-primary" value="Sign In" />
                                <Link to="/forgotPassword" ><span className="link-text">Forgot Password ?</span> </Link>
                            </div>
                        </form>
                    </div>
                </div>



            </div>


        );
    }
}
export default Login;
