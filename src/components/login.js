import React, { Component } from "react";

import AuthHelperMethods from './auth.helper.methods';



class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: "false"
        }
    }
    
    Auth = new AuthHelperMethods();

    state = {
        email: "",
        password: ""
    }

    _handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        this.Auth.login(this.state.email, this.state.password)
            .then(res => {
                if (res === false) {
                    return alert("Sorry those credentials don't exist!");
                }
                this.props.history.go('/dashboard');
            })
            .catch(err => {
                alert(err);
            })

        this.setState({
            loggedIn: "true"
        })
    }

    componentDidMount() {
        if (this.Auth.loggedIn())
            this.props.history.replace('/dashboard');
    }

    render() {
        return (
            <React.Fragment>
                <div className="main-wrapper">
                    <div className="box">
                        <div className="box-header">
                            <h1>Login</h1>
                        </div>
                        <form className="box-form">
                            <input
                                className="form-item"
                                placeholder="email"
                                name="email"
                                type="text"
                                onChange={this._handleChange}
                            />
                            <input
                                className="form-item"
                                placeholder="Password"
                                name="password"
                                type="password"
                                onChange={this._handleChange}
                            />
                            <button className="form-submit" onClick={this.handleFormSubmit}>Login</button>
                        </form>
                        
                    </div>
                    {/* <div className="signiture">
                        <h1>Template Built & Designed by Roman Chvalbo</h1>
                    </div> */}
                </div>
                
            </React.Fragment>
        );
    }

}

export default Login;