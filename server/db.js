const mongoose = require('mongoose');

module.exports = () => {
    const connectionParams = {
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        minPoolSize: 10
    };
    try {
        mongoose.connect(process.env.DB_CONNECT, connectionParams);
        console.log("Connected database");
    } catch(error) {
        console.log(error);
        console.log("Could not connect to database");
    }
}