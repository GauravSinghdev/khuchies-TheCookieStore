const express = require("express");
const cors = require("cors");
const mainRouter  = require("./routes/user");

const app = express();

app.use(cors()); // Cross-Origin Resource Sharing
app.use(express.json()); //let you pass the json objects in post 

app.use("/api/v1", mainRouter);

app.listen(3000);
