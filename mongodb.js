const mongoose = require('mongoose')

require('dotenv').config()

const url = "mongodb+srv://ali:Alisher2002@cluster0.8qjwzgm.mongodb.net/?retryWrites=true&w=majority"

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