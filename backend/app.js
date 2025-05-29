var express = require ('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

//configuracion de la base de datos
const mc = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'productos'
});

app.listen(3000, ()=>{
  console.log('Servidor en el puerto 3000');
});

mc.connect();

//recuperar todos los productos
app.get('/productos', function (req, res) {
  mc.query('SELECT * FROM productos', function (err, results, fields) {
    if (err) throw err;
    res.send({
      error: false,
      data: results,
      message: 'Lista de productos'
    });
  });
});
//Probar petición de un servicio
app.get('/', (req, res, next) => {
  res.status(200).json({
    ok: true,
    mensaje: 'Todo funciona correctamente',
  })
});

app.listen(3000, () => {
  console.log('Express Server - puerto 3000 online');
});

// Añadir un nuevo producto

app.post('/productos', function (req, res) {

  let datosproducto = {
    productName: req.body.productName,
    productCode: req.body.productCode,
    releaseDate: req.body.releaseDate,
    price: parseInt(req.body.price),
    description: req.body.description,
    starRating: parseInt(req.body.starRating),
    imageUrl: req.body.imageUrl
  };

  if (mc) {
    mc.query('INSERT INTO productos SET ?', datosproducto, function (err, results) {
      if (err) {
        res.status(500).json({ "Mensaje": "Error"});
      }
      else{
        res.status(201).json({"Mensaje": "Insertado"})
      }
    });
  }
});

//Borrar un producto
app.delete('/productos/:id', function (req, res) {});

// Actualizar un producto
app.put('/productos/:id', (req, res) => {});

//Actualizar imagen producto
app.put('/upload/productos/:id', (req, res) => {
  let id = req.params.id;
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      mensaje: 'No se ha seleccionado ninguna imagen',
      errors: { message: 'Debe seleccionar una imagen' }
    });
  }

  //Obtener nombre del archivo
  let archivo = req.files.imagen;
  let nombreCortado = archivo.name.split('.');
  let extensionArchivo = nombreCortado[nombreCortado.length - 1];

  //Solo estas extenciones aceptamos

  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

  if (extensionesValidas.indexOf(extensionArchivo) < 0) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Extensión no válida',
      errors: { message: 'Las extensiones válidas son ' + extensionesValidas.join(', ') }
    });
  };

  //Nombre de archivo personalizado
  let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

  //Mover el archivo del temporal a un path
  let path = `./uploads/productos/${nombreArchivo}`;

  console.log(path);

  archivo.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al mover el archivo',
        errors: err
      });
    }
  });
    return res.status(200).json({
      ok: true,
      mensaje: 'Petición realizada correctamente',
      nombreArchivo: nombreArchivo
    });
});


