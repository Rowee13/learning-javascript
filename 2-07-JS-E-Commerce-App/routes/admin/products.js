const express = require("express");
const multer = require("multer");

const productsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
const { requireTitle, requirePrice } = require("./validators");
const productsIndexTemplate = require("../../views/admin/products/index");
const productEditTemplate = require("../../views/admin/products/edit");
const { handleErrors, requireAuth } = require("./middlewares");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", requireAuth, async (req, res) => {
	const products = await productsRepo.getAll();
	res.send(productsIndexTemplate({ products }));
});

router.get("/admin/products/new", requireAuth, (req, res) => {
	res.send(productsNewTemplate({}));
});

router.post(
	"/admin/products/new",
	requireAuth,
	upload.single("image"),
	[requireTitle, requirePrice],
	handleErrors(productsNewTemplate),
	async (req, res) => {
		let image;
		if (req.file) {
			image = req.file.buffer.toString("base64");
		}
		const { title, price } = req.body;
		await productsRepo.create({ title, price, image });

		res.redirect("/admin/products");
	}
);

router.get("/admin/products/:id/edit", async (req, res) => {
	const product = await productsRepo.getOne(req.params.id);

	if (!product) {
		return res.send("Product not found");
	}

	res.send(productEditTemplate({ product }));
});

router.post("/admim/products/:id/edit", requireAuth, async (req, res) => {});

module.exports = router;
