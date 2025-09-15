require('dotenv').config()
const express = require("express")
const cors = require("cors")
const app = express()
const Phonebook = require("./models/contact")

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/info', (request,response) =>{
  const date = Date()
  response.send(`<h1> There are ${[Phonebook.length]} numbers.</h1>
    <p> ${date} </p>`)

})

app.get('/', (request,response) =>{
    response.send('<h1>Hello World!</h1>')
})
app.get('/api/phonebook', (request,response) => {
  Phonebook.find({}).then(contacts => response.json(contacts))
})
app.get('/api/phonebook/:id', (request,response)=>{
    const id = request.params.id
    Phonebook.findById(id).then(contact =>
      response.json(contact)
    ).catch(error => console.log(error.message))
})

app.post('/api/phonebook',(request,response) =>{
    let body = request.body
    if (!body.number){
      return response.status(400).json({ 
      error: 'content missing' 
      })
    }
  const contact = new Phonebook({
    name: body.name,
    number: body.number
  })
    contact.save().then(savedContact =>
        response.json(savedContact)
      )
    }
)

const errorhandler = (error, request, response, next) =>{
  console.error(error.message)
  if (error.name == "CastError") {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(errorhandler)