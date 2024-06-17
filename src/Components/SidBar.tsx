import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../App.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Card } from 'react-bootstrap';
export default function SidBar() {
  const [showCol, setShowCol] = useState(true);
  const [colSize, setColSize] = useState("col-md-9");

  const handleFilterClick = () => {
    setShowCol(!showCol);
    setColSize(showCol ? "col-md-12" : "col-md-9");
  };

  return (
    <>
      <div className="row">
        <Navbar expand="lg" className="bg fixed-top tr">
          <Container className="nav-content" fluid>
            <Navbar.Brand href="#home">
              {/* <img
              src={logo}
              width="90"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            /> */}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Browse</Nav.Link>
                <NavDropdown title="Stoies" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Stoies</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Tutorials" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    Tutorials
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>

                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#home">
                  {" "}
                  <FontAwesomeIcon icon={faCartShopping} />
                </Nav.Link>
                <Nav.Link href="#home">
                  {" "}
                  <FontAwesomeIcon icon={faShareNodes} />
                </Nav.Link>
                <Nav.Link href="#home">
                  {" "}
                  <FontAwesomeIcon icon={faCircleNotch} />
                </Nav.Link>

                <NavDropdown title="Lang" id="basic-nav-dropdown-2">
                  <NavDropdown.Item>English(English)</NavDropdown.Item>
                  <NavDropdown.Item>العربيه (Arabic)</NavDropdown.Item>
                  <NavDropdown.Item>Eesti(Estonian)</NavDropdown.Item>
                  <NavDropdown.Item>Francis(French)</NavDropdown.Item>
                  <NavDropdown.Item>كوردى(Kurdish)</NavDropdown.Item>
                </NavDropdown>

                <Nav.Link href="#home">
                  {" "}
                  <FontAwesomeIcon icon={faAngleRight} /> Logii Sisse
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <Container fluid className="Container">
        <div className="row">
          {showCol ? (
            <div
              className="col-md-3 left-side"
              style={{
                height: "92vh",
                overflowY: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.2) transparent",
              }}
            >
              {Array.from({ length: 20 }).map((_, index) => (
                <p key={index}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              ))}
            </div>
          ) : null}

          <div className={`col-md-${showCol ? "9" : "12"}`}>
            <div className="sticky-div">
              <FontAwesomeIcon
                className="custom-icon"
                icon={faFilter}
                onClick={handleFilterClick}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  gap: "10px",
                }}
              >
                <NavDropdown
                  title={<FontAwesomeIcon icon={faBars} />}
                  id="basic-nav-dropdown-2"
                >
                  <NavDropdown.Item>VAADE</NavDropdown.Item>
                  <hr />
                  <NavDropdown.Item>
                    <FontAwesomeIcon icon={faTable} /> Ruudustik
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <FontAwesomeIcon icon={faBars} /> Table
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <FontAwesomeIcon icon={faList} /> Nimekiri
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <FontAwesomeIcon icon={faBorderAll} /> Kohandatud
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title={
                    <span>
                      Sorteeri <FontAwesomeIcon icon={faEye} />{" "}
                    </span>
                  }
                  id="basic-nav-dropdown-2"
                >
                  <NavDropdown.Item>Sorteeri</NavDropdown.Item>
                  <hr />
                  <NavDropdown.Item>
                    <FontAwesomeIcon icon={faTable} /> Lisamise kuupäev
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <FontAwesomeIcon icon={faBars} /> Uuendamise kuupäev
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <FontAwesomeIcon icon={faList} /> Relevantsus
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <FontAwesomeIcon icon={faBorderAll} /> Date
                  </NavDropdown.Item>
                </NavDropdown>

                <h5 style={{ color: "white" }}>269/269</h5>
              </div>
            </div>
            <div className="card-container">
      <Card className="card-content">
        <Card.Body>
        <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      <p>Ahmad</p>
      
        </Card.Body>
      </Card>
    </div>
          </div>
        </div>
      </Container>
    </>
  );
}
