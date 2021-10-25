const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  try {
    const categoriesData = await Category.findAll({
      include: [{model: Product, as: 'products'}]
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  try {
    // Set a variable that contains a single Category's data using the findByPk method while also using the req.params.id 
    // as the desired category to view
    const singleCategoryData = await Category.findByPk(req.params.id,{
      include: [{model: Product, as: 'products'}]
    });

    if (!singleCategoryData) {
      res.status(404).json({messgae: 'No Category found with that id.'});
      return;
    }
    res.status(200).json(SingleCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
