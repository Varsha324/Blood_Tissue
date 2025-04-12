import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, Grid, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/donors/available")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching donors:", err));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 250, boxSizing: "border-box", backgroundColor: "#1976d2", color: "#fff" }
        }}
      >
        <Typography variant="h5" style={{ padding: "16px", fontWeight: "bold", textAlign: "center" }}>
          Dashboard
        </Typography>
        <List>
          <ListItem button onClick={() => navigate("/donar-verification")}>
            <ListItemText primary="Donar Verification" />
          </ListItem>
          <ListItem button onClick={() => navigate("/recipient-verification")}>
            <ListItemText primary="Recipient Verification" />
          </ListItem>
          <ListItem button onClick={() => navigate("/")}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Container style={{ marginLeft: 270, padding: "20px" }}>  
        <Typography variant="h4" style={{ textAlign: "center", marginBottom: "20px" }}>
          Hospital Dashboard
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
            <Typography variant="h6" style={{ margin: "20px auto" }}>
              Dwonors available
            </Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default DashboardAdmin;