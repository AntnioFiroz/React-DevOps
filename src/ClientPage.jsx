import React from 'react';
import { Container, Typography } from '@mui/material';

const ClientPage = () => {
  return (
    <Container>
      <Typography variant="h4">Our Clients</Typography>
      <Typography>
        Here are some of the clients we've had the pleasure to work with.
      </Typography>
      {/* Add client content here */}
    </Container>
  );
};

export default ClientPage;
