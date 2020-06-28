const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completion: {
        type: Boolean, 
        default: false
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
        ref: 'User' // this is the relationship to the User model
    }
}, {
    timestamps: true
});

// taskSchema.pre('save', async function (next) {
//     // this gives us access to the individual that is about to be saved.
//     const user = this;

//     console.log('before saving the task to the db');

//     next();
// })

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
