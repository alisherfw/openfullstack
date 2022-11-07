const express = require('express')
const mongoose = require('mongoose')
const Note = require('./modules/note')
const app = express()
const morgan = require('morgan')

require('dotenv').config()
app.use(express.json())
app.use(morgan('dev'))

const url = process.env.MONGODB

app.get('/', (request, response) => {
    response.send('<h1>Some changes</h1>')
})

app.get('/notes', (request, response) => {
    Note.find({})
        .then(notes => {
            response.json(notes)
        })
})

app.get('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note) {
        response.send(note)
    } else {
        response.status(404).send();
    }
})

app.post('/notes', (req, res) => {

    if(!req.body.content) {
        return res.status(304).json({ error: 'missing content' })
    }

    const note = {
        id: notes.length + 1,
        content: req.body.content,
        date: new Date(),
        important: req.body.important || false
    }

    notes.push(note)
    res.status(200).send('succeed!')
    
})



const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)