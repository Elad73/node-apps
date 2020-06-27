const mongoose  = require('mongoose');
const validator = require('validator');
const bcrypt    = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
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
    }
});

userSchema.pre('save', async function (next) {
    // this gives us access to the individual that is about to be saved.
    const user = this;

    if(user.isModified('password')) {
        console.log('User has modified the password');
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})


const User = mongoose.model('User', userSchema);

module.exports = User;
