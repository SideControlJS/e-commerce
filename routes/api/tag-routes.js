const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Middleware to handle exceptions inside of async express routes and passing them to the express error handlers
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// /api/tags endpoint

//GET all tags
router.get('/', asyncHandler(async (req, res) => {
  const tags = await Tag.findAll({
    include: [{
      model: Product,
      through: ProductTag,
    }],
  });
  res.status(200).json(tags);
}));


//GET a single tag by its ID
router.get('/:id', asyncHandler(async (res, req) => {
  const tag = await Tag.findAll({
    where: { id: req.params.id },
    include: [{
      model: Product,
      through: ProductTag,
    }],
  });
  if (tag) {
    res.status(200).json(tag);
  } else {
    res.status(404).json({ message: 'Tag not found! :('});
  }
}));


//POST a new tag
// ADD IN EXAMPLE PAYLOAD

router.post('/', asyncHandler(async (req, res) => {
  const tag = await Tag.create(req.body);
  res.status(201).json(tag);
}));


//PUT to update a tage by its ID
router.get('/:id', asyncHandler(async (req, res) => {
  const [affectedRows] = await Tag.update(req.body, {
    where: { id: req.params.id },
  });
  
  if (affectedRows > 0) {
    res.status(200).json({ message: 'Tag updated' });
  } else {
    res.status(404).json({ message: 'Tag not fount! :('});
  }
}));


//DELETE a tag by its ID
router.delete('/:id', asyncHandler(async (req, res) => {
  const deleted = await Tag.destroy({
    where: { id: req.params.id },
  });

  if (deleted) {
    res.status(200).json({ message: 'Tag deleted!'});
  } else {
    res.status(404).json({ message: 'Tag not fount! :('});
  }
}));


//General error handler
router.use((err, req, res, next) => {
  console.errot(err);
  res.status(500).json({
    message: 'An error occurred! :(',
    error: err.message
  });
});















/*
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tags) => res.status(200).json(tags))
    .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find a tag by id
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});

router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});
*/


module.exports = router;
