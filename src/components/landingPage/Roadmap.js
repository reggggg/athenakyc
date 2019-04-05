import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import '../../css/landingPage/Roadmap.css';

class Roadmap extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  async componentWillMount(){
    await this.setState({
      data: [
        {status: require('../../images/Icon-Done.svg'), title: 'Project Idea', body: 'Purus gravida quis blandit turpis cursus in hac habitasse. Pharetra magna ac placerat.'},
        {status: require('../../images/Icon-Done.svg'), title: 'Business Conception', body: 'Purus gravida quis blandit turpis cursus in hac habitasse. Pharetra magna ac placerat.'},
        {status: require('../../images/Icon-InProgress.svg'), title: 'KYC Concept and Design', body: 'Purus gravida quis blandit turpis cursus in hac habitasse. Pharetra magna ac placerat.'},
        {status: require('../../images/Icon-Null.svg'), title: 'Marketing and Advertising', body: 'Purus gravida quis blandit turpis cursus in hac habitasse. Pharetra magna ac placerat.'},
        {status: require('../../images/Icon-Null.svg'), title: 'Launch of Athena', body: 'Purus gravida quis blandit turpis cursus in hac habitasse. Pharetra magna ac placerat.'},
      ]
    })
  }

  render(){
    const timepath = [
      {month: 'November', 'year': '2018'},
      {month: 'December', 'year': '2018'},
      {month: 'January', 'year': '2019'},
      {month: 'February', 'year': '2019'},
      {month: 'March', 'year': '2019'}
    ]

    return (
      <div className="roadmap" id="roadmap">
        <Container>
          <div className="roadmapContent" data-aos="zoom-in-down">
            <div className="titleBar">
              <div className="blockLine"></div>
              <span className="indexNumber">04.</span>
              <span className="indexName">Roadmap</span>
            </div>
            <div className="body">
              <h2>How it all started?</h2>
              <p>Et malesuada fames ac turpis egestas maecenas pharetra convallis. Posuere morbi leo urna molestie at elementum eu. Vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus. </p>
            </div>

            <div className="path">
              <Row className="date">
                {
                  timepath.map((item, index) => (
                    <Col key={index}>
                      <center>{item.month} {item.year}</center>
                    </Col>
                  ))
                }
              </Row>
              <div className="line">
                {
                  this.state.data.map((item, index) => (
                    <div className="boxes" key={index}>
                      <img src={item.status} />
                    </div>
                  ))
                }
              </div>
              <div className="verticalLine">
                {
                  this.state.data.map((item, index) => (
                    <div className="each" key={index}></div>
                  ))
                }
              </div>
              <Row className="desc">
                {
                  this.state.data.map((item, index) => (
                    <Col key={index}>
                      <h6>{item.title}</h6>
                      <p>{item.body}</p>
                    </Col>
                  ))
                }
              </Row>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
export default Roadmap;
