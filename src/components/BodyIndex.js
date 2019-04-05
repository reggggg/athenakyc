import React, {Component} from 'react';
import $ from 'jquery';
import Header from './Header';
import Showcase from './landingPage/Showcase';
import Benefits from './landingPage/Benefits';
import LandingSignup from './landingPage/LandingSignup';
import Roadmap from './landingPage/Roadmap';
import Faq from './landingPage/Faq';
import ContactUs from './landingPage/ContactUs';
import Subscribe from './landingPage/Subscribe';
import { Container } from 'reactstrap';
import AOS from 'aos';

import '../css/commons.css';
import 'aos/dist/aos.css';
import '../css/BodyIndex.css';


class BodyIndex extends Component {

  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    };
  }

  goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  componentDidMount(){
    AOS.init();
    $('.bodyIndex button.floatingButton').fadeOut(0);
    $(window).scroll(function() {
      if ($(this).scrollTop() >= 800) {
        $('.bodyIndex button.floatingButton').fadeIn(500);
      }else {
        $('.bodyIndex button.floatingButton').fadeOut(500);
      }
    });
  }


  openModal = async e => {
    await this.setState({
      isOpen: e
    });
  }


  render(){
    let signupVisible;
    if(!localStorage['Session']){
      signupVisible = <LandingSignup openModal={(e) => this.openModal(e)} />
    }
    return (
      <div className="bodyIndex">
        <Header signUpOpenModal={this.state.isOpen} />
          <Showcase />
          <Benefits />
          {signupVisible}
          <Roadmap />
          <Faq />
          <ContactUs />
          <Subscribe />

          <button className="floatingButton" onClick={this.goToTop}><img src={require('../images/up-chevron.svg')} /></button>
      </div>
    );
  }
}
export default BodyIndex;
