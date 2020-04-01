import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import ContactMgmtService from '../api/ContactMgmtService';
import UserAuthenticationService from '../api/UserAuthenticationService';
import './components.css';


class ContactList extends Component{

    constructor(props){
        super(props);

       

        this.state = {
            contacts : [
                // {id : 1, name : "Ramanuj",phone : "789456123",email : "ram@gmail.com",address : "Mumbai",remarks : "Friends"},
                // {id : 2, name : "Sheetaram",phone : "474475474",email : "sheeta@gmail.com",address : "Satna",remarks : "Sister"},
                // {id : 3, name : "Swarstra",phone : "44114744415",email : "Swarastra@gmail.com",address : "Maharastra",remarks : "Brother"}
            ],
            message : "",
            count : 0
        }

        this.refreshContactList = this.refreshContactList.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
    }

    componentDidMount(){
        this.refreshContactList();
    }

    refreshContactList(){
        ContactMgmtService.getUserContacts(UserAuthenticationService.getUserId())
        .then(response => {
            console.log("Contact List : "+response.data)
            this.setState({
                contacts : response.data
            })
        })
        .catch(error => {
            this.setState({
                message : error.response.data.message
            })
        })
    }

    deleteContact(contactId){
        ContactMgmtService.deleteUserContact(UserAuthenticationService.getUserId,contactId)
        .then(response => {
            this.setState({
                message : "Contact Has been deleted Successfully!"
            },this.refreshContactList())
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
                <p className="page-title">Contact List</p>
                <div className="row justify-content-center">
                    <p className="text-center bg-warning text-white">{this.state.message}</p>

                    <table className="table">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Mob NO</td>
                                <td>Email</td>
                                <td>Address</td>
                                <td>Remarks</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>{
                                this.state.contacts.map(contact =>

                                        <tr key={contact.id}>
                                            <td>{contact.name}</td>
                                            <td>{contact.phone}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.address}</td>
                                            <td>{contact.remark}</td>
                                            <td>
                                                <Link to="#">Edit</Link>/
                                                <Link to="listContact" onClick={() => this.deleteContact(contact.id)}>Delete</Link>
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
                


            </div>
        );
    }
}
export default ContactList;