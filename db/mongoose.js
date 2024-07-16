const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

mongoose.Promise = global.Promise;

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000,  // Adjust timeout as needed
    socketTimeoutMS: 45000,  // Adjust timeout as needed
}).then(() => {
    console.log("Connected to MongoDB successfully");
}).catch((e) => {
    console.error("Error while connecting to MongoDB", e);
});

module.exports = {
    mongoose
};
