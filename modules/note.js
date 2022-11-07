const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB

console.log('connecting to database...')

mongoose.connect(url)
    .then((result) => {
        console.log('connection established: ', url)
    })
    .catch((err) => {
        console.log('Failed to connect:', err)
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