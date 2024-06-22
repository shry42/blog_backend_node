const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Model/user");

const adminCreate = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    await User.create(admin);
    res
      .status(201)
      .json({ message: "User created successfully", status: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).send({ status: false, message: `Email is required` });
      return;
    }

    if (!password) {
      res.status(400).send({ status: false, message: `Password is required` });
      return;
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      res
        .status(401)
        .send({ status: false, message: `Invalid login credentials` });
      return;
    }

    let hashedPassword = user.password;
    const encryptedPassword = await bcrypt.compare(password, hashedPassword); 

    if (!encryptedPassword)
      return res
        .status(401)
        .send({
          status: false,
          message: `Login failed! password is incorrect.`,
        });

    const token = jwt.sign(
      {
        userId: user._id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 18000,
      },
      process.env.JWT_SECRET_KEY
    );

    res.header("token", token);
    res
      .status(200)
      .send({
        status: true,
        message: `user login successfully`,
        token: token,
        userDetails: user,
      });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  adminCreate,
  loginUser,
}