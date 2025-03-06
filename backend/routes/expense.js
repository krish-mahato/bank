const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();

router.post('/add', async (req, res) => {
  const { user, amount, category } = req.body;
  try {
    const expense = new Expense({ user, amount, category });
    await expense.save();
    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.params.userId });
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});





module.exports = router;
