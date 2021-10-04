const { model, Schema } = require('mongoose')

const poetrySchema = new Schema({
  title: String,
  content: Array,
  likes: Number,
})

poetrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Poetry = model('Poetry', poetrySchema)

module.exports = Poetry