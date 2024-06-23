import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../App.css";
import { images } from "../Data/DataServices.tsx";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import { Container, Row, Col, Image } from "react-bootstrap";

export default function NavBar() {
  const [showCol, setShowCol] = useState(true);
  const [colSize, setColSize] = useState("col-md-9");

  const handleFilterClick = () => {
    setShowCol(!showCol);
    setColSize(showCol ? "col-md-12" : "col-md-9");
  };

  return (
    <>
      <Container fluid className="Container">
        <div className="row">
          {showCol ? (
            <div
              className="col-md-3 left-side"
              // style={{
              //   height: "92vh",
              //   overflowY: "auto",
              //   scrollbarWidth: "thin",
              //   scrollbarColor: "rgba(0, 0, 0, 0.2) transparent",
              // }}
            >
         
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
                  <Container fluid>
                    <Row xs={2} sm={2} md={3} lg={5}>
                      {images.map((image, index) => (
                        <Col key={index} className="mb-3">
                          <div style={{ position: "relative" }}>
                            <Image
                              src={image.src}
                              alt={image.alt}
                              rounded
                              style={{ width: "100%", height: "300px" , paddingRight:"5px"}}
                            />
                            <div className="Image_footer">
                              <span>{image.text}</span>
                              <p>{image.date}</p>   

                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
