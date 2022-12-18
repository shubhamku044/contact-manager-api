const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const contactRouter = require("./routes/contactRoutes");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config({
	path: ".env",
});

connectDb();
const app = express();

const port = process.env.PORT || 5002;

app.use(express.json());
app.use("/api/contacts", contactRouter);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
