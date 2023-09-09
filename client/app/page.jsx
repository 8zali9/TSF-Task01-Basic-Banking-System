"use client"

import React from 'react';
import { Container, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const HomePage = () => {
  const handleClick = () => {
    toast.dark('Coming Soon.')
  }
  return (
    <Container className='homepage'>
      <Typography variant="h3" component="h1" sx={{ mt: 4, mb: 2 }}>
      <strong className='slogan'>Highlighting the secure storage and transfer of assets</strong>
        <div className='container'>
          <div onClick={handleClick} className='c1'>
            <h2 className='s1'>Service</h2>
            <p>we offer ...</p>
          </div>

          <div onClick={handleClick} className='c2'>
            <h2 className='s1'>Service</h2>
            <p>We offer ...</p>
          </div>

          <div onClick={handleClick} className='c3'>
            <h2 className='s1'>Service</h2>
            <p>we offer ...</p>
          </div>

          <h1 className='service'>Our Services</h1>
        </div>
      </Typography>
    </Container>
  );
};

export default HomePage;
