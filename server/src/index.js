const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRouter = require("./routes/products");
const dotenv = require("dotenv");
const e = require("cors");
dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routing
app.use("/api/products", productRouter);

// Error handling middleware
app.use((req, res) => {
	res.json({ error: "Page Not found" });
});

// Starting server

const main = (res, req) => {
	try {
		app.listen(PORT, () =>
			console.log(`Web server listening on port ${PORT}...`)
		);
	} catch (error) {
		res.sendStatus(500);
	}
};

main();
