const mongoose = require('mongoose')

require('dotenv').config()

const url = process.env.MONGODB

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

mongoose.connect(url)
    .then((result) => {
        console.log('connected')

        const note = new Note({
            content: 'test data',
            date: new Date(),
            important: true
        })

        return note.save()
    })
    .then(() => {
        console.log('note saved!')
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))