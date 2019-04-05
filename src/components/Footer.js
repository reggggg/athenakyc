import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import '../css/Footer.css';

class Footer extends Component {
  render(){
    return (
      <div className="footer">
        <Container>
          <center className="footerContent">
            <p>Athena Secured KYC System ⓒ 2018. All Rights Reserved. </p>
          </center>
        </Container>
      </div>
    );
  }
}
export default Footer;
