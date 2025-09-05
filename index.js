const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
  const maxid = phonebook.length > 0 ? Math.max(...phonebook.map(number => number.id)) : 0
  return String(maxid +1)
}
app.get('/info', (request,response) =>{
  const date = Date()
  response.send(`<h1> There are ${[phonebook.length]} numbers.</h1>
    <p> ${date} </p>`)

})

app.get('/', (request,response) =>{
    response.send('<h1>Hello World!</h1>')
})
app.get('/api/phonebook', (request,response) => {
    response.json(phonebook)
})
app.get('/api/phonebook/:id', (request,response)=>{
    const id = request.params.id
    const number = phonebook.find(number => number.id === id)
    if (number){
        response.json(number)
    }
    else{
        response.status(404).end()
    }
})
app.delete('/api/phonebook/:id', (request,response)=>{
    const id = request.params.id
    phonebook = phonebook.filter(person => person.id !== id)
    response.status(204).end()
})
app.post('/api/phonebook',(request,response) =>{
    let number = request.body
    if (!number.number){
      return response.status(400).json({ 
      error: 'content missing' 
    })
    }
    const temp = phonebook.find(no => no.name == number.name)
    if (temp){
      temp.number = number.number
    }
    else{
      number.id =  generateId()
      number.important = number.important || false
      phonebook = phonebook.concat(number)
      console.log(number)
      response.json(number)
    }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})