require("dotenv").config();
require("./mongo");

const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("./loggerMiddleware");

const Poetry = require("./model/Poetry");

// Usamos cors
app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (request, response) => {
  response.send("<h1>Hello world</h1>");
});

app.get("/api/poetryArray", (request, response) => {
  Poetry.find({}).then((poetrys) => {
    console.log(poetrys);
    response.json(poetrys);
  });
});

app.post("/api/poetryArray", (request, response) => {
  const poetry = request.body;

  if (!poetry.content || !poetry.title) {
    return response.status(400).json({
      error: 'required "content" or/and "title" are missing',
    });
  }

  const newPoetry = new Poetry({
    title: poetry.title,
    content: poetry.content,
    likes: 0,
  });

  newPoetry.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.get("/api/poetryArray/:id", (request, response, next) => {
  const { id } = request.params;

  Poetry.findById(id)
    .then((poetry) => {
      if (poetry) {
        return response.json(poetry);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

app.delete("/api/poetryArray/:id", (request, response, next) => {
  const id = request.params;

  Poetry.findByIdAndRemove(id)
    .then((result) => {
      console.log(result);
      response.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  console.error(error);
  console.error(error.name);
  if (error.name === "CastError") {
    response.status(400).send({
      error: "id used is malformed",
    });
  } else {
    response.status(500).end();
  }
});

app.use((request, response) => {
  console.log(request.path);
  response.status(404).json({
    error: "Not found",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
