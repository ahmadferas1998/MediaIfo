import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { images } from "../Data/DataServices.tsx";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageInfo from './ImageInfo.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faSync, faRedo } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { faScissors } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { Container } from "react-bootstrap";

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [scale, setScale] = useState(1);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    afterChange: (index) => setCurrentIndex(index),
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setCurrentImage(images[index])
    sliderRef.current.slickGoTo(index);
    resetZoomAndRotation();
    // Update currentImage state
  };

  const toggleZoom = () => {
    setZoomed(!zoomed);
  };




  const [zoomLevel, setZoomLevel] = useState(1);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const zoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  };
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
  const resetZoomAndRotation = () => {
    setZoomLevel(1);
    setRotationAngle(0);
    setPanOffset({ x: 0, y: 0 });
  };
  const rotateClockwise = () => {
    setRotationAngle((prevAngle) => prevAngle + 90);
  };




  // LocalizationSection

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateCanvas, setUpdateCanvas] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [searchedWordPolygons, setSearchedWordPolygons] = useState([]);
  // const search = () => {
  //   if (result && result.paragraphs) {
  //     const matchingParagraphs = result.paragraphs.filter((paragraph) =>
  //       paragraph.content.includes(searchTerm)
  //     );
  //     console.log('Matching Paragraphs:', matchingParagraphs);
  //   }
  // };


  const search = () => {
    if (result && result.pages) {
      let matchingWords;

      if (searchTerm.trim() === '') {
        // If search term is empty, consider all words
        matchingWords = result.pages.flatMap((page) => page.words);
      } else {
        // If search term is not empty, proceed with searching individual words
        const searchTerms = searchTerm.split(/\s+/).filter(term => term.trim() !== '');
        matchingWords = result.pages.flatMap((page) =>
          page.words.filter((word) => searchTerms.some(term => word.content.includes(term)))
        );
      }

      // Log matching words
      console.log('Matching Words:', matchingWords);

      // Extract and set the polygons of the searched words
      const searchedWordPolygons = matchingWords.map((word) => word.polygon);
      setSearchedWordPolygons(searchedWordPolygons);

      // Log polygons of the searched words
      console.log('Searched Word Polygons:', searchedWordPolygons);

      // Draw polygons on the selected preview image
      if (selectedFileIndex !== null && searchedWordPolygons.length > 0) {
        setUpdateCanvas(true);
      }
    }
  };



  const analyzeDocument = async () => {

    if (currentImage == null) {
      setCurrentImage(images[0])
    }
    setResult(null)
    try {
      setLoading(true);
      const response = await fetch(currentImage.src);
      const blob = await response.blob();
      const fileName = currentImage.src.substring(currentImage.src.lastIndexOf('/') + 1);
      const file = new File([blob], fileName, { type: blob.type });

      const formData = new FormData();
      formData.append('file', file);

      const analyzeResponse = await axios.post('https://squareonehandtotext.azurewebsites.net/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = analyzeResponse.data;
      console.log('Analysis Result:', result);
      setResult(result);
      setError(null);
    } catch (error) {
      console.error('Error analyzing document:', error);
      setError('An error occurred during analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const highlightText = (text, searchTerm) => {
    if (!searchTerm) {
      return text;
    }

    const searchTermRegex = new RegExp(searchTerm, 'gi');
    return text.replace(searchTermRegex, (match) => `<mark>${match}</mark>`);
  };

  // useEffect(() => {
  //   if (
  //     updateCanvas &&
  //     selectedFileIndex !== null &&
  //     result &&
  //     result.pages &&
  //     result.pages.length > 0
  //   ) {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext('2d');

  //     // Clear the canvas
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);

  //     // Draw the image
  //     const image = new Image();
  //     const selectedFile = uploadedFiles[selectedFileIndex];

  //     // Use the preview if available, otherwise load the image directly
  //     image.src = selectedFile ? selectedFile.preview || URL.createObjectURL(selectedFile) : '';

  //     image.onload = () => {
  //       // Adjust canvas size based on image dimensions
  //       canvas.width = image.width * zoomLevel;
  //       canvas.height = image.height * zoomLevel;

  //       ctx.save(); // Save the current state

  //       // Apply transformations (zoom, rotation, and pan)
  //       ctx.setTransform(zoomLevel, 0, 0, zoomLevel, panOffset.x, panOffset.y);
  //       ctx.rotate(rotationAngle * (Math.PI / 180));

  //       // Draw the image
  //       ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  //       // Draw polygons for the searched words only
  //       searchedWordPolygons.forEach((polygon) => {
  //         if (polygon && polygon.length > 0) {
  //           const adjustedPolygon = polygon.map((coordinate, index) =>
  //             index % 2 === 0 ? coordinate * zoomLevel : coordinate * zoomLevel
  //           );

  //           ctx.beginPath();
  //           ctx.moveTo(adjustedPolygon[0], adjustedPolygon[1]);

  //           for (let i = 2; i < adjustedPolygon.length; i += 2) {
  //             ctx.lineTo(adjustedPolygon[i], adjustedPolygon[i + 1]);
  //           }

  //           ctx.closePath();

  //           // Set the fill color to blue and make it transparent
  //           ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
  //           ctx.fill();
  //         }
  //       });

  //       ctx.restore(); // Restore the saved state
  //     };
  //   }
  // }, [selectedFileIndex, uploadedFiles, panOffset, zoomLevel, rotationAngle, result, updateCanvas, searchedWordPolygons]);

  // LocalizationSection
  const [state, setState] = useState({
    left: false,
    info: false,
    scissors: false,
  });
  const navigate = useNavigate();

  const GoToHome = () => {
    navigate(`/browse`);
  };

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, left: open });
  };

  const toggleInfoDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setCurrentImage(images[currentIndex])
    setState({ ...state, info: open });
  };

  const toggleScissorsDrawer = (open) => (event) => {
    // if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }
    // analyzeDocument()
    // setState({ ...state, scissors: open });
    navigate('/ImageTextExtractor', { state: { src: currentImage.src } });
  };

  const listInfo = (
    <Box
    sx={{ width: '100%', maxWidth: 600 }} // تعيين عرض الـ Box بالحجم الكامل والحد الأقصى للعرض
    role="presentation"
    onClick={toggleInfoDrawer(false)}
    onKeyDown={toggleInfoDrawer(false)}
  >  
  <h1 style={{ color: 'white', textAlign: 'center', padding: '10px' }}>More Information</h1>
    <div className="card mb-3">
      <img src={currentImage?.src} className="card-img-top" alt={currentImage?.alt} />
      <div className="card-body">
        <h5 className="card-title" style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.5rem', borderBottom: '2px solid #ccc', paddingBottom: '0.5rem' }}>
          {currentImage?.alt}
        </h5>
        <p className="card-text">{currentImage?.text}</p>
        <p className="card-text">
          <small className="text-muted"> Publisher: {currentImage?.publisher}</small>
        </p>
        <p className="card-text">
          <small className="text-muted">Date: {currentImage?.date}</small>
        </p>
        <p className="card-text">
          <small className="text-muted">Creator: {currentImage?.Creator}</small>
        </p>
        <p className="card-text">
          <small className="text-muted">Category: {currentImage?.category}</small>
        </p>
      </div>
    </div>

    <Divider />
  </Box>
  );

  const listScissors = (
    <Box
      sx={{ width: 450 }}
      role="presentation"
    >
      <h4 className="mb-4" style={{ color: "white", textAlign: "center", paddingTop: "20px" }}> Analysis Results</h4>
      <div className="col-md-12" >

        <div className="input-group mb-3">
          <input

            type="text"
            className="form-control"
            placeholder="Search for a word"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" type="button" onClick={search}>
            Search
          </button>
        </div>


        {loading && (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        {result != undefined ? (
          <div className="analysis-results overflow-auto" style={{ color: "white", paddingLeft: "20px" }}>
            <h5>Result:</h5>
            <div>
              {result.paragraphs?.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  dangerouslySetInnerHTML={{ __html: highlightText(paragraph.content, searchTerm) }}
                ></p>
              ))}
            </div>
          </div>
        ) : (
          <div className="placeholder">
          </div>
        )}
      </div>

      <Divider />
    </Box>
  );

  // LocalizationSection
  return (
    <Container fluid className="Container" style={{ backgroundColor: "#242424" }}>

      <div className='row'>
        <div className='col-md-1'>
          <div>
            <React.Fragment>
              <div className='ImageInfo'>
                <FontAwesomeIcon className='InfoIcon' icon={faX} onClick={GoToHome} />
                <FontAwesomeIcon className='InfoIcon' icon={faInfo} onClick={toggleInfoDrawer(true)} />
                {/* <FontAwesomeIcon className='InfoIcon' icon={faScissors} onClick={toggleScissorsDrawer(true)} /> */}
              </div>

              <SwipeableDrawer
                anchor="left"
                open={state.info}
                onClose={toggleInfoDrawer(false)}
                onOpen={toggleInfoDrawer(true)}
              >
                {listInfo}
              </SwipeableDrawer>

              <SwipeableDrawer
                anchor="left"
                open={state.scissors}
                onClose={toggleScissorsDrawer(false)}
                onOpen={toggleScissorsDrawer(true)}
              >
                {listScissors}
              </SwipeableDrawer>
            </React.Fragment>
          </div>
        </div>
        <div className='col-md-10' style={{ backgroundColor: "#242424", paddingLeft: "30px", paddingRight: "30px", paddingTop: "10px" }}>

          <div className="image-slider-container">
            <Slider
              ref={sliderRef}
              {...settings}
            >
              {images?.map((image) => (
                <div key={image.id} className="image-slide">
                  <div className="image-buttons">
                    <div>
                      <div
                        className="page-selection-preview"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                      >
                        <img src={image.src} alt={image.alt}
                          style={{
                            transform: `scale(${zoomLevel}) rotate(${rotationAngle}deg) translate(${panOffset.x}px, ${panOffset.y}px)`,
                            width: '100%',
                            height: 'auto',
                            maxHeight: '400px',
                          }}
                        />
                      </div>

                    </div>
                  </div>
                  <div>

                  </div>

                </div>
              ))}
            </Slider>
            <div className="controls">
              <button className="btn btn-secondary " onClick={toggleScissorsDrawer(true)} >
                Analysis
              </button>

              <button className="btn btn-secondary " onClick={zoomIn}>
                <FontAwesomeIcon icon={faSearchPlus} /> Zoom In
              </button>
              <button className="btn btn-secondary " onClick={zoomOut}>
                <FontAwesomeIcon icon={faSearchMinus} /> Zoom Out
              </button>
              <button className="btn btn-secondary " onClick={resetZoomAndRotation}>
                <FontAwesomeIcon icon={faSync} /> Reset
              </button>
              <button className="btn btn-secondary " onClick={rotateClockwise}>
                <FontAwesomeIcon icon={faRedo} /> Rotate
              </button>
            </div>

            <div className="image-thumbnails-container footer">
              <div className="image-thumbnails">
                {images?.map((image, index) => (
                  <div key={index} className="thumbnail-container">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={index === currentIndex ? 'thumbnail active' : 'thumbnail'}
                      onClick={() => handleThumbnailClick(index)}
                    />
                    <div className="overlay-text">{image.id}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
        <div className='col-md-1'></div>
      </div>



    </Container>
  );
};

export default ImageSlider;