import express from "express";
import { UserControllers } from "../../controllers/user/user.controller";
import { hashPasswordMiddleware } from "../../utils/security/hashPwd";

//initiating the router
export const userRouter = express.Router();

const { addUser, Login, deleteUser, getUser, getUsers, updateUser } =
  new UserControllers();

//add user route
userRouter.post("/", hashPasswordMiddleware, addUser);
userRouter.post("/login", Login);

//get users
userRouter.get("/", getUsers);

//get single user
userRouter.get("/:id", getUser);

//update a user
userRouter.put("/:id", updateUser);

//delete a user
userRouter.delete("/:id", deleteUser);
