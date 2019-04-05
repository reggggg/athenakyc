import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Config from '../../js/config';
import history from '../../js/history';
import { createApolloFetch } from 'apollo-fetch';

import '../../css/authentication/Signup.css';

let uri = Config.api;
let apolloFetch = createApolloFetch({uri});

class Signup extends Component {

  constructor(props){
    super(props);
    this.state = {
      submitDisable: false,
      submitValue: 'Sign up'
    }
  }


  signupOnChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });
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
      alert('All fields are required!');
    }else if (password !== confirmPassword){
      alert('Invalid Password and Confirm Password!')
      this.clearInputPassword();
    }else {
      this.submitSignup();
      this.setState({
        submitDisable: true,
        submitValue: 'Signing up...'
      });
    }
  }

  submitSignup = async e => {
    const {
      email,
      firstName,
      lastName,
      password,
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
      console.log(response); //log (remove after)
      let success = response.success;
      if(!success){
        if(response.message){
          console.log(response.message[0].message); //log (Change to Designed Alert Message)
        }
        this.setState({
          submitDisable: false,
          submitValue: 'Sign up'
        });
        this.clearInputPassword();
      }else {
        console.log('Sign up success! You can now login'); //log (Change to Designed Alert Message)
        setTimeout(() => {
          history.push('/signin');
        }, 1000)
      }
    })
  }

  onEnter = async e => {
    if(e.key === 'Enter'){
      await this.validateSignup();
    }
  }

  clearInputPassword = async () => {
    await this.setState({
      password: '',
      confirmPassword: ''
    });
    this.refs.password.value = '';
    this.refs.confirmPassword.value = '';
  }

  render(){
    return (
      <div className="signup">
        <Container>
          <Row className="signupContent">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <div className="signupFrame">
                <h5>Sign up</h5>
                <input type="email"
                       placeholder="Email"
                       name="email"
                       onKeyPress={this.onEnter}
                       onChange={this.signupOnChange}
                       autoFocus
                />
                <input type="text"
                       placeholder="First Name"
                       name="firstName"
                       onKeyPress={this.onEnter}
                       onChange={this.signupOnChange}
                />
                <input type="text"
                       placeholder="Last Name"
                       name="lastName"
                       onKeyPress={this.onEnter}
                       onChange={this.signupOnChange}
                />
                <input type="password"
                       placeholder="Password"
                       name="password"
                       ref="password"
                       onKeyPress={this.onEnter}
                       onChange={this.signupOnChange}
                />
                <input type="password"
                       placeholder="Confirm Password"
                       name="confirmPassword"
                       ref="confirmPassword"
                       onKeyPress={this.onEnter}
                       onChange={this.signupOnChange}
                />
                <button onClick={this.validateSignup}
                        disabled={this.state.submitDisable}>
                  {this.state.submitValue}
                </button>
                <Row className="links">
                  <Col md="6" className="left">
                    <Link to="/">Go back to home</Link>
                  </Col>
                  <Col md="6" className="right">
                     <span>Already a member? <Link to="/signin">Sign in here</Link></span>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Signup;
