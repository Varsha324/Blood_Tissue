import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#3498db" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          🩸🫀ORGAN EASE
        </Typography>
        <div>
          <Button color="inherit" onClick={handleMenuClick} sx={{ fontWeight: "bold" }}>
            Registration
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/add-donor");
              }}
              sx={{ fontWeight: "bold" }}
            >
              Donor Registration
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/Recipient");
              }}
              sx={{ fontWeight: "bold" }}
            >
              Recipient Registration
            </MenuItem>
          </Menu>
          <Button
            color="inherit"
            onClick={() => navigate("/RecipientStatus")}
            sx={{ fontWeight: "bold" }}
          >
            Recipient Status
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/DonorStatus")}
            sx={{ fontWeight: "bold" }}
          >
            Donor Status
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/")}
            sx={{ fontWeight: "bold" }}
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
