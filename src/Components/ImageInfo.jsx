import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ImageInfo = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);
  const [updateCanvas, setUpdateCanvas] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  const location = useLocation();
  const { src } = location.state || {};
  const imageUrl = src;

  useEffect(() => {
    const handleErrors = (message, source, lineno, colno, error) => {
      console.error(`Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}`, error);
      window.location.reload();
    };

    window.onerror = handleErrors;
    return () => {
      window.onerror = null;
    };
  }, []);

  useEffect(() => {
    if (
      updateCanvas &&
      selectedFileIndex !== null &&
      result &&
      result.pages &&
      result.pages.length > 0
    ) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const image = new Image();
      image.src = uploadedFiles[selectedFileIndex]?.preview || URL.createObjectURL(uploadedFiles[selectedFileIndex]);

      image.onload = () => {
        canvas.width = image.width * zoomLevel;
        canvas.height = image.height * zoomLevel;

        ctx.save();
        ctx.setTransform(zoomLevel, 0, 0, zoomLevel, panOffset.x, panOffset.y);
        ctx.rotate(rotationAngle * (Math.PI / 180));
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        if (searchTerm.trim() !== '') {
          const matchingWords = result.pages?.flatMap(page =>
            page.words.filter(word => word.content.toLowerCase().includes(searchTerm.toLowerCase()))
          );

          matchingWords.forEach(word => {
            const polygon = word.polygon;
            if (polygon && polygon.length > 0) {
              const adjustedPolygon = polygon?.map((coordinate, index) =>
                index % 2 === 0 ? coordinate * zoomLevel : coordinate * zoomLevel
              );

              ctx.beginPath();
              ctx.moveTo(adjustedPolygon[0], adjustedPolygon[1]);

              for (let i = 2; i < adjustedPolygon.length; i += 2) {
                ctx.lineTo(adjustedPolygon[i], adjustedPolygon[i + 1]);
              }

              ctx.closePath();
              ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
              ctx.fill();
              ctx.strokeStyle = 'red';
              ctx.lineWidth = 2;
              ctx.strokeRect(adjustedPolygon[0], adjustedPolygon[1], adjustedPolygon[2] - adjustedPolygon[0], adjustedPolygon[5] - adjustedPolygon[1]);
            }
          });
        }

        ctx.restore();
      };
    }
  }, [selectedFileIndex, uploadedFiles, panOffset, zoomLevel, rotationAngle, result, updateCanvas, searchTerm]);

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

  const analyzeDocument = async () => {
    try {
      setLoading(true);
      const response = await axios.get(imageUrl, { responseType: 'blob' });
      const imageBlob = response.data;
      const file = new File([imageBlob], 'image.jpg', { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append('file', file);

      const analyzeResponse = await axios.post('https://squareonehandtotext.azurewebsites.net/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = analyzeResponse.data;
      setResult(result);
      setError(null);
      setUpdateCanvas(true);

      setUploadedFiles([{ preview: URL.createObjectURL(file), file }]);
      setSelectedFileIndex(0);
    } catch (error) {
      console.error('Error analyzing document:', error);
      setError('An error occurred during analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    analyzeDocument();
  }, []);

  const copyToClipboard = () => {
    if (result) {
      const analysisText = result.paragraphs?.map(paragraph => paragraph.content).join('\n');
      navigator.clipboard.writeText(analysisText)
        .then(() => alert('Analysis result copied to clipboard'))
        .catch(error => console.error('Error copying to clipboard:', error));
    }
  };

  const highlightText = (content) => {
    if (searchTerm.trim() === '') {
      return content;
    }
    const searchTerms = searchTerm.split(/\s+/).filter(term => term.trim() !== '');
    const regex = new RegExp(`(${searchTerms.join('|')})`, 'gi');
    return content.replace(regex, '<span class="highlighted">$1</span>');
  };

  const zoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <>
    {loading ? (
   <div className="loading-container">
   <div className="loader"></div>
 </div>
 
    ): (
    <div className="container-fluid" style={{ marginTop: "40px" }}>
      <div className="row">
        <div className="col-md-6 mt-4 order-md-2">
          <div className="mb-3">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              className="border"
              style={{ width: "100%", height: "546px" }}
            ></canvas>
          </div>
          <div className="mb-3 d-flex flex-wrap">
            <button className="btn btn-secondary mr-2 mb-2" onClick={zoomIn}>Zoom In</button>
            <button className="btn btn-secondary mr-2 mb-2" onClick={zoomOut}>Zoom Out</button>
            <button className="btn btn-secondary mr-2 mb-2" onClick={copyToClipboard}>Copy Analysis Result</button>
          </div>
        </div>
        <div className="col-md-6 mt-4 order-md-1">
          <div className="mb-3 row align-items-center">
            <div className="col-auto gobackicon">
              <FontAwesomeIcon icon={faArrowLeft} onClick={handleGoBack} />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Search for words"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="analysis-result" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-danger">{error}</div>
            ) : result ? (
              <div>
                {result.paragraphs?.map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: highlightText(paragraph.content) }}></p>
                ))}
              </div>
            ) : (
              <div>No analysis result</div>
            )}
          </div>
        </div>
      </div>
    </div>
    )
  }
    </>
  );
};

export default ImageInfo;
