import {Grid, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import history from "../history";
import Container from "@material-ui/core/Container";
import React from "react";
import axiosInstance from "../axios";
import './Signup.css'

class Signup extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: "",
            password: "",
            prefered_ads: []
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
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            prefered_ads: this.state.prefered_ads
        }

        axiosInstance.post("/add-user", credentials)
            .then(
                res => {
                    history.push("/login")
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
            <>
                <Container maxWidth="sm">
                    <div>
                        <Grid>
                            <h1 id={'new-account'}>CONT NOU</h1>
                            <form onSubmit={this.onSubmitFun}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    fullWidth
                                    id="first_name"
                                    label="Prenume"
                                    name="first_name"
                                    autoComplete="string"
                                    onChange={this.handleInput}
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    fullWidth
                                    id="last_name"
                                    label="Nume"
                                    name="last_name"
                                    autoComplete="string"
                                    onChange={this.handleInput}
                                    autoFocus
                                />
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
                                    label="Parola"
                                    type="password"
                                    id="password"
                                    onChange={this.handleInput}
                                    autoComplete="current-password"
                                />
                                <Button
                                    id={'signup'}
                                    type={'submit'}
                                    fullWidth
                                    variant="contained"
                                >
                                    Sign Up
                                </Button>

                            </form>

                        </Grid>
                    </div>
                </Container>
            </>
        )
    }


}

export default Signup;