const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      attributes: ["id", "tag_name"],
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
          through: ProductTag,
          as: "products",
        },
      ],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // include its associated Product data
  try {
    const tagDataById = await Tag.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
          through: ProductTag,
          as: "products",
        },
      ],
    })
    if (!tagDataById) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagDataById);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body,
      {
        where: {
          id: req.params.id,
        }
      })
    if (!updatedTag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy(

      {
        where: {
          id: req.params.id,
        },
      });

    if (!deletedTag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
