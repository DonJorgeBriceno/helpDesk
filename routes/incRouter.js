const express = require('express')
const router = express.Router()

const incidenteController = require('../controllers/incidenteController')

//Mostrar todos los incidentes (GET)
router.get('/verIncidentes/:id', incidenteController.mostrar)
//Crear incidentes (POST)
router.post('/crear', incidenteController.crear)
//Editar incidente (POST)  
router.get('/solucionarInc/:id', incidenteController.solucionar)
//CambioEstado(GET)
router.get('/cambioEstado/:id/:nt', incidenteController.cambioEstado)

//Borrar incidente (GET)
router.get('/borrar/:id', incidenteController.borrar)
//router.get('/home', incidente.Controller.home)
router.get('/volver', incidenteController.volver)
//LogIn (POST)
router.post('/iniciar', incidenteController.iniciar)
router.post('/registro', incidenteController.registro)
//Exporto módulo
module.exports = router