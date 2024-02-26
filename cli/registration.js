import inquirer from "inquirer";

import dotenv from "dotenv";
dotenv.config({ path: "../server/.env" });

// MongoDB Connection
// db.then(() => console.log("Connected to MongoDB...")).catch((err) =>
//   console.error("Could not connect to MongoDB...", err)
// );

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
  const postData = {
    userName: answers.username,
    email: answers.email,
    password: answers.password,
    role: "Admin",
  };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  };

  fetch("http://localhost:8088/api/v1/users", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    })
    .then((data) => {
      console.log("User registered successfully.", data);
      process.exit();
    })
    .catch((error) => {
      console.error("Error registering user:", error.message);
      process.exit(1);
    });
});
