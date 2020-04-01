import React,{Component} from 'react';
import ContactMgmtService from '../api/ContactMgmtService.js';
import UserAuthenticationService from '../api/UserAuthenticationService';
import './components.css';

class AddContact extends Component{

    constructor(props){
        super(props);

        this.state ={
            name : "",
            phone : "",
            email : "",
            address : "",
            remark : "",
            message : ""
        }
        this.changeState = this.changeState.bind(this);
        this.saveContact = this.saveContact.bind(this);
    }

    changeState(event){
        console.log(event.target.value)
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    saveContact(event){
        event.preventDefault();

        const newContact = {
            name : this.state.name,
            phone : this.state.phone,
            email : this.state.email,
            address : this.state.address,
            remark : this.state.remark
        }
        console.log("Remarks : "+this.state.remark)

        ContactMgmtService.saveContact(UserAuthenticationService.getUserId(),newContact)
        .then(response => {
                console.log("Contact Data : "+response.data)
                this.setState({
                    name : "",
                    phone : "",
                    email : "",
                    address : "",
                    remark : "",
                    message : "Contact Has been successfully Saved"
                })
            })
        .catch(error => {
            this.setState({
                message : error.response.data.message
            })
        })
    }

    render(){
        return(
            <div className="page-body">
                <p className="page-title">Add Contact</p>
                <p className="text-center bg-warning text-danger">{this.state.message}</p>
                <div className="row justify-content-center">
                    <div className="col-lg-4 form-inner-container">
                        <p className="form-title-bar text-white">New Contact</p>
                        <form onSubmit={this.saveContact}>
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <input type="text" 
                                        name="name" 
                                        value={this.state.name} 
                                        placeholder="Contact Name"
                                        className="form-control"
                                        onChange={this.changeState}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <input type="text" 
                                        name="phone" 
                                        value={this.state.phone} 
                                        placeholder="Mobile No"
                                        className="form-control"
                                        onChange={this.changeState}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <input type="email" 
                                        name="email"    
                                        value={this.state.email} 
                                        placeholder="Email Id"
                                        className="form-control"
                                        onChange={this.changeState}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <textarea name="address" 
                                        value={this.state.address} 
                                        placeholder="Address"
                                        className="form-control"
                                        onChange={this.changeState}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <textarea name="remark" 
                                        value={this.state.remark} 
                                        placeholder="Remarks"
                                        className="form-control"
                                        onChange={this.changeState}
                                    />
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
export default AddContact;