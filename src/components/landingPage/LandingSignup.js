import React, {Component} from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import {ToastContainer, ToastStore} from 'react-toasts';
import Config from '../../js/config';
import history from '../../js/history';
import { createApolloFetch } from 'apollo-fetch';

import '../../css/landingPage/LandingSignup.css';

let uri = Config.api;
let apolloFetch = createApolloFetch({uri});

class LandingSignup extends Component {

  constructor(props){
    super(props);
    this.state = {
      isChecked: false,
      alertMessage: '',
      alertType: '',
      alertOpen: false,
      submitDisable: false,
      submitValue: 'Sign up'
    }
  }


  formOnChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });
  }

  onEnter = async e => {
    if(e.key == 'Enter'){
      await this.validateSignup();
    }
  }

  validateSignup = () => {
    const {
      email,
      firstName,
      lastName,
      password,
      confirmPassword
    } = this.state;

    if(!email || !firstName || !lastName || !password || !confirmPassword){
      this.setState({
        alertOpen: true,
        alertMessage: 'All fields are required!',
        alertType: 'danger'
      });
    }else if(password !== confirmPassword){
      this.setState({
        alertOpen: true,
        alertMessage: 'Invalid password and confirm password!',
        alertType: 'danger'
      });
    }else if(!this.refs.checkMe.checked){
      this.setState({
        alertOpen: true,
        alertMessage: 'You must agree to the Terms and Policy',
        alertType: 'warning'
      });
    }else {
      this.submitSignup();
      this.setState({
        submitDisable: true,
        submitValue: 'Signing up...'
      });
    }
  }

  submitSignup = async () => {
    const {
      email,
      firstName,
      lastName,
      password
    } = this.state;

    let query = 'query($input:create_user_inpt!){ create_user(input:$input) {  success,message,{ path,message } } }';
    let variables = {
      input: {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password
      }
    };
    await apolloFetch({ query, variables }).then((response) => {
      console.log(response); //remove after
      let success = response.success;
      if(!success){
        if(response.message){
          this.setState({
            alertOpen: true,
            alertMessage: response.message[0].message,
            alertType: 'danger',
            submitDisable: false,
            submitValue: 'Sign up'
          });
          this.clearInputPassword();
        }
      }else {
        this.setState({
          alertOpen: true,
          alertMessage: 'Sign up successful! You can now login...',
          alertType: 'success',
          submitDisable: false,
          submitValue: 'Sign up'
        });
        this.props.openModal(true);
        ToastStore.success(<p className="landingSignupToastText">Sign up successful! You can now login...</p>);
        this.clearInputPassword();
        this.clearInputText();
      }
    })
  }

  clearInputPassword = async () => {
    await this.setState({
      password: '',
      confirmPassword: ''
    });
    this.refs.passwordRef.value = '';
    this.refs.confirmPasswordRef.value = '';
  }

  clearInputText = async () => {
    await this.setState({
      firstName: '',
      lastName: '',
      email: ''
    });
    this.refs.firstNameRef.value = '';
    this.refs.lastNameRef.value = '';
    this.refs.emailRef.value = '';
  }

  closeAlert = () => {
    this.setState({ alertOpen: false });
  }



  render(){
    return (
      <div className="landingSignup" id="landingSignup">
        <ToastContainer store={ToastStore}/>
        <Container>
          <div className="landingSignupContent">
            <Row>
              <Col md="6" className="left">
                {/* in progress */}
              </Col>
              <Col md="6" className="right">
                <div className="titleBar">
                  <div className="blockLine"></div>
                  <span className="indexNumber">03.</span>
                  <span className="indexName">Sign up</span>
                </div>
                <div className="body">
                  <h2>Create an account to start.</h2>
                  <div className="form">
                    <Alert color={this.state.alertType.toLowerCase()}
                           isOpen={this.state.alertOpen}
                           toggle={this.closeAlert}
                           className="signupAlert"
                    >{this.state.alertMessage}
                    </Alert>
                    <input type="text"
                           placeholder="First Name"
                           name="firstName"
                           ref="firstNameRef"
                           onChange={this.formOnChange}
                    />
                    <input type="text"
                           placeholder="Last Name"
                           name="lastName"
                           ref="lastNameRef"
                           onChange={this.formOnChange}
                    />
                    <input type="email"
                           placeholder="Email"
                           name="email"
                           ref="emailRef"
                           onChange={this.formOnChange}
                    />
                    <input type="password"
                           placeholder="Password"
                           name="password"
                           ref="passwordRef"
                           onChange={this.formOnChange}
                    />
                    <input type="password"
                           placeholder="Confirm Password"
                           name="confirmPassword"
                           ref="confirmPasswordRef"
                           onChange={this.formOnChange}
                           onKeyPress={this.onEnter}
                    />
                    <span className="checkSpan">
                      <input type="checkbox"
                             onKeyPress={this.onEnter}
                             defaultChecked={this.state.isChecked}
                             ref="checkMe"
                      />I agree to Terms and Policy.
                    </span>
                    <button disabled={this.state.submitDisable}
                            onClick={this.validateSignup}
                            className="signupSubmit"
                    >{this.state.submitValue}
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}
export default LandingSignup;
