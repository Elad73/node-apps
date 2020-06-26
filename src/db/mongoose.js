const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid');
//             }
//         },
//         lowercase: true,
//         trim: true
//     },  
//     age: {
//         type: Number,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a positive number');
//             }
//         },
//         default: 0
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 6,
//         trim: true,
//         validate(value) {
//             if(value.toLowerCase().includes('password')){
//                 throw new Error('Password is invalid, can not include \'password\' in it!')
//             }
//         }
//     }
// });

// const user = new User({ 
//     name: '   elad   ',
//     email: 'ELAD@gmail.com   ',
//     password: "   1234567    "
// })

// user.save().then( ()=> {
//     console.log(user);
// }).catch( (error)=> {
//     console.log("Error!", error);
// });


const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completion: {
        type: Boolean, 
        default: false
    }
});

const task = new Task({
    description: "   learning for my next interview   ",
    
});

task.save().then( ()=> {
    console.log(task);
}).catch( (error)=> {
    console.log("Error!", error);
});


