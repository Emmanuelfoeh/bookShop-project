import express from "express";
import cors from "cors";
const app = express();

//middlewares
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
