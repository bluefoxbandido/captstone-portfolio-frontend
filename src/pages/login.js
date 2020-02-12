import React, { Component } from 'react'
import { Grid, Form, Header, Message } from 'semantic-ui-react'
import { Helmet } from 'react-helmet'
import store from 'store';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            error: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const { username, password } = this.state;

        this.setState({ error: false })

        if(!(username === 'bluefoxbandido' && password === 'azurecanine')) {
            return this.setState({ error: true })
        }

        console.log("Logged In");
        store.set('loggedIn', true);

    }

    handleChange(e, {name, value}) {
        this.setState({ [name]: value });
    }

    
    render() {
        const { error } = this.state;

        return (
            <Grid>
                <Helmet>
                    <title>Dashboard | Login</title>
                </Helmet>
                <Grid.Column width={6} />
                <Grid.Column width={4}>
                    <Form className='login' error={error} onSubmit={this.onSubmit}>
                        <Header as="h1">Login</Header>
                        {error && <Message
                            error={error}
                            content="Username/Password Incorrect"
                        />}
                        <Form.Input
                            inline
                            label="Username"
                            name="username"
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            inline
                            label="Password"
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                        />
                        <Form.Button type="submit">Login</Form.Button>
                    </Form>
                </Grid.Column>

            </Grid>
        )
    }
}