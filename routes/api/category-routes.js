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

router.post('/', async(req, res) => {
  // create a new category
  try {
    // Set a variable that contains the new category information through the use of the create mehtod in sequelize and the req.body
    const newCategoryData = await Category.create(req.body);
    res.status(201).json(newCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    // Define a variable containing the updated category information through the use of the update sequelize method and defining which files can be update
    const updatedCategory = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        // The where is defined as the req.params.id in order to specify which category to update
        where: {
          id: req.params.id
        }
      }
    );
      if(!updatedCategory){
        res.status(404).json({message: 'No category found with this id.'});
        return;
      }

    res.status(201).json(updatedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    // Similar to the update method in sequelize you define a where object in the destroy method in sequelize and that where being defined as the req.params.id
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!deletedCategory){
      res.status(404).json({message: "No category found with this id."});
      return;
    }
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
