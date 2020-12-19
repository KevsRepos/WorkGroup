import React, { Component } from 'react'
import './scss/style.scss'
import firebase from 'firebase'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom'
import SignIn from './views/auth/SignIn'
import SignUp from './views/auth/SignUp'
import ProfilePage from './views/auth/ProfilePage'
import PasswordReset from './views/auth/PasswordReset'
import LogOut from './views/auth/LogOut'
import MainApp from './views/App'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: false,
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ isLoggedIn: true })
            }
        })
    }

    render() {
        return (
            <Router>
                <Switch>
                    {this.state.isLoggedIn ? (
                        <Route exact path="/app">
                            <MainApp />
                        </Route>
                    ) : null}

                    <Route exact path="/logout">
                        <LogOut />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route exact path="/">
                        <SignIn />
                    </Route>
                </Switch>
            </Router>
        )
    }
}
export default App
