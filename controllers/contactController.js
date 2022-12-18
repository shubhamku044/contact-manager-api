const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route GET /api/contacts
// @access Public
const getContacts = asyncHandler(async (req, res) => {
	const contacts = await Contact.find();
	res.status(200).json(contacts);
});

// @desc Create new contact
// @route POST /api/contacts
// @access Public
const createContacts = asyncHandler(async (req, res) => {
	const { name, email, phone } = req.body;
	if (!name || !email || !phone) {
		res.status(400).json({
			message: "Please enter all fields",
		});
	}
	const contact = await Contact.create({
		name,
		email,
		phone,
	});

	res.status(201).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);

	if (!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}

	res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);

	if (!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}

	const updatedContact = await Contact.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);

	res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);

	if (!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}
	await contact.remove();

	res.status(200).json({
		message: `Delete route for id: ${req.params.id}`,
	});
});

module.exports = {
	createContacts,
	getContacts,
	updateContact,
	getContact,
	deleteContact,
};
