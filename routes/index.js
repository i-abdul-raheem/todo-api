const router = require('express').Router();
const model = require('../model');

router.get('/', async (req, res) => {
  try {
    const data = await model.find({});
    res.status(200).json({ status: 200, data });
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ status: 500, message: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await model.findOne({ _id: req.params.id });
    if (!data) {
      return res
        .status(404)
        .json({ status: 404, message: 'Item not found', data: {} });
    }
    res.status(200).json({ status: 200, data });
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ status: 500, message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res
        .status(405)
        .json({ status: 405, message: 'Title is required' });
    }
    const newItem = new model({ title });
    await newItem.save();
    res.status(201).json({ status: 201, message: 'Item added' });
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ status: 500, message: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res
        .status(405)
        .json({ status: 405, message: 'Title is required' });
    }
    const update = await model.updateOne(
      { _id: req.params.id },
      { $set: { title } }
    );
    if (update.modifiedCount < 1) {
      return res.status(404).json({ status: 404, message: 'Item not found' });
    }
    return res.status(200).json({ status: 200, message: 'Item updated' });
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ status: 500, message: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteItem = await model.deleteOne({ _id: req.params.id });
    //   if (deleteItem.deleteCount < 1) {
    //     return res.status(404).json({ status: 404, message: 'Item not found' });
    //   }
    return res
      .status(200)
      .json({ status: 200, message: 'Item deleted', data: deleteItem });
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ status: 500, message: 'Internal Server Error' });
  }
});

module.exports = router;
