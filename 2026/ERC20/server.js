require("dotenv").config();
const express = require("express");
const cors = require("cors");

const tokenRoutes =  require("./routes/token");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/token", tokenRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
