const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.send(persons)
})

app.get('/api/persons/:id', (req, res) => {

    let id = Number(req.params.id)
    let person = persons.find(person => person.id === id)
    if(person) {
        res.send(person)
    } else {
        res.status(404).send()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    let id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).send()
})

app.get('/info', (req, res) => {
    let info = `Phonebook has info for ${persons.length} people <br>`
    let date = new Date()
    res.send(info + date)
})

app.post('/api/persons', (req, res) => {

    if(!req.body.number || !req.body.name) {
        return res.send("missing part")
    }

    let body = req.body
    let person = {
        "id": persons.length + 1,
        "name": body.name,
        "number": body.number
    }

    for(let i = 0; i < persons.length; i++ ) {
        if(person.name === persons[i].name) {
            return res.send('this person is already exist')
        }
    }

    persons = persons.concat(person)

    res.status(409).json({error: "name must be uniqe"})

})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Listening on port ${PORT}`)