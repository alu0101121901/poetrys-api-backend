const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.log(err)
  })

// Se debe definir un esquema para el poema

/* const poetry = new Poetry({
  title: "Revolucionaria",
  content: ["Latidos que borran fronteras.", 
    "Mirada que refleja libertad.",
    "Su piel como color de mi bandera", 
    "y su voz como mi himno nacional.",
    "/br",
    "Pasos que dejan grandes huellas,",
    "manos que albergan en un amplio hogar",
    "y en su espalda residen las estrellas",
    "que mis yemas ansían tanto conquistar.",
    "/br",
    "Su regazo regala una enorme trinchera",
    "que me reguarda de todo mal",
    "y en sus abrazos encuentro la tregua",
    "frente a cualquier pensamiento radical.",
    "/br",
    "En sus ojos, eterno esbozo de sinceridad.",
    "Contra ella perdería toda guerra,",
    "pues a su vera obtengo la mayor paz",
    "que se pueda sentir sobre La Tierra."],
  likes: 51,
})

poetry.save()
  .then(result => {
    console.log(result)
    mongoose.connection.close()
  })
  .catch(err => {
    console.error(err)
  }) */


