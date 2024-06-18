const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/Auth');
const addStudentRoutes = require("./routes/AddStudent");
const addCourierRoutes = require("./routes/AddCourier");

const app = express();
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log('connected to database');
})
.catch(() => {
    console.log(`couldn't connect to database`);
})

app.use("/api/auth",authRoutes);
app.use("/api/as",addStudentRoutes);
app.use("/api/ac", addCourierRoutes);

app.get("/" , (req,res) => {
    res.send("Hello Little Einteinz");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
