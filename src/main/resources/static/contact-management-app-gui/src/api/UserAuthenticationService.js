
class UserAuthenticationService{
    
    loginSuccessful(response){
        console.log("User Auth response: "+response);
        console.log("User Auth name: "+response.data.name);
        console.log("User Auth id : "+response.data.id);

        sessionStorage.setItem("authenticatedUserName",response.data.name);
        sessionStorage.setItem("authenticatedUserId",response.data.id);
        sessionStorage.setItem("authenticatedloginName",response.data.loginName);
        sessionStorage.setItem("authenticatedUserrole",response.data.role);
        sessionStorage.setItem("authenticatedUserloginStatus",response.data.loginStatus);
    }


    logout(){
        sessionStorage.removeItem('authenticatedUserName');
        sessionStorage.removeItem('authenticatedUserId');
        sessionStorage.removeItem('authenticatedloginName');
        sessionStorage.removeItem('authenticatedUserrole');
        sessionStorage.removeItem('authenticatedUserloginStatus');
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedloginName')
        if(user === null) return false
        return true
    }

    isUser(){
        let userRole = sessionStorage.getItem('authenticatedUserrole')
        console.log("User role===== "+userRole)
        if(userRole !== '2') return false
        return true
    }

    isAdmin(){
        let userRole = sessionStorage.getItem('authenticatedUserrole')
        if(userRole === '1') return true;
        return false;
    }

    getUserId(){
        console.log("Authenticaed User id : "+sessionStorage.getItem("authenticatedUserId"));
        return sessionStorage.getItem("authenticatedUserId");
    }
}

export default new UserAuthenticationService();