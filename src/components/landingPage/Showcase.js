import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import '../../css/landingPage/Showcase.css';

class Showcase extends Component {

  render(){
    return (
      <div className="showcase">
        <Container>
          <Row className="showcaseContent" data-aos="fade-in" data-aos-easing="linear" data-aos-duration="500">
            <Col md="6" className="left">
              <h1><span>Ath</span>ena KYC for Banks, Financial Technology, and E-commerce Websites.</h1>
              <p>
                Merchants get a premium AI-powered rewards platform for free.
                Shoppers are rewarded for purchases with cryptocurrency.
              </p>
              <button className="whitePaper">White Paper</button>
              <button className="learnMore">Learn more</button>
            </Col>
            <Col md="6" className="right">
              <img src={require('../../images/AthenaMobileImage.png')} alt=""/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Showcase;
