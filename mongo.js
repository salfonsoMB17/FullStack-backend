const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb://serggios17:${password}@ac-cuklhk5-shard-00-00.wkz1p65.mongodb.net:27017,ac-cuklhk5-shard-00-01.wkz1p65.mongodb.net:27017,ac-cuklhk5-shard-00-02.wkz1p65.mongodb.net:27017/phonebook?ssl=true&replicaSet=atlas-q1cocj-shard-0&authSource=admin&appName=Cluster0
`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Persons = mongoose.model('persons', personSchema)

if (process.argv.length === 5) {
    const person = new Persons({
        name: process.argv[3],
        number: process.argv[4],
    })
    //console.log(person)   
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })

} else if (process.argv.length === 3){
    Persons.find({}).then(result => {
        //console.log(result)
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

