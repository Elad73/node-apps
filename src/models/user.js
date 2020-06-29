const mongoose  = require('mongoose');
const validator = require('validator');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');
const Task      = require('../models/task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        },
        lowercase: true,
        trim: true
    },  
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        },
        default: 0
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error('Password is invalid, can not include \'password\' in it!')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true // Enabling timestamps, by default they are set to false
});

// This is not a real field stored in the db, it is just for mongoose to figure out who owns what and how they are related
// This is a reference between the user and the task on a virtual
userSchema.virtual('userTasks', {
    ref: 'Task',
    localField: '_id', // the local field _id is the relationship between the task owner (which is also a user id) and the local field '_id'
    foreignField: 'owner'
})

// methods are accessible on the instances, sometimes called 'instance methods'.
// we are using an async function and not an async arrow function since we want to use the 'this' binding, which we can not do with an arrow function.
userSchema.methods.generateAuthToken = async function() {
    const user  = this;
    const token = jwt.sign({_id: user._id.toString()}, 'thisisachanceofalifetime');

    // adding the newly generated token to the model and saving it to the db
    user.tokens = user.tokens.concat({ token });
    await user.save();
    
    return token;
};

// This is the public profile of the user. without the password and tokens array.
// This method is called each time the object is being stringified
userSchema.methods.toJSON = function () {
    const user       = this; //getting the context of the user
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar; // There is no need to send the avatar, we have a route for it, no need to add weight to the stringify

    return userObject;
};

// static methods are accessible on the model, sometimes called 'model methods'
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare("" + password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
};

// Hash the plain text password before saving
// ToDo: pay attention if user updates with the same plain text pass and gets different has pass
userSchema.pre('save', async function (next) {
    // this gives us access to the individual that is about to be saved.
    const user = this;

    if(user.isModified('password')) {
        console.log('User has modified the password');
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

// Delete user tasks when user is removed
// Thre reason we are not using the arrow function is because we want the 'this' context
userSchema.pre('remove', async function (next) {
    // this gives us access to the individual that is about to be saved.
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
