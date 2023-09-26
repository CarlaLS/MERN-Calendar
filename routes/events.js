const {Router} = require('express');
const {validarJWT} = require('../middlewares/validar-jwt')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isdate');

const router = Router();
/**
 * Event Routes
 * /api/events
 */
//todas tienen q pasar por la validacion de jwt
router.use(validarJWT);



//obtener eventos, 
router.get('/', getEventos)


//crear un nuevo evento
router.post(
    '/',
    [ 
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria').custom(isDate),
        validarCampos,
    
    ],
     crearEvento)

//actualizar evento
router.put('/:id',  actualizarEvento)

//borrar evento
router.delete('/:id',  eliminarEvento)



module.exports =router
