import React, {Component} from 'react';
import { Container, Row, Col, Collapse, CardBody, Card } from 'reactstrap';

import '../../css/landingPage/Faq.css';

class Faq extends Component {

  constructor(props){
    super(props);
    this.state = {
      id: 0,
      data: []
    }
  }

  async componentWillMount(){
    await this.setState({
      data: [
        {active: false, question: 'What is Athena Secured KYC System', answer: 'Velit aliquet sagittis id consectetur purus ut. Diam phasellus vestibulum lorem sed risus ultricies tristique. Dui vivamus arcu felis bibendum ut tristique. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Quis imperdiet massa tincidunt nunc pulvinar sapien et. Lobortis scelerisque fermentum dui faucibus in ornare quam. In est ante in nibh mauris cursus mattis molestie.'},
        {active: true, question: 'What is Athena Secured KYC System', answer: 'Velit aliquet sagittis id consectetur purus ut. Diam phasellus vestibulum lorem sed risus ultricies tristique. Dui vivamus arcu felis bibendum ut tristique. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Quis imperdiet massa tincidunt nunc pulvinar sapien et. Lobortis scelerisque fermentum dui faucibus in ornare quam. In est ante in nibh mauris cursus mattis molestie.'},
        {active: false, question: 'What is Athena Secured KYC System', answer: 'Velit aliquet sagittis id consectetur purus ut. Diam phasellus vestibulum lorem sed risus ultricies tristique. Dui vivamus arcu felis bibendum ut tristique. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Quis imperdiet massa tincidunt nunc pulvinar sapien et. Lobortis scelerisque fermentum dui faucibus in ornare quam. In est ante in nibh mauris cursus mattis molestie.'},
        {active: false, question: 'What is Athena Secured KYC System', answer: 'Velit aliquet sagittis id consectetur purus ut. Diam phasellus vestibulum lorem sed risus ultricies tristique. Dui vivamus arcu felis bibendum ut tristique. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Quis imperdiet massa tincidunt nunc pulvinar sapien et. Lobortis scelerisque fermentum dui faucibus in ornare quam. In est ante in nibh mauris cursus mattis molestie.'},
      ]
    });
  }

  toggle = async id => {
    let faqData = this.state.data;
    faqData[id].active = !faqData[id].active;
    await this.setState({
      id: id,
      data: faqData
    });
  }


  render(){
    return (
      <div className="faq" id="faq">
        <Container>
          <Row className="faqContent">
            <Col md="6" className="left" data-aos="zoom-in-right">
              <div className="titleBar">
                <div className="blockLine"></div>
                <span className="indexNumber">05.</span>
                <span className="indexName">FAQ's</span>
              </div>
              <div className="body">
                <h2>Frequently Asked Questions</h2>
                <p>If you have any other questions, please get in touch via email.</p>
              </div>
            </Col>
            <Col md="6" className="right" data-aos="zoom-in-left">
              {
                this.state.data.map((item, index) => (
                  <div className="block" key={index}>
                    <div className="faqTitleBar">
                      <span>
                        {item.question}
                        <img src={require('../../images/icon-ExpandArrow.svg')} onClick={() => this.toggle(index)} />
                      </span>
                    </div>
                    <Collapse isOpen={item.active}>
                      <Card>
                        <CardBody><p>{item.answer}</p></CardBody>
                      </Card>
                    </Collapse>
                  </div>
                ))
              }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Faq;
