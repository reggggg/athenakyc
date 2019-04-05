import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'reactstrap';
import Config from '../../js/config';
import history from '../../js/history';
import { createApolloFetch } from 'apollo-fetch';

import '../../css/authentication/Signin.css';

let uri = Config.api;
let apolloFetch = createApolloFetch({uri});

class Signin extends Component {
  constructor(props){
    super(props);
    this.state = {
      alertOpen: false,
      alertMessage: '',
      alertType: 'danger',
      buttonDisable: false,
      buttonValue: 'Submit'
    }
  }

  onEnter = async e => {
    if(e.key == 'Enter'){
      await this.validateSignin();
    }
  }
  validateSignin = () => {
    const {
      email,
      password
    } = this.state;

    if(!email && !password){
      this.setState({
        alertOpen: true,
        alertMessage: 'Enter your email and password!',
        alertType: 'danger'
      })
    }else if(!email){
      this.setState({
        alertOpen: true,
        alertMessage: 'Enter your email!',
        alertType: 'danger'
      })
    }else if(!password){
      this.setState({
        alertOpen: true,
        alertMessage: 'Enter your password!',
        alertType: 'danger'
      })
    }else {
      this.submitSignin();
      this.setState({
        buttonDisable: true,
        buttonValue: 'Signing in...'
      });
    }
  }

  loginOnChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });
  }

  clearPassword = () => {
    this.setState({
      password: ''
    });
    this.refs.passwordRef.value = '';
  }

  closeAlert = () => {
    this.setState({ alertOpen: false });
  }

  goToRegister = () => {
    this.props.closeModal(false);
    setTimeout(() => {
      document.getElementById('landingSignup').scrollIntoView({
        behavior: 'smooth'
      });
    }, 600);
  }

  submitSignin = async () => {
    const {
      email,
      password
    } = this.state;

    let query = 'query($input:SignIn_inpt!){ SignIn(input:$input) { success,message,{ path,message } data{ token,email } } }';
    let variables = {
      input: {
        email: email,
        password: password
      }
    };
    await apolloFetch({ query, variables }).then((response) => {
      console.log(response);
      let success = response.success;
      if(!success){
        if(response.message){
          this.setState({
            buttonDisable: false,
            buttonValue: 'Submit',
            alertOpen: true,
            alertMessage: response.message[0].message,
            alertType: 'danger'
          });
          this.clearPassword();
        }
      }else {
        console.log('Sign in success!');
        localStorage.setItem('Session', JSON.stringify(response.data));
        window.location.reload();
      }
    })
  }

  render(){

    return (
      <div className="signin">
        <Row className="loginModalBody">
          <Col md="6" className="loginLeft">
            <img src={require('../../images/login/athenaMobile.png')} alt=""/>
            <div className="icons">
              <img src={require('../../images/login/icon-identi-01.svg')} alt=""/>
              <img src={require('../../images/login/icon-passport-01.svg')} alt=""/>
              <img src={require('../../images/login/icon-shieldCheck-01.svg')} alt=""/>
              <div className="body">
                <h6>Download it now!</h6>
                <p>Purus gravida quis blandit turpis cursus in hac habitasse.</p>
              </div>
              <div className="googlePlays">
                <img src={require('../../images/login/GooglePlay-Active-01.svg')} alt=""/>
                <img src={require('../../images/login/AppStore-Active-01.svg')} alt=""/>
              </div>
            </div>
          </Col>
          <Col md="6" className="loginRight">
            <center><img src={require('../../images/AthenaKYC-Logo.png')} alt=""/></center>
            <h2>Login</h2>
            <div className="forms">
              <Alert isOpen={this.state.alertOpen}
                     toggle={this.closeAlert}
                     className="loginAlert"
                     color={this.state.alertType.toLowerCase()}
              >{this.state.alertMessage}
              </Alert>
              <input type="email"
                     placeholder="Email Address"
                     name="email"
                     onKeyPress={this.onEnter}
                     onChange={this.loginOnChange}
                     autoFocus
              />
              <input type="password"
                     placeholder="Password"
                     name="password"
                     ref="passwordRef"
                     onKeyPress={this.onEnter}
                     onChange={this.loginOnChange}
              />
              <button onClick={this.validateSignin}
                      disabled={this.state.buttonDisable}
                      className="submit"
              >{this.state.buttonValue}
              </button>
              <div className="rememberForgot">
                <span>
                  <input type="checkbox" />
                  <label>Remember me</label>
                </span>
                <a href="#">Forgot Password</a>
              </div>
              <div className="bottomDiv">
                <label>Don't have an account? </label>
                <label>&ensp; Click <a onClick={this.goToRegister}>here</a> to Register</label>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Signin;
