const router = require('express').Router();
const { AccessDeniedError } = require('sequelize');
const { Product, Category, Tag, ProductTag } = require('../../models');


// Middleware to handle exceptions inside of async express routes and pass them to the express error handlers
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

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




































// The `/api/products` endpoint


// /* 
// // get all products
// router.get('/', (req, res) => {
//   Product.findAll({
//     include: [
//       Category,
//       {
//         model: Tag,
//         through: ProductTag,
//       },
//     ],
//   })
//     .then((products) => res.json(products))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// // get one product
// router.get('/:id', (req, res) => {
//   Product.findOne({
//     where: {
//       id: req.params.id,
//     },
//     include: [
//       Category,
//       {
//         model: Tag,
//         through: ProductTag,
//       },
//     ],
//   })
//     .then((products) => res.json(products))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

// // creat new product
// router.post('/', (req, res) => {
//   /* req.body should look like this...
// {
//   "product_name": "Basketball",
//   "price": 200.00,
//   "stock": 2,
//   "tagIds": [1, 2, 3, 4]
// }
//   */
//   Product.create(req.body)
//     .then((product) => {
//       // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//       if (req.body.tagIds && req.body.tagIds.length) {
//         const productTagIdArr = req.body.tagIds.map((tag_id) => {
//           return {
//             product_id: product.id,
//             tag_id,
//           };
//         });
//         return ProductTag.bulkCreate(productTagIdArr);
//       }
//       // if no product tags, just respond
//       res.status(200).json(product);
//     })
//     .then((productTagIds) => res.status(200).json(productTagIds))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

// // update product
// router.put('/:id', (req, res) => {
//   // update product data
//   Product.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((product) => {
//       if (req.body.tagIds && req.body.tagIds.length) {

//         ProductTag.findAll({
//           where: { product_id: req.params.id }
//         }).then((productTags) => {
//           // create filtered list of new tag_ids
//           const productTagIds = productTags.map(({ tag_id }) => tag_id);
//           const newProductTags = req.body.tagIds
//             .filter((tag_id) => !productTagIds.includes(tag_id))
//             .map((tag_id) => {
//               return {
//                 product_id: req.params.id,
//                 tag_id,
//               };
//             });

//           // figure out which ones to remove
//           const productTagsToRemove = productTags
//             .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//             .map(({ id }) => id);
//           // run both actions
//           return Promise.all([
//             ProductTag.destroy({ where: { id: productTagsToRemove } }),
//             ProductTag.bulkCreate(newProductTags),
//           ]);
//         });
//       }

//       return res.json(product);
//     })
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });

// router.delete('/:id', (req, res) => {
//   Product.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((products) => {
//       console.log(products);
//       res.json(products);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

module.exports = router;
