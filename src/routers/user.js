const express = require('express');
const multer  = require('multer');
const User    = require('../models/user');
const auth    = require('../middleware/auth');

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
// Don't want to expose to the user a list of all of the users
// router.get('/users', async (req, res) => {

//     try {
//         const users = await User.find({});
//         res.send(users);
//     } catch (e) {
//         res.status(500).send();
//     }
// });

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

router.post('/users/logout', auth, async (req, res) => {
    try {
        // removing the current token from the user's tokens array
        req.user.tokens = req.user.tokens.filter( (token) => {
            return token.token !== req.token
        })
        await req.user.save();

        res.send(); 
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutall', auth, async (req, res) => {
    try {
        // removing the all of the tokens from the user's tokens array
        req.user.tokens = [];
        await req.user.save();

        res.send(); 
    } catch (e) {
        res.status(500).send();
    }
});


// router.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body); //extracting the keys of the body json from the request
//     const allowedUpdates = ['name', 'email', 'password', 'age']; // this is an array of all of the keys that allowed to be updated
//     const isValidOperation = updates.every( (update) => allowedUpdates.includes(update) ); //passing on each key and comaring it to the allowed array, if there is a key that does not exist return false.

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!'});
//     }

//     try {
//         //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});

//         // since findByIdAndUpdate function pass mongoose middleware, need manually create the update and save it through the middleware
//         const user = await User.findByIdAndUpdate(req.params.id);

//         updates.forEach((update) => user[update] = req.body[update]);
//         await user.save();

//         if (!user) {
//             return res.status(404).send();
//         }

//         res.send(user);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// });

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body); //extracting the keys of the body json from the request
    const allowedUpdates = ['name', 'email', 'password', 'age']; // this is an array of all of the keys that allowed to be updated
    const isValidOperation = updates.every( (update) => allowedUpdates.includes(update) ); //passing on each key and comaring it to the allowed array, if there is a key that does not exist return false.

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'});
    }

    try {
        // Getting the user from the req, after being authenticated at the middleware
        const user = req.user;

        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// We do not want to expose the userId!! need to block this method
// router.delete('/users/:id', auth, async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);

//         if (!user) {
//             return res.status(404).send()
//         }
        
//         res.send(user);
//     } catch (e) {
//         res.status(500).send(e);
//     }
// });

router.delete('/users/me', auth, async (req, res) => {
    try {
        // We already authenticated the user with the middleware and attached the user to the request.
        // In case the user is not found on the db, then the req.user will throw an error.
        // Using the remove method on the mongoose document
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});

const upload = multer({
    dest: 'images/avatars', // A name of the folder where all of the uploads should be stored
    limits: {
        fileSize: 1000000 // Size in bytes 1000000 = 1M bytes = 1Mb
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an Image'));    
        }
        
        cb(undefined, true);
    }
});

// Creating user function with an async/await syntax
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const user = req.user;

    try {
        res.send();
    } catch (e) {
        res.status(400).send(e);
    }
});


module.exports = router;