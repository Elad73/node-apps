const express = require('express');
const Task = require('../models/task');

const router = new express.Router();


router.get('/tasks', async (req, res) => {
   
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if(!task) {
            return res.status(404).send();
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);

    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body); //extracting the keys of the body json from the request
    const allowedUpdates = ['description', 'completion']; // this is an array of all of the keys that allowed to be updated
    const isValidOperation = updates.every( (update) => allowedUpdates.includes(update) ); //passing on each key and comaring it to the allowed array, if there is a key that does not exist return false.

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'});
    }

    try {
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});

        // since findByIdAndUpdate function pass mongoose middleware, need manually create the update and save it through the middleware
        const task = await Task.findByIdAndUpdate(req.params.id);

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).send()
        }
        
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;