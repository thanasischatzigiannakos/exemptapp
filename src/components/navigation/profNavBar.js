import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';



export default function ProfNavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/statistics">ICSD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/statistics">Home</Nav.Link>
            <Nav.Link href="/management">My Information</Nav.Link>
            <Nav.Link href="/myTeachings">My Classes</Nav.Link>
            <Nav.Link href="/grading">Student Grading</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link href="/logout" to="/logout">Log Out</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>

    </div>
  )
}
