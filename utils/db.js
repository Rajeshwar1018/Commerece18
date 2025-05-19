const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/commerece')
.then(() => console.log('MongoDB Connected'))
.catch((error) => console.log(`Error connecting MongoDb ${error}`))


process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close(); 
        console.log('MongoDB connection closed');
        process.exit(0);
    } catch (err) {
        console.error('Error closing MongoDB connection', err);
        process.exit(1);
    }
});