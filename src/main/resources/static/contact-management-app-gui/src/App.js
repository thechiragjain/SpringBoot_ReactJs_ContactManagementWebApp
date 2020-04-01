import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import UserRegisration from './components/UserRegisration';
import UserDashBoard from './components/UserDashBoard';
import AdminDashBoard from './components/AdminDashBoard';
import ListUser from './components/ListUser';
import ListContact from './components/ListContact';
import AddContact from './components/AddContact';
import PageNotFound from './components/PageNotFound';



function App() {
  return (
    <Router>
      <Header />
        <div className="container-fluid">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/userRegisration" component={UserRegisration} />
          <Route path="/login" component={Login} />
          <Route path="/logout" compoent={Logout} />
          <Route path="/userDashBoard" component={UserDashBoard} />
          <Route path="/adminDashBoard" component={AdminDashBoard} />
          <Route path="/listUser" component={ListUser} />
          <Route path="/listContact" component={ListContact} />
          <Route path="/addContact" component={AddContact} />
          <Route  component={PageNotFound} />
        </Switch>
        </div>
      <Footer />
    </Router>
    
  );
}

export default App;
