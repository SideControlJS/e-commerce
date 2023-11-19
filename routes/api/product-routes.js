const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


// Middleware to handle exceptions inside of async express routes and pass them to the express error handlers
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);


// The `/api/products` endpoint


//GET all products
router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    include: [Category, { model: Tag, through: ProductTag }],
  });
  res.json(products);
}));


//GET one product by its ID
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    where: { id: req.params.id },
    include: [Category, { model: Tag, through: ProductTag }],
  });

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found! :('});
  }
}));


//POST a new product
router.post('/', asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  if (req.body.tagIds && req.body.tagIds.length) {
    const productTagIdArr = req.body.tagIds.map((tag_id) => ({
      product_id: product.id,
      tag_id,
    }));
    await ProductTag.bulkCreate(productTagIdArr);
  }
  res.status(200).json(product);
}));


//PUT to update a product by its ID

/*EXAMPLE PUT PAYLOAD:

{
  "product_name": "Plain T-Shirt",
  "price": 10.99,
  "stock": 10,
  "category_id": 2,
  "tagIds": [3, 4]
}

*/ 
router.put('/:id', asyncHandler(async (req, res) => {
  const [updatedRows] = await Product.update(req.body, {
    where: { id: req.params.id },
  });

  if (updatedRows) {
    const productTags = await ProductTag.findAll({
      where: { product_id: req.params.id },
    });

    // Get list of current tag IDs
    const productTagIds = productTags.map(({ tag_id }) => tag_id);

    // Determine which tags need to be added/removed
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => ({ product_id: req.params.id, tag_id }));

    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    // Execute add/remove operations
    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

    res.json({ message: 'Product updated' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
}));


//DELETE a product by its ID
router.delete('/:id', asyncHandler(async (req,res) => {
  const deleted = await Product.destroy({
    where: { id: req.params.id },
  });

  if (deleted) {
    res.status(200).json({ message: 'Product deleted' });
  } else {
    res.status(404).json({ message: 'Product not found! :('});
  }
}));


//Generic error handler
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'An error occurred! :(', error: err.message });
});

module.exports = router;








