import { Users } from "../../model/user/user.model";
import { verify } from "argon2";
import jwt from "jsonwebtoken";

const Secret = process.env.JWT_SECRET;
export class UserService {
  //add new  user to database
  async createUser(data: any) {
    try {
      const newUser = await Users.create(data);
      const { password, ...user } = newUser.toObject();
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  //get all books from the database
  async getUsers() {
    try {
      const users = await Users.find({}).select("-password");
      return users;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  //get a single book
  async getUser(id: string) {
    try {
      const user = await Users.findById({ _id: id }).select("-password");
      if (!user) {
        throw new Error(`user with id: ${id} not available`);
      }
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  //update a book
  async updateUser(id: string, data: any) {
    try {
      const user = await Users.findByIdAndUpdate({ _id: id }, data, {
        new: true,
      });
      if (!user) {
        return `book with id: ${id} not available`;
      }
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  //delete a book by using the find by id and delete
  async deleteUser(id: string) {
    try {
      const user = await Users.findByIdAndDelete(id);
      if (!user) {
        return `book with id: ${id} not available`;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async logIn(data: any) {
    const { username, password } = data;

    try {
      const user = await Users.findOne({
        $or: [{ userName: username }, { email: username }],
      });

      if (!user) {
        throw new Error("Incorrect credentials");
      }
      let hashedPassword: any = user?.password;

      if (await verify(hashedPassword, password)) {
        // console.log("the login user", user);
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          `${Secret}`,
          {
            expiresIn: "360000",
          }
        );
        return [{ user }, { token }];
      }
      throw new Error("Incorrect credentials");
    } catch (error: any) {
      throw new Error(`${error}`);
    }
  }
}

//export the class
export const UserServices = new UserService();
