// Skripteistä npm run build:ui kääntää ui:n tuotantoversioksi ja kopioi sen
// npm run deploy julkaisee herokuun.
// npm run deploy:full yhdistää nuo molemmat sekä lisää vaadittavat git-komennot versionhallinnan päivittämistä varten.
// Lisätään lisäksi oma skripti npm run logs:prod lokien lukemiseen, jolloin käytännössä kaikki toimii npm-skriptein.
// Heroku loggaus: heroku logs -t
// https://dashboard.heroku.com/apps/gentle-lowlands-65894/resources (täällä: open app)

require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')

const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.get('/', (request, response) => {
    response.send('<h2>Notes backend from Finland!</h2>')
})

app.get('/api/notes', (request, response) => {
    Note.find({})
    .then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
    .then(note => {
        response.json(note)
    })
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

app.post('/api/notes', (request, response) =>{
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note ({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save()
    .then(savedNote => {
        response.json(savedNote)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})


// const generatedId = () => {
//     const maxId = notes.length > 0
//         ? Math.max(...notes.map(n => n.id))
//         : 0
//     return maxId + 1
// }

// const mongoose = require('mongoose')

// const url =
//   `mongodb+srv://Jii_Koo_155:XXXXXXXXXXXX@cluster0.sba3t.mongodb.net/note-app?retryWrites=true`
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// })

// noteSchema.set('toJson', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })

// const Note = mongoose.model('Note', noteSchema)

// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       date: "2020-01-10T17:30:31.098Z",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only Javascript",
//       date: "2020-01-10T18:39:34.091Z",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       date: "2020-01-10T19:20:14.298Z",
//       important: true
//     }
//   ]