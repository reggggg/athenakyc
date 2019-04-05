import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../../css/landingPage/Benefits.css';

class Benefits extends Component {
  render(){

  const benefits = [
   {img: require('../../images/icon-search.svg'), title: 'Easy to Use', body: 'Purus gravida quis blandit turpis cursus in hac habitasse. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros.'},
    {img: require('../../images/icon-target.svg'), title: 'Upload Documents.', body: 'Purus gravida quis blandit turpis cursus in hac habitasse. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros.'},
    {img: require('../../images/icon-pie.svg'), title: 'Provide selfie for verification', body: 'Purus gravida quis blandit turpis cursus in hac habitasse. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros.'},
    {img: require('../../images/Icon-Settings.svg'), title: 'Submit your KYC application.', body: 'Purus gravida quis blandit turpis cursus in hac habitasse. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros.'},
  ]

    return (
      <div className="benefits" id="benefits">
        <Container>
          <div className="benefitsContent">
            <Row className="firstRow" data-aos="fade-left" data-aos-duration="500">
              <Col md="6" className="left">
                {/* in progress */}
              </Col>
              <Col md="6" className="right">
                <div className="titleBar">
                  <div className="blockLine"></div>
                  <span className="indexNumber">01.</span>
                  <span className="indexName">What is Athena KYC? </span>
                </div>
                <div className="body">
                  <h2>Athena is a Secured KYC System You Can Use Anywhere</h2>
                  <p>Athena KYC is a cheaper, more secure, and reusable KYC alternative thats solves your verification needs.</p>
                </div>
              </Col>
            </Row>
            <Row className="secondRow" data-aos="fade-right" data-aos-duration="500">
              <Col md="6" className="left">
                <div className="titleBar">
                  <div className="blockLine"></div>
                  <span className="indexNumber">02.</span>
                  <span className="indexName">How to Use Athena KYC</span>
                </div>
                <div className="body">
                  <h2>Athena is a Secured KYC System  Do KYC in just 3 steps!</h2>
                </div>
              </Col>
              <Col md="6" className="right">
                {/* in progress */}
              </Col>
            </Row>
            <Row className="thirdRow" data-aos="zoom-in" data-aos-duration="500">
              {
                benefits.map((item, index) => (
                  <Col md="3" key={index}>
                    <label>0{index + 1.}.</label>
                    <center>
                      <img src={item.img} alt=""/>
                      <h5>{item.title}</h5>
                      <p>{item.body}</p>
                    </center>
                  </Col>
                ))
              }
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}
export default Benefits;
