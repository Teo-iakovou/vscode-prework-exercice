const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "aileen.labadie90@ethereal.email",
    pass: "Rq6cMaJ3MWUM3KcrD6",
  },
});

// Function to send fake verification email
const sendVerificationEmail = async (user, token) => {
  const verificationUrl = `http://localhost:5000/api/auth/verify?token=${token}`;
  console.log(`Verification email sent to ${user.email}: ${verificationUrl}`);

  const mailOptions = {
    from: '"CodeCLA" <no-reply@codecla.com>',
    to: user.email,
    subject: "Verify Your Email - CodeCLA",
    html: `<p>Hello ${user.firstName},</p><p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Fake email sent:", nodemailer.getTestMessageUrl(info));
};

// Function to register a user
const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
  role,
  description,
}) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    description,
    isVerified: false,
  });

  await newUser.save();

  // Generate verification token
  const token = jwt.sign(
    { id: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  await sendVerificationEmail(newUser, token);

  return { message: "Account created. Please verify your email." };
};
const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  if (!user.isVerified) throw new Error("Please verify your email first");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
};

module.exports = { registerUser, loginUserService };
