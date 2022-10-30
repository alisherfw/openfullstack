const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
      id: 1,
      content: "HTML is nasty",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/notes', (request, response) => {
    response.send(notes)
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