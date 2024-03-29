const experss = require("express");
const router = experss.Router();
const libros = require("../data");
const Joi = require("joi");

const librosSchema = Joi.object({
  titulo: Joi.string().required().label("Titulo"),
  autor: Joi.string().required().label("Autor"),
});

//Se obtienen todos los libros
router.get("/", (req, res, next) => {
  try {
    res.json(libros);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const libro = libros.find((l) => l.id === id);

    if (!libro) {
      const error = new Error("Libro no encontrado");
      error.status = 404;
      throw error;
    }
    res.json(libro);
  } catch (err) {
    next(err);
  }
});

//Crear un nuevo libro

router.post("/", (req, res, next) => {
  try {
    const { error, value } = librosSchema.validate(req.body);
    if (error) {
      const validationError = new Error("Error de validacion ");
      validationError.status = 404;
      validationError.details = error.details.map((detail) => detail.message);
      throw validationError;
    }
    const { titulo, autor } = value;

    const nuevoLibro = {
      id: libros.length + 1,
      titulo,
      autor
    };

    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
  } catch (err) {
    next(err);
  }
});

//Actualizar un libro existente

router.put("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const { error, value } = librosSchema.validate(req.body);
    if (error) {
      const validationError = new error("error de validacion ");
      validationError.status = 400;
      validationError.detais = error.details.map((detail) => detail.message);
      throw validationError;
    }

    const { titulo, autor } = value;
    const libro = libros.find((l) => l.id === id);

    if (!libro) {
      const error = new Error("libro no encontrado");
      error.status = 404;
      throw error;
    }

    libro.titulo = titulo || libro.titulo;
    libro.autor = autor || libro.autor;

    res.json(libro);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
