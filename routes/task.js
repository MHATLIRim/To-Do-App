const express = require('express');
const router = express.Router();
const { Task, taskValidationSchema } = require('../models/Task');

// Route to add a task
router.post('/add', async (req, res) => {
    try {
        await taskValidationSchema.validate(req.body);
        const { title, description, dueDate, completed } = req.body;
        const newTask = new Task({ title, description, dueDate, completed });
        await newTask.save();
        res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Error adding task', error });
    }
});

// Route to get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
});

// Route to delete a task
router.delete('/delete/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
});

// Route to update a task
router.put('/edit/:id', async (req, res) => {
    try {
        await taskValidationSchema.validate(req.body);
        const { title, description, dueDate, completed } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate, completed }, { new: true });
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
});

// Route to filter  tasks 
router.get('/filterByDescription/:description', async (req, res) => {
    try {
        const tasks = await Task.find({ description: req.params.description });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error filtering tasks', error });
    }
});

// Route to list unfinished tasks
router.get('/incomplete', async (req, res) => {
    try {
        const incompleteTasks = await Task.find({ completed: false });
        res.status(200).json(incompleteTasks);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des tâches', error: err });
    }
});

// Route to get the count of available tasks
router.get('/completedCount', async (req, res) => {
    try {
        const completedTasksCount = await Task.countDocuments({ completed: true });
        res.status(200).json({ count: completedTasksCount });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching completed tasks count', error });
    }
});

module.exports = router;