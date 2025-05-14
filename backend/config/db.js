const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("MongoDB est Connecté"))
    } catch (error) {
        console.error(" MongoDb n'est pas connecté", error)
    }
}

module.exports = connectDB