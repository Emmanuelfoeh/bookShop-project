import inquirer from "inquirer";
import { db } from "../server/src/config/db.config";
import { Users } from "../server/src/model/user/user.model";

import dotenv from "dotenv";
dotenv.config({ path: "../server/.env" });

// MongoDB Connection
db.then(() => console.log("Connected to MongoDB...")).catch((err) =>
  console.error("Could not connect to MongoDB...", err)
);

const questions = [
  {
    type: "input",
    name: "username",
    message: "Enter username:",
    validate: function (value) {
      var pass = value.match(/^[a-zA-Z0-9]+$/i);
      if (pass) {
        return true;
      }
      return "Please enter a valid username (alphanumeric characters only).";
    },
  },
  {
    type: "input",
    name: "email",
    message: "Enter user email:",
    validate: function (value) {
      var pass = value.match(/\S+@\S+\.\S+/);
      if (pass) {
        return true;
      }
      return "Please enter a valid email.";
    },
  },
  {
    type: "password",
    name: "password",
    message: "Enter password:",
    validate: function (value) {
      if (value.length < 6) {
        return "Password should be at least 6 characters.";
      }
      return true;
    },
  },
];
inquirer.prompt(questions).then((answers) => {
  const newUser = new Users({
    userName: answers.username,
    email: answers.email,
    password: answers.password,
    role: "Admin",
  });
  newUser
    .save()
    .then(() => {
      console.log("User registered successfully.");
      process.exit();
    })
    .catch((err) => {
      console.error("Error registering user:", err.message);
      process.exit(1);
    });
});
