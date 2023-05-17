import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {Grid, TextField} from "@material-ui/core";
import axiosInstance from "../axios"
import history from "../history";
import './Login.css'

class LoginPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            role: ""
        }
    }

    handleInput = event => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
        console.log(value);
    };

    onSubmitFun = event => {
        event.preventDefault();
        let credentials = {
            email: this.state.email,
            password: this.state.password
        }

        axiosInstance.post("/login", credentials)
            .then(
                res => {
                    const val = res.data;
                    console.log(val);
                    localStorage.setItem("ROLE", val.role);
                    localStorage.setItem("USER_ID", val.user_id);
                    console.log("Success");

                    history.push("/home")
                    window.location.reload()
                }
            )
            .catch(error => {
                window.alert("Bad credentials");
                localStorage.removeItem("AUTH_ID")
                console.log(error)
            })
    }

    render() {
        return (
            <Container maxWidth="sm">
                <div>
                    <Grid>
                        <form onSubmit={this.onSubmitFun}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required={true}
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="string"
                                onChange={this.handleInput}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required={true}
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={this.handleInput}
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color='primary'
                            >
                                Sign In
                            </Button>

                        </form>
                        <Button
                            id={'signup'}
                            fullWidth
                            variant="contained"
                            onClick={() =>{
                                history.push("/signup");
                                window.location.reload();
                            }}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                </div>
            </Container>
        );
    }
}
export default LoginPage;