import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS Policy
//Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
//Option 2: Allow Custom Origin
// app.use(
//   cors({
//     origin: "http://localhost:4000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.use("/books", booksRoute);

app.get("/", (req, res) => {
  console.log(req);
  res.status(202).send("Welcome to MERN Stack");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/BookStore")
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => console.log(`Server Running at PORT: ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
