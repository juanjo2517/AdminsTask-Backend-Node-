const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('Database Connect Successfully');
    } catch (error) {
        console.log(error)
        process.exit(1); //Detener la App
    }
}

module.exports = connectDatabase;