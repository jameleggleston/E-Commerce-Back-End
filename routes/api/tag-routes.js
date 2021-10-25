const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// Route to get all tags in database
router.get('/', async (req, res) => {
  // Try/Catch used in order to catch errors in promises that are using await
  try {
    // Create variable that contains all tags using the findAll method in the sequelize library
    const tagsData = await Tag.findAll({
      // Use include in order to return Products that apply to tag through the ProductTag model
      include: [{ model: Product, through: ProductTag, as: 'taggedProducts' }]
    });

    // If there are no errors return a status of 200 and the tags data in json format
    res.status(200).json(tagsData);
    // If there are any errors they will be in the catch, a 500 status code is returned aswell as the error
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to find a single tag by its 'id' value
router.get('/:id', async (req, res) => {
  try {
    // Using the findByPk method in the sequelize library return a single tag based on its id value using the req.params.id to define that id value
    const singleTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'taggedProducts' }]
    });

    // If there is no tag with the id specified in the req.params.id return a 404 status code and a json format message
    if (!singleTagData) {
      res.status(404).json({ message: 'No tag found with this id.' });
      return;
    }

    res.status(200).json(singleTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new tag
router.post('/', async (req, res) => {
  try {
    // Use the create method in the sequelize library and defining the body of the new tag as the req.body
    const newTag = await Tag.create(req.body);

    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to update a single tag based on its 'id' value
router.put('/:id', async (req, res) => {
  try {
    // Using the update method in the sequelize library define which fields can be updated
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        // A where clause is given in order to define which specific tag to update
        where: {
          // The where is set to the req.params.id
          id: req.params.id
        }
      }
    );

    res.status(201).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a single tag based on its 'id' value
router.delete('/:id', async (req, res) => {
  try {
    // Similar to the update method, set a where clause to define which tag to delete using the destroy method in the sequelize library
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedTag) {
      res.status(404).json({ message: 'There is no tag with that id' });
      return;
    }

    res.status(200).json(deletedTag);
  } catch (error) {
    res.status(500).json(err);
  }
});

// Export the router so all the routes can be used in the index
module.exports = router;
