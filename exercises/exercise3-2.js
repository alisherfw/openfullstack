const mongoose = require('mongoose')

const url = "mongodb+srv://ali:Alisher2002@cluster0.8qjwzgm.mongodb.net/?retryWrites=true&w=majority"

const phoneSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Notes', phoneSchema)

mongoose.connect(url)
    .then((result) => {
        console.log('database connected!')

        const note = new Note({
            content: "ali",
            date: new Date(),
            important: true
        })
        return note.save()
    })
    .then(() => {
        console.log('saved!')
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))