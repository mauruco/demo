import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doLogin } from './actions';
import './style.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import { AccountBox } from '@material-ui/icons';

import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import Config from '../../Config';

class Login extends Component {

    constructor(props) {

        super(props);

        this.state = {

            applicationInProgress: false,
            message: '',
            redirect: false,
            email: 'admin@gmail.com',
            password: '123qwe.',
            emailError: false,
            passwordError: false
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({...nextProps.loginReducer}, ()=>{

            if(!nextProps.loginReducer.redirect)
                return;

            window.location.href = nextProps.loginReducer.redirect;
        });
    }

    inputChangeHandler(key, e) {

        let obj = {};
        obj[key] = e.target.value;
        this.setState(obj);
    }
    
    alertHandler(e) {

        this.setState({message: ''});
    }

    formSendHandler(e) {

        let email = this.checkEmail(this.state.email),
        emailError = false,
        passwordError = false;
        
        if(!email)
            emailError = true;

        if(!this.state.password || this.state.password.length < 6)
            passwordError = true;
            
        this.setState({emailError, passwordError});
        
        if(emailError || passwordError) {

            this.setState({message: <span>Por favor, preencha todos os campos com dados válidos.</span>})
            return;
        }

        this.tryLogin(this.state.email, this.state.password);
    }

    tryLogin(email, password) {
        
        this.setState({applicationInProgress: true}, ()=>{
            
            setTimeout(()=>{

                this.props.doLogin({email, password});
            }, Config.timeout);
        });
    }

    checkEmail(email) {

        if(!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(String(email).trim().toLowerCase()))
            return false;

        return String(email).trim().toLowerCase();
    }

    render() {
        
        return(
        <div className="login">
            <Grid container spacing={0}>
                <Grid item xs={4}/>
                <Grid item xs={4}>
                    <Paper className="paper">
                        <Grid container spacing={8}>
                            <AccountBox className="icon-login"/>
                            <Grid item xs={12}>
                                <TextField ref="email" value={this.state.email} error={this.state.emailError} onChange={(e)=>{this.inputChangeHandler('email', e)}} className="width100" label="E-Mail" placeholder="E-Mail" multiline margin="normal"/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <TextField ref="password" value={this.state.password} error={this.state.passwordError} onChange={(e)=>{this.inputChangeHandler('password', e)}} className="width100" label="Senha" type="password" autoComplete="current-password" margin="normal"/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8}>
                            <Grid item xs={12} className="align-right">
                                <Button variant="outlined" onClick={(e)=>{this.formSendHandler(e)}}>
                                    Send <Icon>send</Icon>
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4} />
            </Grid>
            <Alert message={this.state.message} onClick={(e)=>{this.alertHandler(e)}}/>
            <Loader show={this.state.applicationInProgress}/>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    
    return {
        loginReducer: state.loginReducer
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        doLogin: (data) => {
            dispatch(doLogin(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);