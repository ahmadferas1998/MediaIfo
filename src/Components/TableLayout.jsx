import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, Box } from '@mui/material';

const TableLayout = ({ images }) => {
  return (
    <TableContainer component={Paper} style={{ backgroundColor: "white" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                Title
              </Typography>
            </TableCell>
            <TableCell align="center">Date</TableCell> {/* Align the Date column to the right */}
          </TableRow>
        </TableHead>
        <TableBody>
          {images.map((image, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: '50px', height: '50px', overflow: 'hidden', marginRight: '8px' }}>
                    <img src={image.src} alt={image.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  {image.text}
                </Typography>
              </TableCell>
              <TableCell align="center">{image.date}</TableCell> {/* Align the Date cell content to the right */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableLayout;
