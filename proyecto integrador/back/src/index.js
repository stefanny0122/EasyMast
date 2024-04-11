const express = require("express");
const app = express();
const cors = require("cors");
const FacturaRouter = require ('../src/routers/Factura.routers.js'); 
const MaterialRouter = require('../src/routers/MaterialDeConstruccion.routers.js');
const NotaRouter = require ('../src/routers/NotaDeCredito.routers.js');
const OrdenRouter = require ('../src/routers/OrdenDeCompra.routers.js');
const PagoRouter = require ('../src/routers/Pago.routers.js');
const UsuarioRouter = require ('../src/routers/Usuario.routers.js')
const pool = require('../src/providers/conexion.js')

app.use(cors('*'));
app.use(express.json());

app.use("/Factura", FacturaRouter);
app.use("/MaterialDeConstruccion", MaterialRouter);
app.use ("/NotaDeCredito", NotaRouter);
app.use("/OrdenDeCompra", OrdenRouter);
app.use("/Pago", PagoRouter);
app.use ("/Usuario", UsuarioRouter);


