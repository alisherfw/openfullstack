const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

console.log('connecting to database...')

mongoose.connect(url)
    .then((result) => {
        console.log('connection established to MongoDB ')
    })
    .catch((err) => {
        console.log('Failed to connect MongoDB: ', err)
    })

const notesSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

notesSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Notes', notesSchema)