const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		res.status(400);
		throw new Error("Please enter all fields");
	}
	const userAvailable = await User.findOne({ email });

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await User.create({
		username,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			email: user.email,
		});
	} else {
		res.status(400);
		throw new Error("user data not valid");
	}

	if (userAvailable) {
		throw new Error("User already registered");
	}

	res.json({
		message: "Register a user",
	});
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		throw new Error("All fields are mandatory!");
	}

	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		const accessToken = jwt.sign(
			{
				user: {
					username: user.username,
					email: user.email,
					id: user.id,
				},
			},
			process.env.ACCESS_TOKEN_SECRET
		);

		res.status(200).json({
			accessToken,
		});
	} else {
		res.status(401);
		throw new Error("Email or password not valid");
	}
	res.json({
		message: "Login a user",
	});
});

const getCurrentUser = asyncHandler(async (req, res) => {
	res.json({
		message: "Get current user",
	});
});

module.exports = { registerUser, getCurrentUser, loginUser };
