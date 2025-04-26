import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/donors/available")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching donors:", err));
  }, []);

  return (
    <div  style={{
      backgroundColor:"rgb(41, 42, 47)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      width: "100%",
    }}>
      {/* Top Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          🩸🫀 GiftSync - Admin Panel
          </Typography>
          <div>
            <Button color="inherit" onClick={() => navigate("/donar-verification")}>
              Donor Verification
            </Button>
            <Button color="inherit" onClick={() => navigate("/recipient-verification")}>
              Recipient Verification
            </Button>
            <Button color="inherit" onClick={() => navigate("/")}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ marginTop: 4 }}>
       <Typography
           variant="h4"
           sx={{
             textAlign: "center",
             marginBottom: "20px",
             marginTop: "10px",
             fontFamily: "'Pacifico', cursive", // <-- Custom font
             fontWeight: "bold",
             fontStyle: "italic", // Optional: Adds a stylish feel
             color: "WHITE" // Optional: Slightly deeper tone
           }}
         >
         Your decision today can be someone’s tomorrow.
         </Typography>
       

        <Grid container spacing={2}>
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
           <Typography variant="h6" sx={{ margin: "20px auto",fontStyle: "italic" ,color: "WHITE"}}>
                         BLOOD AND TISSUE MANAGEMENT  SYSTEM
                       </Typography> 
          )}
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
        </Grid>
      </Container>
    </div>
  );
};

export default DashboardAdmin;
