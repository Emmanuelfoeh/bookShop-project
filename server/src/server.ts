import http from "http";
import { db } from "./config/db.config";
import dotenv from "dotenv";
import app from "./app";
import { userRouter } from "./routes/user/user.route";
import { bookRouter } from "./routes/book/book.route";
import { orderRouter } from "./routes/order/order.route";

dotenv.config();

const PORT = process.env.PORT || 8090;
const server = http.createServer(app);

//routes
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);

//db connection then server connection

db.then(() => {
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
});
