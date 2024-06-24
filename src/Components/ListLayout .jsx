import React from 'react';
import { Card, CardContent, CardMedia, Typography, Paper } from '@mui/material';

const ListLayout = ({ images }) => {
  return (
    <Paper style={{ backgroundColor: "#d9dadf", }}>
      {images.map((image, index) => (
        <Card key={index} style={{ display: 'flex', marginBottom: '16px', minWidth: '400px' }}>
          <CardMedia
            component="img"
            alt={image.alt}
            height="100"
            image={image.src}
            style={{ flex: '0 0 100px', marginRight: '16px' }}
          />
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              {image.text}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {image.date}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Paper>
  );
};

export default ListLayout;
