import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Image } from 'react-bootstrap';

const GridViewLayout = ({ images }) => {
  const navigate = useNavigate();

  const handleImageClick = (index) => {
    navigate(`/image/${index}`);
  };

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
                    style={{ width: "100%", height: "200px", paddingRight: "5px", cursor: 'pointer' }}
                    onClick={() => handleImageClick(image.id)}
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

export default GridViewLayout;
