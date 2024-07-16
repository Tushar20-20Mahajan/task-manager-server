const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const { List, Task } = require('./db/models/index.js');

const app = express();

// Load middleware
app.use(bodyParser.json());
app.use(cors());

/* Route Handlers */

/* List Routes */
// GET All Lists
app.get('/lists', async (req, res, next) => {
    try {
        const lists = await List.find({});
        res.send(lists);
    } catch (error) {
        next(error);
    }
});

// GET Single List by ID
app.get('/lists/:id', async (req, res, next) => {
    try {
        const list = await List.findOne({ _id: req.params.id });
        res.send(list);
    } catch (error) {
        next(error);
    }
});

// POST Create New List
app.post('/lists', async (req, res, next) => {
    try {
        const newList = new List({ title: req.body.title });
        const listDoc = await newList.save();
        res.send(listDoc);
    } catch (error) {
        next(error);
    }
});

// PATCH Update List by ID
app.patch('/lists/:id', async (req, res, next) => {
    try {
        await List.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
        res.send({ message: 'PATCH Success' });
    } catch (error) {
        next(error);
    }
});

// DELETE List by ID
app.delete('/lists/:id', async (req, res, next) => {
    try {
        const removedListDocument = await List.findOneAndRemove({ _id: req.params.id });
        res.send(removedListDocument);
    } catch (error) {
        next(error);
    }
});

/* Task Routes */
// GET All Tasks by List ID
app.get('/lists/:listId/tasks', async (req, res, next) => {
    try {
        const tasks = await Task.find({ _listId: req.params.listId });
        res.send(tasks);
    } catch (error) {
        next(error);
    }
});

// GET Single Task by List ID and Task ID
app.get('/lists/:listId/tasks/:taskId', async (req, res, next) => {
    try {
        const task = await Task.findOne({ _id: req.params.taskId, _listId: req.params.listId });
        res.send(task);
    } catch (error) {
        next(error);
    }
});

// POST Create New Task
app.post('/lists/:listId/tasks', async (req, res, next) => {
    try {
        const newTask = new Task({ title: req.body.title, _listId: req.params.listId });
        const newTaskDoc = await newTask.save();
        res.send(newTaskDoc);
    } catch (error) {
        next(error);
    }
});

// PATCH Update Task by List ID and Task ID
app.patch('/lists/:listId/tasks/:taskId', async (req, res, next) => {
    try {
        await Task.findOneAndUpdate({ _id: req.params.taskId, _listId: req.params.listId }, { $set: req.body });
        res.send({ message: 'PATCH Success' });
    } catch (error) {
        next(error);
    }
});

// DELETE Task by List ID and Task ID
app.delete('/lists/:listId/tasks/:taskId', async (req, res, next) => {
    try {
        const removedTaskDocument = await Task.findOneAndRemove({ _id: req.params.taskId, _listId: req.params.listId });
        res.send(removedTaskDocument);
    } catch (error) {
        next(error);
    }
});

// Centralized error handling middleware
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send({ message: 'An error occurred', error: error.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
