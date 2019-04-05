import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import Config from '../../js/config';
import history from '../../js/history';
import { createApolloFetch } from 'apollo-fetch';
import axios from 'axios';

import '../../css/accountCenter/profile.css';

let uri = Config.api;
let apolloFetch = createApolloFetch({uri});

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      country: '',
      phoneNumber: '',
      selectedFile: null,
      uploadBtnValue: 'Upload'
    }
  }

  componentWillMount(){
    if(!localStorage['Session']){
      history.push('/')
    }
  }

  async componentDidMount(){
    await this.getProfileData();
  }

  authorizeToken = () => {
    apolloFetch.use(({ request, options }, next) => {
      if(!options.headers){
        options.headers = {};
      }
      let token = JSON.parse(localStorage['Session'])
      options.headers['authorization'] = token.token;
      next();
    });
  }

  profileOnChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });
  }

  getProfileData = () => {
    let query = 'query{ profile{ success,message,{ path,message }, data { firstname lastname email dateOfBirth country phoneNumber } } }';
    this.authorizeToken();
    apolloFetch({ query }).then((response) => {
      console.log(response); //log (remove after)
      let success = response.success;
      if(!success){
        console.log('Error: Server Problem!');
      }else {
        this.setState({
          firstName: response.data.firstname,
          lastName: response.data.lastname,
          email: response.data.email,
          birthDate: response.data.dateOfBirth,
          country: response.data.country,
          phoneNumber: response.data.phoneNumber
        });
      }
    })
  }

  fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function(){
      let output = document.getElementById('output');
      output.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    await this.setState({
      selectedFile: file
    });
  }

  uploadHandler = async () => {
    let token = JSON.parse(localStorage['Session']);
    console.log(token.token);
    const formData = new FormData();
    this.setState({
      uploadBtnValue: 'Uploading...',
      selectedFile: null
    });
    formData.append('profilePicture', this.state.selectedFile, this.state.selectedFile.name)
    await axios.post('http://172.16.39.21:3635/uploadProfile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      authorization: token.token,
    })
    .then((res) => {
      console.log(res, "res");
      this.setState({
        uploadBtnValue: 'Upload'
      });
    })
    .catch(err => {
      console.log(err, "err");
    });


    await console.log(this.state.selectedFile);
  }

  render(){
    return (
      <div className="profile">
        <Container>
          <div className="profileContent">
            <a onClick={() => history.push('/')}>Go home</a>
            <h5>Profile</h5>
            <Row>
              <Col md="5">
                <label>First name</label>
                <input type="text"
                       placeholder={this.state.firstName}
                       name="firstName"
                       onChange={this.profileOnChange}
                />
                <label>Last name</label>
                <input type="text"
                       placeholder={this.state.lastName}
                       name="lastName"
                       onChange={this.profileOnChange}
                />
                <label>Email</label>
                <input type="email"
                       placeholder={this.state.email}
                       name="email"
                       onChange={this.profileOnChange}
                />
                <label>Birth Date</label>
                <input type="text"
                       placeholder={this.state.birthDate}
                       name="birthDate"
                       onChange={this.profileOnChange}
                />
                <label>Country</label>
                <input type="text"
                       placeholder={this.state.country}
                       name="country"
                       onChange={this.profileOnChange}
                />
                <label>Phone Number</label>
                <input type="text"
                       placeholder={this.state.phoneNumber}
                       name="phoneNumber"
                       onChange={this.profileOnChange}
                />
                <input type="file"
                       onChange={this.fileChangeHandler}
                />
                <img className="imageOutput" id="output" /><br/>
                <button onClick={this.uploadHandler}
                        className="uploadBtn"
                        disabled={this.state.selectedFile === null ? true : false}
                >{this.state.uploadBtnValue}
                </button><br/>
              </Col>
              <Col md="5"></Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}
export default Profile;
