const mongoose = require('mongoose')
const url = process.env.MONGO_URL

mongoose.connect(url).then(() => {
    console.log("MONGODB Connected")
}).catch(err => {
    console.log("Error MONGODB: ", err)
})
