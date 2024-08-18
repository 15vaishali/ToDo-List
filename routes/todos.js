const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Create a new todo
router.post('/', async (req, res) => {
    try {
        const newTodo = new Todo({
            title: req.body.title
        });
        const savedTodo = await newTodo.save();
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.json(savedTodo);
    } catch (err) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.status(500).json({ message: err.message });
    }
});

// Read all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.json(todos);
    } catch (err) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.status(500).json({ message: err.message });
    }
});

// Update a todo
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { completed: req.body.completed },
            { new: true }
        );
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.json(updatedTodo);
    } catch (err) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.status(500).json({ message: err.message });
    }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        const removedTodo = await Todo.findByIdAndDelete(req.params.id);
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.json(removedTodo);
    } catch (err) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
