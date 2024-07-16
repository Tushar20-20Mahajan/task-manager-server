// Handle connection logic to MongoDB

const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Use JS promise instead of Bluebird

mongoose.connect('mongodb+srv://tusharmahajan080:Qw9yXrSyPQKn8mYG@clustertaskmanager.etioxbt.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true // Add this line
}).then(() => {
    console.log("Connected to MongoDB successfully");
}).catch((e) => {
    console.log("Error while connecting");
    console.log(e);
});

// Deprecation warnings
// mongoose.set('useCreateIndex', true); // Remove this line
// mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};
