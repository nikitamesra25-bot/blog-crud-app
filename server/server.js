const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const blogRouts = require("./routes/blogRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Blog CRUD API is running!");
});

app.use("/api/blogs", blogRouts);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})