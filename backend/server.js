const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnections");
require("dotenv").config(); 
const cors = require("cors");

connectDb();

const app = express();
const port = 5000;


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors({
    origin: 'http://localhost:3000', 
}));

app.use("/api/donors", require("./routes/donorRoutes")); 
app.use("/api/recipients", require("./routes/recipientRoutes")); 
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler); //use it when ever using the middleware

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
