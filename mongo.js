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
