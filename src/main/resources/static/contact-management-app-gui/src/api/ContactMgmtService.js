import axios from 'axios';

class ContactMgmtService{

    saveContact(userId,newContact){
        return axios.post(`http://localhost:8080/contact/api/user/${userId}/contact`,newContact)
    }

    getUserContacts(userId){
        return axios.get(`http://localhost:8080/contact/api/user/${userId}/contacts`)
    }

    deleteUserContact(userId,contactId){
        return axios.delete(`http://localhost:8080/contact/api/user/${userId}/contact/${contactId}`)
    }
}

export default new ContactMgmtService();