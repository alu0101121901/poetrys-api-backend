const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')

// Usamos cors
app.use(cors())
app.use(express.json()) 

app.use(logger)

let poetryArray = [
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
]

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>');
})

app.get('/api/poetryArray', (request, response) => {
  response.json(poetryArray)
})

app.post('/api/poetryArray', (request, response) => {
  const poetry = request.body

  // Calculamos el id para el nuevo post
  // puede ser el máximo + 1, puede ser un numero random...
  const ids = poetryArray.map(poetry => poetry.id)
  const maxId = Math.max(...ids)

  const newPoetry = {
    id: maxId + 1,
    title: poetry.title,
    content: poetry.content,
    likes: 0,
  }

  poetryArray = poetryArray.concat(newPoetry)
  response.status(201).json(newPoetry)
})

app.get('/api/poetryArray/:id', (request, response) => {
  const id = Number(request.params.id)
  const p = poetryArray.find(poetry => poetry.id === id);

  if (p) {
    response.send(p);
  }
  else {
    response.status(404).end();
  }
});

app.delete('/api/poetryArray/:id', (request, response) => {
  const id = Number(request.params.id);
  // Filtramos todas aquellas excepto la que estamos borrando
  poetryArray = poetryArray.filter(poetry => poetry.id === id);
  response.status(204).end();
});

app.use((request, response) => {
  console.log(request.path)
  response.status(404).json({
    error: 'Not found'
  });
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});