import React, { Component } from 'react';

class Logout extends Component{
    render(){
        return(
            <React.Fragment>
                <h2 className="text-warning">Logout Successfully!</h2>
                <p className="text-primary">Thank you for using Contact Management App! Please visit again</p>
            </React.Fragment>
        );
    }
}
export default Logout;