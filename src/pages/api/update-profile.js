import { connectDB } from "@/lib/db";
import User from "@/models/user";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ 
      success: false, 
      message: "Method not allowed" 
    });
  }

  try {
    const { userId, name, phone, address } = req.body;

    // Validation
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required"
      });
    }

    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: "Name must be at least 2 characters long"
      });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: name.trim(),
        ...(phone && { phone: phone.trim() }),
        ...(address && { address: address.trim() })
      },
      { 
        new: true,
        runValidators: true 
      }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("Profile update error:", error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: errors.join(', ')
      });
    }

    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}