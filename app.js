const express = require("express");
const app = express();
app.use(express.json());

//importamos Libros
const LibroRouter = require("./router/libros");
//Importamos ErrorHandler
const errorHandler = require("./middlewares/errorHandler");

app.use("/libros", LibroRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
