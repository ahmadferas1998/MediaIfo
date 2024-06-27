import React, { useState, useRef,useEffect } from 'react';
import Tesseract from 'tesseract.js';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import '../App.css';

const ImageTextExtractor = () => {
  const location = useLocation();
  const { src } = location.state || {};

  const [imageURL, setImageURL] = useState(src);
  const [text, setText] = useState('');
  const [highlightedText, setHighlightedText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [words, setWords] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1); // حالة التكبير

  const canvasRef = useRef(null);
  
  useEffect(() => {
    setImageURL(src)
    extractTextFromImage();
  }, []); 
  const extractTextFromImage = () => {
    fetch(imageURL)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result;
          Tesseract.recognize(base64Image, 'eng')
            .then(({ data: { text, words } }) => {
              setText(text);
              setWords(words);
              setHighlightedText(highlightText(text, searchTerm));
              drawBoxes(words, searchTerm);
            })
            .catch(err => console.error(err));
        };
        reader.readAsDataURL(blob);
      })
      .catch(err => console.error('Error fetching image:', err));
  };

  // دالة لتحديد الكلمات المشددة بالبحث
  const highlightText = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setHighlightedText(highlightText(text, term));
    drawBoxes(words, term);
  };

  const drawBoxes = (words, term) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageURL;

    img.onload = () => {
      canvas.width = img.width * zoomLevel;
      canvas.height = img.height * zoomLevel;
      ctx.drawImage(img, 0, 0, img.width * zoomLevel, img.height * zoomLevel);

      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2 / zoomLevel;

      words.forEach((word) => {
        if (word.text.toLowerCase().includes(term.toLowerCase())) {
          const { bbox } = word;
          ctx.strokeRect(bbox.x0 * zoomLevel, bbox.y0 * zoomLevel, (bbox.x1 - bbox.x0) * zoomLevel, (bbox.y1 - bbox.y0) * zoomLevel);
        }
      });
    };
  };

  // دالة للتكبير
  const zoomIn = () => {
    setZoomLevel(prevZoom => prevZoom + 0.2);
    drawBoxes(words, searchTerm); // إعادة رسم الصورة بعد التكبير
  };

  // دالة للتصغير
  const zoomOut = () => {
    if (zoomLevel > 0.2) { // تأكيد على أن التكبير لم يصل إلى الحد الأدنى
      setZoomLevel(prevZoom => prevZoom - 0.2);
      drawBoxes(words, searchTerm); // إعادة رسم الصورة بعد التصغير
    }
  };


  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleMouseDown = (event) => {
    setPanStart({ x: event.clientX, y: event.clientY });
    setIsPanning(true);
  };
  const handleMouseMove = (event) => {
    if (!isPanning) return;

    const offsetX = event.clientX - panStart.x;
    const offsetY = event.clientY - panStart.y;

    setPanOffset((prevOffset) => ({
      x: prevOffset.x + offsetX,
      y: prevOffset.y + offsetY,
    }));

    setPanStart({ x: event.clientX, y: event.clientY });
  };
  const handleMouseUp = () => {
    setIsPanning(false);
  };


  return (
    <Container style={{overflow:"auto"}}>
      <Row className="my-4">
      
      </Row>
      <Row className="my-4">
        <Col>
          <div className="image-container"
          
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          
          >
            <canvas
               style={{
                transform: `scale(${zoomLevel}) rotate(${rotationAngle}deg) translate(${panOffset.x}px, ${panOffset.y}px)`,
                width: '100%',
                height: 'auto',
                maxHeight: '400px',
              }}
            
            ref={canvasRef}></canvas>
          </div>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <Button variant="primary" onClick={extractTextFromImage}>Extract Text</Button>
          <Button variant="secondary" onClick={zoomIn} className="ms-2">Zoom In</Button>
          <Button variant="secondary" onClick={zoomOut} className="ms-2">Zoom Out</Button>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <Form.Group controlId="searchTerm" className="mb-3">
            <Form.Label>Search for a word to highlight</Form.Label>
            <Form.Control type="text" value={searchTerm} onChange={handleSearchChange} />
          </Form.Group>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          {text && (
            <div>
              <h5>Extracted Text:</h5>
              <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ImageTextExtractor;