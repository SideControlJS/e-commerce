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




// PREVIOUS CODE TO KEEP IN CASE ABOVE CODE HAS ISSUES


// router.get('/', (req, res) => {
//   Category.findAll({
//     include: [Product],
//   })
//     .then((categories) => res.json(categories))
//     .catch((err) => res.status(500).json(err));
// });

// router.get('/:id', (req, res) => {
//   // find 1 category
//   Category.findOne({
//     where: {
//       id: req.params.id,
//     },
//     include: [Product],
//   })
//     .then((category) => res.json(category))
//     .catch((err) => res.status(400).json(err));
// });

// router.post('/', (req, res) => {
//   Category.create(req.body)
//     .then((category) => res.status(200).json(category))
//     .catch((err) => res.status(400).json(err));
// });

// router.put('/:id', (req, res) => {
//   Category.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((category) => res.status(200).json(category))
//     .catch((err) => res.status(400).json(err));
// });

// router.delete('/:id', (req, res) => {
//   Category.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((category) => res.status(200).json(category))
//     .catch((err) => res.status(400).json(err));
// });


