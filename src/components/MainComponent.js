import React from 'react';
import { Route , Switch , Redirect } from 'react-router-dom';
import Header from './layouts/header/header';
import Login from './login/login';
import SignUp from "./signup/signup";
import Profile from "./profile/profile";



class Main extends React.Component {


    render(){
        return(
            <React.Fragment>
                <Header />
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={Login} />
                    <Route path="/profile" component={Profile} />
                    <Redirect to="/" />
                </Switch>
            </React.Fragment>
        )
    }
}

export default Main;