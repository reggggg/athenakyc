import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import '../../css/VerticalRoadmap.css';

class VerticalRoadmap extends Component {
  render(){
    return (
      <div className="verticalRoadmap">
        <Container>
          <div className="verticalRoadmapContent">
            Vertical Roadmap
          </div>
        </Container>
      </div>
    );
  }
}
export default VerticalRoadmap;
