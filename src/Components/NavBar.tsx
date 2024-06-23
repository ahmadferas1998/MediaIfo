import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../App.css";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Image } from "react-bootstrap";
import SideBar from "../Components/SideBar.tsx";
import logo from "../images/logo2.jpg";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home.tsx";
import Browse from "./Browse.tsx";

export default function NavBar() {
  return (
    <>
 <Router>
      <div className="row">
        <Navbar expand="lg" className="bg fixed-top tr">
          <Container className="nav-content" fluid>
            <Navbar.Brand as={Link} to="/">
              <img
                src={logo}
                width="90"
                height="40"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/browse">Browse</Nav.Link>
                <NavDropdown title="Stories" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/stories">Stories</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Tutorials" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/tutorials">Tutorials</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/cart"><FontAwesomeIcon icon={faCartShopping} /></Nav.Link>
                <Nav.Link as={Link} to="/share"><FontAwesomeIcon icon={faShareNodes} /></Nav.Link>
                <Nav.Link as={Link} to="/notch"><FontAwesomeIcon icon={faCircleNotch} /></Nav.Link>
                <NavDropdown title="Lang" id="basic-nav-dropdown-2">
                  <NavDropdown.Item>English(English)</NavDropdown.Item>
                  <NavDropdown.Item>العربيه (Arabic)</NavDropdown.Item>
                  <NavDropdown.Item>Eesti(Estonian)</NavDropdown.Item>
                  <NavDropdown.Item>Francis(French)</NavDropdown.Item>
                  <NavDropdown.Item>كوردى(Kurdish)</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/login"><FontAwesomeIcon icon={faAngleRight} /> Logii Sisse</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container style={{ marginTop: '11px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<SideBar />} />

          </Routes>
        </Container>
      </div>
    </Router>

    </>
  );
}
