const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password, name, and number as argument')
    process.exit(1)
}

const password = process.argv[2]


const url = `mongodb+srv://Kevojo:${password}@cluster0.qsr1liu.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length == 3) {
    Contact.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}
else {
    if (process.argv.length < 5) {
        console.log('give password, name, and number as argument')
        process.exit(1)
    }

    const name = process.argv[3]
    const number = process.argv[4]

    const contact = new Contact({
        name: name,
        number: number,
    })

    contact.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })

}

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
  Contact.find({}).then(notes => response.json(notes))
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


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorhandler = (error, request, response, next) =>{
  console.error(error.message)
  if (error.name == "CastError") {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(errorhandler)