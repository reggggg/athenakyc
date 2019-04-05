import React, {Component} from 'react';
import Footer from '../Footer';
import { Container, Row, Col } from 'reactstrap';

import '../../css/landingPage/Subscribe.css';

class Subscribe extends Component {

  constructor(props){
    super(props);
    this.state = {
      subscribeChecked: false
    }

  }

  subscribeEmailOnChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });
  }

  render(){
    return (
      <div className="subscribe">
        <Container>
          <div className="subscribeContent">
            <div className="titleBar" data-aos="zoom-in-down">
              <div className="blockLine"></div>
              <span className="indexNumber">07.</span>
              <span className="indexName">Subscribe</span>
            </div>
            <div className="body" data-aos="zoom-in-up">
              <h2>Want to learn more about KYC Secured System</h2>
              <Row className="form">
                <Col md="8">
                  <input type="text"
                         placeholder="Enter your email"
                         name="email"
                         onChange={this.subscribeEmailOnChange}
                  />
                </Col>
                <Col md="4">
                  <button>Submit</button>
                </Col>
              </Row>
              <center>
                <input type="checkbox" defaultChecked={this.state.subscribeChecked} />
                <label>I have read and agreed to the Terms & Conditions</label>
              </center>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }
}
export default Subscribe;
