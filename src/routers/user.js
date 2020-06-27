const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();


// Getting users function with promise syntax
// router.get('/users', (req, res) => {
//     User.find({}).then( (users) => {
//         res.send(users);
//     }).catch( (e) => {
//         res.status(500).send();
//     });
// });

// Getting users function with an async/await syntax
router.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send();
    }
});

// Getting users function with an async/await syntax
// Adding the auth middleware to the request
router.get('/users/me', auth , async (req, res) => {
    res.send(req.user);
});


// Getting a user function with promise syntax
// router.get('/users/:id', (req, res) => {
//     const _id = req.params.id;

//     User.findById(_id).then( (user) => {
//         if(!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     }).catch( (e) => {
//         res.status(500).send(e);
//     });
// });

// Getting a user function an async/await syntax
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        console.log('This is the user from the asynch await: ' + user);
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Creating user function with promise syntax
// router.post('/users', (req, res) => {
//     const user = new User(req.body);

//     user.save().then( ()=> {
//         res.status(201).send(user);
//     }).catch( (e)=> {
//         res.status(400).send(e);
//     });
// });

// Creating user function with an async/await syntax
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user  = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});

    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body); //extracting the keys of the body json from the request
    const allowedUpdates = ['name', 'email', 'password', 'age']; // this is an array of all of the keys that allowed to be updated
    const isValidOperation = updates.every( (update) => allowedUpdates.includes(update) ); //passing on each key and comaring it to the allowed array, if there is a key that does not exist return false.

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'});
    }

    try {
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});

        // since findByIdAndUpdate function pass mongoose middleware, need manually create the update and save it through the middleware
        const user = await User.findByIdAndUpdate(req.params.id);

        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send()
        }
        
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;