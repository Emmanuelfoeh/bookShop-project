import { UserSchemaValidate } from "../../model/user/user.model";
import { Request, Response } from "express";
import { UserServices } from "../../services/user/user.service";

const { createUser, logIn, deleteUser, getUser, getUsers, updateUser } =
  UserServices;

export class UserControllers {
  //add User controller
  addUser = async (req: Request, res: Response) => {
    //data to be saved in database
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      userName: req.body.userName,
      role: req.body.role,
      password: req.body.password,
    };

    //validating the request
    const { error, value } = UserSchemaValidate.validate(data);

    if (error) {
      res.send(error.message);
    } else {
      const user = await createUser(value);
      res.status(201).send(user);
    }
  };

  // Login

  Login = async (req: Request, res: Response) => {
    const loginData = {
      username: req.body.userName || req.body.email,
      password: req.body.password,
    };
    try {
      const user = await logIn(loginData);
      res.send(user);
    } catch (error: any) {
      res.status(401).send({ error: "Login failed. Incorrect credentials." });
    }
  };

  //get all Users
  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await getUsers();
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  //get a single user
  getUser = async (req: Request, res: Response) => {
    //get id from the parameter
    const id = req.params.id;
    try {
      const user = await getUser(id);
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  };

  //update User
  updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const user = await updateUser(id, req.body);
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  };

  //delete a User
  deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await deleteUser(id);
      res.send("User deleted successfully");
    } catch (error) {
      res.send(error);
    }
  };
}

