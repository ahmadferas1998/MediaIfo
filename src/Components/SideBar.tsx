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
import { Container, Row, Col, Image } from "react-bootstrap";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import GridViewLayout from "./gridViewLayout.jsx";
import TableLayout from "./TableLayout.jsx";
import ListLayout from "./ListLayout .jsx";
import CardView from "./cardView.jsx";
import { Button, Menu, MenuItem } from '@mui/material';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
export default function NavBar() {


  const Alldata = new Set(images.map(item => item)).size;
  const [Data, setData] = useState(images);
  const uniqueDatesCount = new Set(Data.map(item => item)).size;
  const [icon, seticon] = useState(false);

  const [ActiveDrpDown, setActiveDrpDown] = useState<string[]>([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  //#region  filter Section
  
  type categoryCounts = {
    [key: string]: number;
  };
  
  const [filteredData, setFilteredData] = useState<categoryCounts>({});

  useEffect(() => {
    // Filter data by category and count the number of each category
    const categoryCounts: categoryCounts = images.reduce((acc: categoryCounts, image) => {
      acc[image.category] = acc[image.category] ? acc[image.category] + 1 : 1;
      return acc;
    }, {});

    setFilteredData(categoryCounts);
  }, []);


  const handleCategoryClick =(Category)=>{
    const originalData = images; 
    setData(originalData.filter(item => item.category === Category));

    const newData = { ...filteredData };
    delete newData[Category];
    setFilteredData(newData)

  }

  //#region  filter Section

  const [FromDate, setFromDate] = useState(null);
  const ChangeFromDate = (date) => {
    setFromDate(date);
  };

  const [ToDate, setToDate] = useState(null);
  const ChangeToDate = (date) => {
    setToDate(date);

  };


  const SortFilter = () => {
    const sortedData = [...Data];
    sortedData.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (icon) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    setData(sortedData);
    seticon(!icon);
  };
  const [Layout, setLayout] = useState('gridView');
  const handleSelect = (eventKey) => {
    setLayout(eventKey);
  };
  const [showCol, setShowCol] = useState(true);
  const [colSize, setColSize] = useState("col-md-9");
  const handleFilterClick = () => {
    setShowCol(!showCol);
    setColSize(showCol ? "col-md-12" : "col-md-9");
  };

  //#region  Serch Text Box Section

  const [searchString, setSearchString] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Search submitted:', searchString);
  };

  const handleInputChange = (e) => {
    setSearchString(e.target.value);
    // Implement input change functionality here
    // For example, fetch search results from an API
    setDropdownVisible(true); // Show the dropdown on input change
  };

  const handleInputFocus = () => {
    setDropdownVisible(true);
  };

  const handleInputBlur = () => {
    setDropdownVisible(false);
  };

  const handleAdvanceSearch = () => {
    // Implement advanced search functionality here
    console.log('Advanced search clicked');
  };

  const handleShowHistory = () => {
    // Implement show history functionality here
    console.log('Show history clicked');
  };

  //#endregion
  return (
    <>
      <Container fluid className="Container">
        <div className="row">
          {showCol ? (
            <div className="col-md-3 left-side">

              <div className="row" style={{ marginTop: "10px" }}>
                <div id="stickybar-search" className="ui category search item">
                  <form onSubmit={handleSearchSubmit} className="ui icon input">
                    <input
                      className="prompt"
                      type="text"
                      placeholder="Search For Content"
                      name="searchTerm"
                      value={searchString}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    <button className="search-btn" type="submit">
                      <FontAwesomeIcon icon={faSearch} />

                    </button>
                  </form>
                  <div className={`search_dropdown ${isDropdownVisible ? 'visible' : ''}`}>
                    <ul>
                      <li className="show-history" onClick={handleShowHistory}>
                        Show Search History
                      </li>
                      <li className="advance-search" onClick={handleAdvanceSearch}>
                        Advanced Search
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="ActiveFilter">
                <Button style={{ width: "100%", backgroundColor: "#406886" }}
                  variant="contained"
                  onClick={handleClick}
                  startIcon={<FontAwesomeIcon className="custom-icon-ActiveFilter" icon={faFilter} />}
                >
                  Active Filter
                </Button>
                <Menu
                  id="dropdown-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {ActiveDrpDown.map((option, index) => (
                    <MenuItem key={index} onClick={() => handleOptionSelect(option)}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
                <span>{selectedOption}</span>
              </div>




              <div className="row">
                <Accordion className="Accordion">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <strong>DATE</strong>
                  </AccordionSummary>
                  <AccordionDetails>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          onChange={ChangeFromDate}
                          label="From" />
                      </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          onChange={ChangeToDate}
                          label="To" />
                      </DemoContainer>
                    </LocalizationProvider>
                  </AccordionDetails>
                </Accordion>

                <Accordion className="Accordion">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <strong>CATEGORY</strong>
                  </AccordionSummary>
                  <AccordionDetails>
                  <div className="row">
                          {Object.keys(filteredData).map((category, index) => (
                            <div className="col-md-6 CardFilter" key={index} onClick={() => handleCategoryClick(category)} style={{ cursor: 'pointer', margin: '10px', maxWidth: 'calc(50% - 20px)' }}>
                              <span>{category}</span><span className="Count">{filteredData[category]}</span>
                            </div>
                          ))}
                        </div>

 
                  </AccordionDetails>
                </Accordion>

                <Accordion className="Accordion">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <strong>CREATOR</strong>
                  </AccordionSummary>
                  <AccordionDetails>

                  </AccordionDetails>
                </Accordion>

                <Accordion className="Accordion">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <strong>CAMERA</strong>
                  </AccordionSummary>
                  <AccordionDetails>

                  </AccordionDetails>
                </Accordion>

                <Accordion className="Accordion">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header"  >
                    <strong>TAGS</strong>
                  </AccordionSummary>
                  <AccordionDetails>

                  </AccordionDetails>
                </Accordion>

                <Accordion className="Accordion">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
                    <strong>PUBLISHER</strong>
                  </AccordionSummary>
                  <AccordionDetails>

                  </AccordionDetails>
                </Accordion>
              </div>


            </div>
          ) : null}

          <div className={`col-md-${showCol ? "9" : "12"}`} style={{ padding: "0px" }}>
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
                  onSelect={handleSelect}
                >
                  <NavDropdown.Item eventKey="layout">LAYOUT</NavDropdown.Item>
                  <hr />
                  <NavDropdown.Item eventKey="gridView">
                    <FontAwesomeIcon icon={faTable} /> Grid View
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="tableView">
                    <FontAwesomeIcon icon={faBars} /> Table View
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="listView">
                    <FontAwesomeIcon icon={faList} /> List View
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="cardView">
                    <FontAwesomeIcon icon={faBorderAll} /> Card View
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title={
                    <span>
                      Sort by <FontAwesomeIcon icon={faCalendarDays} /> {" "}
                    </span>
                  }
                  id="basic-nav-dropdown-2"
                >
                  <NavDropdown.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    onClick={SortFilter} >Sort by

                    {icon ?
                      <FontAwesomeIcon icon={faAngleDown} />
                      : <FontAwesomeIcon icon={faAngleUp} />
                    }

                  </NavDropdown.Item>
                  <hr />
                  <NavDropdown.Item>
                    <FontAwesomeIcon icon={faCalendarDays} /> Date Update
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <FontAwesomeIcon icon={faCalendarDays} /> Date Add
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <FontAwesomeIcon icon={faEye} /> Popularity
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <FontAwesomeIcon icon={faThumbsUp} /> Score
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <FontAwesomeIcon icon={faCalendarDays} /> Date
                  </NavDropdown.Item>
                </NavDropdown>

                <h5 style={{ color: "white" }}> {uniqueDatesCount}/{Alldata}</h5>
              </div>
            </div>


            <div className="card-container">
              {Layout === "gridView" ? (
                <GridViewLayout images={Data}></GridViewLayout>
              ) : Layout === "tableView" ? (
                <TableLayout images={Data}></TableLayout>
              ) : Layout === "ListLayout" ? (
                <ListLayout images={Data}></ListLayout>
              ) : (
                <CardView images={Data}></CardView>
              )}



            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
