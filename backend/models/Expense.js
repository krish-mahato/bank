const mongoose = require('mongoose');

// Define the Expense schema
const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

// Create the Expense model
const Expense = mongoose.model('Expense', ExpenseSchema);

// Export the model
module.exports = Expense;
