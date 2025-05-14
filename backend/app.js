var express = require ('express');
const mysql = require('mysql');

var app = express();

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

app.get('/', (req, res, next) => {
  res.status(200).json({
    ok: true,
    mensaje: 'Todo funciona correctamente',
  })
});