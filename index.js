const express = require('express')
const mongoose = require('mongoose')
const Note = require('./modules/note')
const app = express()
const morgan = require('morgan')

require('dotenv').config()
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (request, response) => {
    response.send('<a href="/notes"> notes </a>')
})

app.get('/notes', (request, response) => {
    Note.find({})
        .then(notes => {
            response.json(notes)
        })
})

app.get('/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(err => next(err))
})


app.delete('/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(err => next(err))
})

app.post('/notes', (req, res) => {

    if (!req.body.content) {
        return res.status(400).json({ error: 'missing content' })
    }

    const note = new Note({
        content: req.body.content,
        date: new Date(),
        important: req.body.important || false
    })

    note.save().then(savedNote => {
        res.json(savedNote)
    })
})


const unknownEndpoint = (req, res) => {
    res.status(404).send({error: "unknown endpoint"})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)