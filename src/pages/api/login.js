import { connectDB } from "@/lib/db";
import User from "@/models/user";
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    // Validation
    if (!email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required"
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password"
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password"
      });
    }

    // Response without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: userResponse
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}