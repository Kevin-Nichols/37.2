const Item = require('../item');
const express = require('express');
const router = express.Router();

// GET /list - renders a list of shopping items.
router.get('', (req, res, next) => {
  try{
    return res.json({list: Item.getAllItems() });
  } catch (e) {
    return next(e)
  }
});

// POST /list - accepts JSON data and adds it to the shopping list.
router.post('', (req, res, next) => {
  try{
    let newItem = new Item(req.body.name, req.body.price);
    return res.json({list: newItem});
  } catch (e) {
    return next(e)
  }
});

// GET /list/:name - displays a single item’s name and price.
router.get('/:name', (req, res, next) => {
  try {
    let existingItem = Item.getItem(req.params.name);
    return res.json({list:existingItem});
  } catch(e){
    return next(e)
  }
});

// PATCH /list/:name, modifies a single item’s name and/or price.
router.patch('/:name', (req, res, next) => {
  try {
    let existingItem = Item.updateItem(req.params.name, req.body);
    return res.json({ list: existingItem });
  } catch (e) {
    return next(e)
  }
});

// DELETE /list/:name - deletes a specific item from the array.
router.delete('/:name', (req, res, next) => {
  try {
    Item.removeItem(req.params.name);
    return res.json({message:`${req.params.name} Has Been Deleted`});
  } catch (e) {
    return next(e)
  }
});

module.exports = router;