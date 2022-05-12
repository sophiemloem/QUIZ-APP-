
require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 3000
app.use(cors()); // To allow any origin
app.use(express.json()); // To read json data in request body


app.listen(port,console.log("app run on http://localhost:" +port));

app.use(express.static("public"));

//  todo : Define dynamic routes 
const itemRoutes = require("./routes/items_routes");

app.use("/",itemRoutes);

const userplayQ = require("./routes/userAcc");

app.use("/log",userplayQ);




