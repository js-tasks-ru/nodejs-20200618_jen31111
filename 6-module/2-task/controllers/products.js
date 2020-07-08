const mongoose = require('mongoose');
const Product = require('../models/Product');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const subCat = ctx.request.query.subcategory;

  if (!!subCat) {
    const productsBySubCat = await Product.find({subcategory: subCat});
    ctx.body = {
      products: productsBySubCat.map((item) => {
        return {
          id: item._id,
          title: item.title,
          images: item.images.map((image) => {
            return `${image}`;
          }),
          category: item.category,
          subcategory: item.subcategory,
          price: item.price,
          description: item.description,
        };
      }),

    };
  } else {
    const products = await Product.find({});
    ctx.body = {
      products: products.map((item) => {
        return {
          id: item._id,
          title: item.title,
          images: item.images.map((image) => {
            return `${image}`;
          }),
          category: item.category,
          subcategory: item.subcategory,
          price: item.price,
          description: item.description,
        };
      }),

    };
  }
  // console.log(Products);
  if (!ctx.body.products) {
    ctx.throw(404);
  }
  next();
};

module.exports.productList = async function productList(ctx, next) {
  next();
};

module.exports.productById = async function productById(ctx, next) {
  if (!mongoose.isValidObjectId(ctx.params.id)) {
    ctx.throw(400);
  } else {
    const id = new mongoose.Types.ObjectId(ctx.params.id);
    const product = await Product.findOne(id);

    if (!product) {
      ctx.throw(404);
    }

    ctx.body = {
      product: {
        id: product._id,
        title: product.title,
        images: product.images,
        category: product.category,
        subcategory: product.subcategory,
        price: product.price,
        description: product.description,
      },
    };
    // console.log(ctx.body.product);
  }
  next();
};

