import React from 'react';
import { Card, Container, Row, Col, Image } from 'react-bootstrap'; 

const CardView = ({ images }) => {
  return (
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
                    style={{ width: "100%", height: "300px", paddingRight: "5px" }}
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
  );
};

export default CardView;
