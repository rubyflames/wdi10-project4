import React, {PropTypes} from 'react';
import { Button, Navbar, NavItem, Nav } from 'react-bootstrap';
import {ReactDOM} from 'react-dom'



const NavbarInstance = () => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">iTINA</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem eventKey={1} href="#">Sign In</NavItem>
        <NavItem eventKey={2} href="./Login">Login</NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavbarInstance
