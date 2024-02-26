import argon2 from "argon2";
import { Request, Response } from "express";



export async function hashPassword(password: string) {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error hashing password");
  }
}

// Middleware to hash the password before saving to the database
 export async function hashPasswordMiddleware(req : Request, res:Response, next:any) {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    const hashedPassword = await argon2.hash(password);
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}