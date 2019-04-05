import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Signin from './authentication/Signin';

import {
  Container,
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import Modal from 'react-responsive-modal';

import history from '../js/history';

import '../css/Header.css';

class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      accountDropdownOpen: false,
      languageSelected: 'EN',
      isLogined: false,
      loginModal: false
    };
  }

  componentWillMount(){
    if(localStorage['Session']){
      history.push('/');
      this.setState({
        isLogined: true
      });
    }
  }

  async componentWillReceiveProps(nextProps){
    await this.setState({
      loginModal: nextProps.signUpOpenModal
    });
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  langSelect = async lang => {
    await this.setState({
      languageSelected: lang
    });
    console.log(this.state.languageSelected);
  }

  toggleLanguageDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  goToSignin = () => {
    // history.push('/signin');
  }


  accountDropdownToggle = async () => {
    await this.setState({
      accountDropdownOpen: !this.state.accountDropdownOpen
    });
  }

  logout = async () => {
    await localStorage.clear();
    window.location.reload();
  }

  //Smooth anchors to bottom components
  goToBenefits = () => {
    document.getElementById('benefits').scrollIntoView({
      behavior: 'smooth'
    });
  }
  goToRoadmap = () => {
    document.getElementById('roadmap').scrollIntoView({
      behavior: 'smooth'
    });
  }
  goToContactUs = () => {
    document.getElementById('contactUs').scrollIntoView({
      behavior: 'smooth'
    });
  }
  goToFaq = () => {
    document.getElementById('faq').scrollIntoView({
      behavior: 'smooth'
    });
  }
  //-----------------------------------

  loginModalToggle = () => {
    this.setState({
      loginModal: !this.state.loginModal
    });
  }

  closeModalFromSignin = async e => {
    await this.setState({
      loginModal: e
    });
  }




  render(){
    const lang = [
      {lang: 'English', value: 'EN'},
      {lang: 'Chinese', value: 'CHI'},
      {lang: 'Filipino', value: 'FIL'},
    ];

    let sessionButton;
    if(this.state.isLogined === true){
      sessionButton =
      <Dropdown isOpen={this.state.accountDropdownOpen} toggle={this.accountDropdownToggle}>
        <DropdownToggle className="accountButton" caret>
          Account
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="languageItem" onClick={() => history.push('/profile')}>Profile</DropdownItem>
          <DropdownItem className="languageItem" onClick={this.logout}>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    }else {
      sessionButton = <button onClick={this.loginModalToggle} className="signin">Login</button>
    }

    return (
      <div className="header">
        <Navbar color="light" light expand="md" className="headerContent">
          <Container>
            <NavbarBrand href="/" className="logoBar">
              <img src={require('../images/AthenaKYC-Logo.png')} alt=""/>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem><a onClick={this.goToBenefits}>About</a></NavItem>
                <NavItem><a onClick={this.goToRoadmap}>Roadmap</a></NavItem>
                <NavItem><a onClick={this.goTo}>Team</a></NavItem>
                <NavItem><a onClick={this.goToContactUs}>Contact Us</a></NavItem>
                <NavItem><a onClick={this.goToFaq}>FAQ</a></NavItem>
                <NavItem>{sessionButton}</NavItem>
                <Dropdown className="languageFrame" isOpen={this.state.dropdownOpen} toggle={this.toggleLanguageDropdown}>
                  <DropdownToggle className="language" caret>{this.state.languageSelected}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Select Language</DropdownItem>
                    {
                      lang.map((item, index) => (
                        <DropdownItem className="languageItem" key={index} onClick={() => this.langSelect(item.value)}>{item.lang}</DropdownItem>
                      ))
                    }
                  </DropdownMenu>
                </Dropdown>
              </Nav>
            </Collapse>
            <Modal open={this.state.loginModal}
                   className="loginModal"
                   onClose={this.loginModalToggle}
                   closeOnOverlayClick={false}
                   closeIconSize={13}
                   center
            >
              <Signin closeModal={(e) => this.closeModalFromSignin(e)} />
            </Modal>
          </Container>
        </Navbar>
      </div>
    );
  }
}
export default Header;
