const asyncHandler = require("../middleware/async");
const Product = require("../models/Product");
const upload = require("../middleware/upload");
const fs = require("fs");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Register product
// @route     POST /api/v1/product
// @access    Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const product = await Product.create({
    title,
    description: JSON.parse(description),
  });

  if (req.file) {
    //     check if file exists in public/uploads
    if (fs.existsSync(`public/uploads/${req.file.originalname}`)) {
      fs.unlink(
        `${__dirname}/../public/uploads/${req.file.originalname}}`,
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    }

    await Product.findByIdAndUpdate(product._id, {
      image: req.file.originalname,
    });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc      Get all products
// @route     GET /api/v1/product
// @access    Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    data: products,
  });
});

// @desc      Get single product
// @route     GET /api/v1/product/:id
// @access    Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc      Update product
// @route     PUT /api/v1/product/:id
// @access    Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { title, description, image } = req.body;
  if (req.file) {
    // Delete old product photo from server path: public/uploads
    fs.unlink(`${__dirname}/../public/uploads/${image}}`, (err) => {
      if (err) {
        console.error(err);
      }
    });

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description: JSON.parse(description),
        image: req.file.originalname,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      data: product,
    });
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc      Delete product
// @route     DELETE /api/v1/product/:id
// @access    Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  // Delete product photo from server path: public/uploads
  fs.unlink(`${__dirname}/../public/uploads/${product.image}}`, (err) => {
    if (err) {
      console.error(err);
    }
  });

  product.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
