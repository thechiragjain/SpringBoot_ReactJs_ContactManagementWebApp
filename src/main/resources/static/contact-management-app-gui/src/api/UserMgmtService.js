import axios from 'axios';

class UserMgmtService{
    postUser(newUser){
        return axios.post('http://localhost:8080/contact/api/user/',newUser)
    }


    userLogin(loginName){

        return axios.get(`http://localhost:8080/contact/api/user/${loginName}`)
       
    }

    getAllUser(){
        return axios.get('http://localhost:8080/contact/api/users')
    }

    deleteUser(userId){
        return axios.delete(`http://localhost:8080/contact/api/user/${userId}`)
    }
}
export default new UserMgmtService();