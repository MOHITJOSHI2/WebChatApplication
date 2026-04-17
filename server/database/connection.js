const mongoose = require('mongoose')
require('dotenv').config({ quiet: true })

mongoose.connect(process.env.DATABASE)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log("Error came database\n", err))