import React,{ Component } from 'react';
import './components.css';

import UserMgmtService from '../api/UserMgmtService.js';
import {Link} from 'react-router-dom';


class ListUser extends Component {

    constructor(props){
        super(props);

        this.state = {
            userList : [
    // {id : 1, name: "Vinay Tiwari",phone: "789456123",email: "vtiwari@gmail.com",address: "Benglore",loginName: "vinay"},
    // {id : 2, name: "Abhishek Tiwari",phone: "7869231021",email: "abhi@gmail.com",address: "Satna",loginName: "abhi"},
    // {id : 3, name: "Abhishek Tiwari",phone: "7869231021",email: "abhi@gmail.com",address: "Satna",loginName: "abhi"},
    // {id : 4, name: "Abhishek Tiwari",phone: "7869231021",email: "abhi@gmail.com",address: "Satna",loginName: "abhi"},
    // {id : 5, name: "Abhishek Tiwari",phone: "7869231021",email: "abhi@gmail.com",address: "Satna",loginName: "abhi"},
    // {id : 6, name: "Abhishek Tiwari",phone: "7869231021",email: "abhi@gmail.com",address: "Satna",loginName: "abhi"},
    // {id : 7, name: "Abhishek Tiwari",phone: "7869231021",email: "abhi@gmail.com",address: "Satna",loginName: "abhi"},
    // {id : 8, name: "Abhishek Tiwari",phone: "7869231021",email: "abhi@gmail.com",address: "Satna",loginName: "abhi"},
    // {id : 9, name: "Abhishek Tiwari",phone: "7869231021",email: "abhi@gmail.com",address: "Satna",loginName: "abhi"},
    // {id : 10, name: "Abhishek Tiwari",phone: "7869231021",email: "abhi@gmail.com",address: "Satna",loginName: "abhi"},
    // {id : 11, name: "Abhishek Tiwari",phone: "7869231021",email: "abhi@gmail.com",address: "Satna",loginName: "abhi"},
    // {id : 12, name: "Abhishek Tiwari",phone: "7869231021",email: "abhi@gmail.com",address: "Satna",loginName: "abhi"}
            ],
            message : "", loginStatus : ""
         }

         this.refreshUserList = this.refreshUserList.bind(this);
    }

    componentDidMount(){
        this.refreshUserList();
    }

    refreshUserList(){
        UserMgmtService.getAllUser()
        .then(response => {
                this.setState({userList : response.data})
            }
        )
        .catch(error => {
                this.setState({message : error.response.data.message})
            }
        )
    }


    deleteUser(userId,name){
        UserMgmtService.deleteUser(userId)
        .then(response =>{
            console.log("then : "+response.data)
            this.setState({message : `User ${name} Has deleted Successfully!`},this.refreshUserList()) 
            }                              
        )
        .catch(error => {
                console.log("error : "+error.response.data)
                this.setState({message:error.response.data.message})
            }
        )
        
    }
    render() {
        return (
            <div className="page-body">
                <p className="page-title">User List</p>
                <div className="row justify-content-center">
                    {this.state.message && <p className="text-center bg-warning text-white p-3">{this.state.message}</p>}
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Name</td>
                                <td>Phone</td>
                                <td>Email</td>
                                <td>Address</td>
                                <td>LoginName</td>
                                <td>Status</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>{
                            
                            this.state.userList.map(user => 
                                
                                // if(response.data.loginStatus === '1'){
                                //     this.setState({loginStatus : "Active"})
                                // }    
                                // else{
                                //     this.setState({loginStatus : "Deactive"})
                                // }

                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.loginName}</td>
                                    <td>{(user.loginStatus === 1) && <span>Active</span>} {(user.loginStatus === 2) && <span>Deactive</span>}</td>
                                    <td>
                                        <Link to="#">Edit</Link>/
                                        <Link to="/listUser" onClick={()=> this.deleteUser(user.id,user.name)}>Delete</Link>
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
export default ListUser;