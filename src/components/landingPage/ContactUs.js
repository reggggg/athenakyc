import React, {Component} from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';

import '../../css/landingPage/ContactUs.css';

class ContactUs extends Component {

  constructor(props){
    super(props);
    this.state = {
      alertOpen: false,
      alertMessage: '',
      alertType: '',
      submitValue: 'Submit',
      submitDisable: false
    }
  }

  contactOnChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });
  }

  onEnter = async e => {
    if(e === "Enter"){
      await this.validateInputs();
    }
  }

  validateInputs = async () => {
    const {
      name,
      email,
      message
    } = this.state;

    if(!name && !email && !message){
      this.setState({
        alertOpen: true,
        alertMessage: 'All fields are required!',
        alertType: 'danger'
      });
    }else if(!name){
      this.setState({
        alertOpen: true,
        alertMessage: 'Name is optional. At least put anything',
        alertType: 'danger'
      });
    }else if(!email){
      this.setState({
        alertOpen: true,
        alertMessage: 'Email is required!',
        alertType: 'danger'
      });
    }else if(!message){
      this.setState({
        alertOpen: true,
        alertMessage: 'Please state your message.',
        alertType: 'danger'
      });
    }else {
      this.setState({
        submitValue: 'Sending...',
        submitDisable: true
      });
      this.submitMessage();
    }
  }

  submitMessage = () => {
    //API missing
    this.setState({
      alertOpen: true,
      alertMessage: 'Thank you for sending your message.',
      alertType: 'success',
      submitValue: 'Submit',
      submitDisable: false
    });
  }

  closeAlert = () => {
    this.setState({
      alertOpen: !this.state.alertOpen
    });
  }



  render(){

  const contactData = [
    {class: 'office', img: require('../../images/icon-Location.svg'), label: 'PBCOM Tower, Ayala Avenue, Makati City, Phils.'},
    {class: 'email', img: require('../../images/icon-Mail.svg'), label: 'support@athenacoins.com'},
    {class: 'telegram', img: require('../../images/icon-Tele.svg'), label: '@athenacoinsph'},
  ]

    return (
      <div className="contactUs" id="contactUs">
        <Container>
          <Row className="contactUsContent">
            <Col md="6" className="left" data-aos="fade-right">
              <Alert color={this.state.alertType.toLowerCase()}
                     isOpen={this.state.alertOpen}
                     toggle={this.closeAlert}
                     className="contactUsAlert"
              >{this.state.alertMessage}
              </Alert>
              <label>Your Name</label>
              <input type="text"
                     placeholder="Name Here"
                     name="name"
                     onChange={this.contactOnChange}
              />
              <label>Your Email</label>
              <input type="email"
                     placeholder="Email Here"
                     name="email"
                     onChange={this.contactOnChange}
              />
              <label>Your Message</label>
              <textarea name="message"
                        placeholder="Message Here"
                        cols="30"
                        rows="7"
                        onChange={this.contactOnChange}

              />
              <button onClick={this.validateInputs}
                      disabled={this.state.submitDisable}
                      className="contactUsSubmit"
              >{this.state.submitValue}
              </button>
            </Col>
            <Col md="6" className="right" data-aos="fade-left">
              <div className="titleBar">
                <div className="blockLine"></div>
                <span className="indexNumber">06.</span>
                <span className="indexName">Contact Us</span>
              </div>
              <div className="body">
                <h2>Have a question? Message Us here!</h2>
                <p>Contact us with any questions regarding Athena Secured KYC System. We’re happy to help.</p>
                <Row className="contactDetails">
                  <Col>
                    {
                      contactData.map((item, index) => (
                        <span key={index} className={item.class}>
                          <img src={item.img} />
                          <label>{item.label}</label>
                        </span>
                      ))
                    }
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
export default ContactUs;
