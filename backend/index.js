const express = require("express");
const cors = require("cors");
const userRouter  = require("./routes/user");
const adminRouter  = require("./routes/admin");

const app = express();

app.use(cors()); // Cross-Origin Resource Sharing
app.use(express.json()); //let you pass the json objects in post 

app.use("/api/v1", userRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(3000);
