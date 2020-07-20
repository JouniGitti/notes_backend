const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://Jii_Koo_155:${password}@cluster0.sba3t.mongodb.net/note-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'CSS is cascading',
  date: new Date(),
  important: true,
})

Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })