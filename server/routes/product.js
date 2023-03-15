const express = require("express");
const {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} = require("../controllers/product");

const router = express.Router();
const upload = require("../middleware/upload");
const { protect } = require("../middleware/auth");

router
  .route("/")
  .post(protect, upload.single("file"), createProduct)
  .get(getProducts);
router
  .route("/:id")
  .get(getProduct)
  .put(protect, upload.single("file"), updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
