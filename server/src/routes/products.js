const { Router } = require("express");
const products = require("../data/productsData.json");

const router = Router();

router.get("/", (req, res, next) => {
	try {
		res.send(products);
	} catch (error) {
		res.status(500).send("Internal Server Error");
	}
});

router.post("/", (req, res) => {
	try {
		const productId = products.length + 1;
		products.push({ ...req.body, productId });
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500).send("Internal Server Error");
	}
});

router
	.route("/:productId")
	.put((req, res) => {
		try {
			console.log(req.body);
			const { productId } = req.params;
			const productIndex = products.findIndex(
				(item) => item.productId === parseInt(productId)
			);

			if (productIndex !== -1) {
				const updatedProduct = { ...products[productIndex], ...req.body };
				products[productIndex] = updatedProduct;

				return res.send(updatedProduct);
			}
			return res.status(404).send("Item not found");
		} catch (error) {
			res.status(404).send(error.message);
		}
	})
	.delete((req, res) => {
		try {
			const { productId } = req.params;
			const productIndex = products.findIndex(
				(item) => item.productId === parseInt(productId)
			);

			if (productIndex !== -1) {
				products.splice(productIndex, 1);

				// Update IDs of remaining items
				products.forEach((item, index) => {
					item.productId = index + 1;
				});

				return res.sendStatus(204);
			}
			return res.status(404).send("Item not found");
		} catch (error) {
			res.status(404).send(error.message);
		}
	});

module.exports = router;
