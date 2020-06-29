const mongoose      = require('mongoose');
const keys          = require('../../config/keys');
const mongodbConStr = keys.mongodbConStr;

mongoose.connect(mongodbConStr, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


