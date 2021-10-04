require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')

const Poetry = require('./model/Poetry')

// Usamos cors
app.use(cors())
app.use(express.json()) 
app.use(logger)

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>');
})

app.get('/api/poetryArray', (request, response) => {
  Poetry.find({})
    .then(poetrys => {
      response.json(poetrys)
    })
})

app.post('/api/poetryArray', (request, response) => {
  const poetry = request.body

  if (!poetry.content || !poetry.title) {
    return response.status(400).json({
      error: 'required "content" or/and "title" are missing'
    })
  }

  const newPoetry = new Poetry({
    title: poetry.title,
    content: poetry.content,
    likes: 0,
  })

  newPoetry.save()
    .then(savedNote => {
      response.json(savedNote)
    })
})

app.get('/api/poetryArray/:id', (request, response, next) => {
  const { id } = request.params

  Poetry.findById(id).then(poetry => {
    if (poetry) {
      return response.json(poetry)
    }
    else {
      response.status(404).end()
    }
  }).catch(err => {
    next(err)
  })
});

app.delete('/api/poetryArray/:id', (request, response, next) => {
  const id = request.params

  Poetry.findByIdAndRemove(id)
    .then(result => {
      console.log(result)
      response.status(204).end();
    }).catch(err => {
      next(err)
    })
});

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  console.error(error)
  console.error(error.name)
  if(error.name === 'CastError') {
    response.status(400).send({
      error: 'id used is malformed'
    })
  } else {
    response.status(500).end()
  }
})

app.use((request, response) => {
  console.log(request.path)
  response.status(404).json({
    error: 'Not found'
  });
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* let poetryArray = [
  {
    id: 1,
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
  },
  {
    id: 2,
    title: "Dudas",
    content: ["Ya no sé si se apaga o se enciende esta lumbre.", 
      "No sé si tus descargas me dan luz o calambres.",
      "Mi única certeza es que me amordaza la incertidumbre", 
      "y las bocas cerradas se mueren de hambre.",
    ],
    likes: 12,
  },
] */