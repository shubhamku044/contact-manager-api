const express = require("express");
const contactRouter = express.Router();
const {
	getContacts,
	updateContact,
	getContact,
	createContacts,
	deleteContact,
} = require("../controllers/contactController");

contactRouter.route("/").get(getContacts).post(createContacts);

contactRouter
	.route("/:id")
	.get(getContact)
	.put(updateContact)
	.delete(deleteContact);

module.exports = contactRouter;
