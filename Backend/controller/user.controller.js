import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const signup = async (req, res) => {
    const { name, email, password: rawPassword } = req.body;

    if (!name || !email || !rawPassword) {
        return res.status(400).json({ message: "All details are mandatory" });
    }

    if (rawPassword.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
        const password = await bcrypt.hash(rawPassword, saltRounds);
        const user = new User({ name, email, password });
        await user.save();

        return res.status(201).json({ message: "User created successfully", user: { name, email } });
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All details are mandatory" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const { password: _, ...userWithoutPassword } = existingUser.toObject();
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
        });
        

        return res.status(200).json({
            user: userWithoutPassword,
            message: "Login successful"
        });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
    res.clearCookie('access_token');
    return res.status(200).json({ message: "Logout successful" });
};
