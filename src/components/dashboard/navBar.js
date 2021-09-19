import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useHistory } from 'react-router-dom';


export default function NavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/dashboard">ICSD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>
            <Nav.Link href="/userInfo">My Information</Nav.Link>
            <Nav.Link href="/classesSignUp">Class Registration</Nav.Link>
            <Nav.Link href="/myGrades">My Grades</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link href="/logout" to="/logout">Log Out</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>

    </div>
  )
}


