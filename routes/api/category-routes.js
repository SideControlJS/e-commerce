const router = require('express').Router();
const { Category, Product } = require('../../models');

// error handling middleware
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);


// The `/api/categories` endpoint


// GET all categories
router.get('/', asyncHandler(async (req, res) => {
  const categories = await Category.findAll({
    include: [Product],
  });
  res.json(categories);
}));

// GET one category by its 'id' value
router.get('/:id', asyncHandler(async (req, res) => {
  const category = await Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  });
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: 'Category not found!'});
  }
}));

// POST a new category

/* PAYLOAD EXAMPLE FORMAT TO POST A NEW CATEGORY
{
  "category_name": "Jackets"
}
*/
router.post('/', asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
}));


// PUT to update a category by its 'id' value
router.put('/:id', asyncHandler(async (req, res) => {
  const [affectedRows] = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (affectedRows > 0) {
    res.status(200).json({ message: 'Category update' });
  } else {
    res.status(404).json({ message: 'Category not fount' });
  }
}));

// DELETE a category by its 'id' value
router.delete('/:id', asyncHandler(async (req, res) => {
  const deleted = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (deleted) {
    res.status(200).json({ message: 'Category deleted!'});
  } else {
    res.status(404).json({ message: 'Category not found!'});
  }
}));


// General error handler
router.use((err, req, res, next) => {
  console.errot(err);
  res.status(500).json({
    message: 'An error occurred! :(',
    error: err.message
  });
});


module.exports = router;


