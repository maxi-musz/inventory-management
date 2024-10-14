import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import colors from "colors"

// ROUTE IMPORTS 

// CONFIGURATIONS
dotenv.config()
const app = express()
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
    console.log(colors.rainbow("Inventory api is working..."))
    res.send("Inventory api is working...")
})



// SERVER
const port = process.env.PORT || 2000
app.listen(port, () => {
    console.log(colors.bgMagenta(`Server running on port: ${port}`))
})