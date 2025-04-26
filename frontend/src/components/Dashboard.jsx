import React, { useEffect, useState } from "react";
import axios from "axios";
import './OrganImportance.css';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // State for Registration menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/donors/available")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching donors:", err));
  }, []);

  return (
    <div
      style={{
        backgroundColor: "rgb(41, 42, 47)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Top Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            🩸🫀 GiftSync
          </Typography>
          <div>
            <Button color="inherit" onClick={handleMenuClick}>
              Registration
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/add-donor");
                }}
              >
                Donor Registration
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/Recipient");
                }}
              >
                Recipient Registration
              </MenuItem>
            </Menu>
            <Button color="inherit" onClick={() => navigate("/RecipientStatus")}>
              Recipient Status
            </Button>
            <Button color="inherit" onClick={() => navigate("/DonorStatus")}>
              Donor Status
            </Button>
            <Button color="inherit" onClick={() => navigate("/")}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ padding: "100px 20px 40px 20px" }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginBottom: "20px",
            fontFamily: "'Pacifico', cursive",
            fontWeight: "bold",
            fontStyle: "italic",
            color: "white"
          }}
        >
          Be the Reason Someone Breathes Again
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {data.length > 0 ? (
            data.map((donor) => (
              <Grid item xs={12} sm={6} md={4} key={donor._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {donor.organ_type} - {donor.blood_group}
                    </Typography>
                    <Typography>Donor: {donor.name}</Typography>
                    <Typography>Height: {donor.height} cm</Typography>
                    <Typography>Weight: {donor.weight} kg</Typography>
                    <Typography>Status: {donor.availability_status}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              sx={{ margin: "20px auto", fontStyle: "italic", color: "white" }}
            >
              BLOOD AND TISSUE MANAGEMENT SYSTEM
            </Typography>
          )}
        </Grid>

        {/* Info Cards */}
        <div className="organ-importance-container">
          <div className="flex-box">
            <img src="/Screenshot_2025-04-25_211308-removebg-preview.png" alt="Organ donation" className="icon-image" />
            <h2>WHAT IS ORGAN AND TISSUE DONATION?</h2>
            <p>
              Organ donation means that a person during his life time pledges that after
              his/her death, organs from his/her body can…
            </p>
          </div>

          <div className="flex-box">
            <img src="/Screenshot 2025-04-25 212459-Photoroom.png" alt="Transplantation" className="icon-image" />
            <h2>WHAT IS TRANSPLANTATION?</h2>
            <p>
              Transplantation of human cells, tissues or organs saves many lives and
              restores essential functions where no alternatives…
            </p>
          </div>

          <div className="flex-box">
            <img src="/Screenshot_2025-04-25_213155-removebg-preview.png" alt="Who can donate" className="icon-image" />
            <h2>WHO CAN DONATE?</h2>
            <p>
              Any person not less than 18 years of age, who voluntarily authorizes the
              removal of any of his organ and/or tissue…
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
