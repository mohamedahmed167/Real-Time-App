import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";




export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    if (password.length < 6) {
      throw new ApiError(400, "password must be at least 6 characters");
    }

    const existEmail = await UserModel.findOne({
      $or: [
        { username: username.trim() },
        { email: email.trim().toLowerCase() },
      ],
    });

    if (existEmail) {
      throw new ApiError(400, "username or email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    const userObject = user.toObject();

    delete (userObject as Partial<typeof userObject>).password;

    res.status(200).json({
      message: "user register successfully",
      user: userObject,
    });
  } catch (error) {
    console.log("Registration error", error);

    throw new ApiError(500, "Error in Registration ");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
      throw new ApiError(404, "email and password are required");
    }

    const user = await UserModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      throw new ApiError(404, "user is not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ApiError(400, "password or email is uncorrect");
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.JWT__SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    const userObject = user.toObject();

    delete (userObject as Partial<typeof userObject>).password;

    res.status(200).json({
      sucess: true,
      message: "successfully Login in Real time app",
      user: userObject,
      token: token,
    });
  } catch (error) {
    console.log("error in login", error);
        throw new ApiError(500, "error in Login");
  }
};
