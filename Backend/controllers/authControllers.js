const User = require('../models/user');

// ✅ SIGNUP Controller
const signupUser = async (req, res) => {
    console.log("BODY RECEIVED:", req.body);

  try {
    const { name, email, password, city } = req.body;

    console.log("📩 Incoming signup data:", req.body);

    if (!name || !email || !password || !city) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const user = new User({ name, email, password, city });
    await user.save();

    console.log(" created:", user);
    res.json({ message: "Signup successful!", user });

  } catch (error) {
    console.error(" Signup Error:", error);
    res.status(500).json({ error: "Signup failed!", details: error.message });
  }
};

// ✅ LOGIN Controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📩 Login request:", req.body);

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful!", user });

  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Login failed!", details: error.message });
  }
};

module.exports = { signupUser, loginUser };
