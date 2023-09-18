import express from "express";
import { PORT, mongoDB } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

//Allow all origin with default cors
app.use(cors());

//Allow custom origin
// app.use(
//   cors({
//     origin: "http://locahost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Learn MERN");
});

app.use("/books", bookRoute);

mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`App is listing to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
