import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Link } from '@mui/material'; // Import Link from @mui/material
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Company Logo and Name (Replace with your logo image URL) */}
        <IconButton edge="start" color="inherit" aria-label="menu">
          {/* <img src="https://image.shutterstock.com/image-photo/image-260nw-2219012257.jpg" alt="" width="40" height="50" /> */}
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          DevOps Learning Program
        </Typography>

        {/* Navigation Links */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button color="inherit">Home</Button>
        </Link>
        <Link to="/project" style={{ textDecoration: 'none' }}>
          <Button color="inherit">Projects</Button>
        </Link>
        <Button color="inherit">Clients</Button>
        <Button color="inherit">Services</Button>
        <Button color="inherit">About</Button>
        <Button color="inherit">Contact</Button>

        {/* Sign Up Button */}
        <Button color="secondary" variant="contained">
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
