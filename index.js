const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

morgan.token('data', function getData (req) {
  if (req.method === 'POST'){
    return JSON.stringify(req.body)
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

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

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
     <p>${new Date()}</p>`
  )
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === Number(req.params.id))
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(p => p.id !== Number(req.params.id))
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name) return res.status(400).json({ error: 'name missing' })
  if (!number) return res.status(400).json({ error: 'number missing' })
  if (persons.find(p => p.name === name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }
  
  const person = { id: Math.floor(Math.random() * 1000000), name, number }
  persons = persons.concat(person)
  res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})