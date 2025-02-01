// backend/src/routes/adminRoutes.js
import express from 'express';
import { obtenerUsuarios, editarUsuario, eliminarUsuario } from '../controller/adminController.js';
import { checkAdminRole } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Ruta para obtener todos los usuarios (solo accesible para admin) y Protege la ruta con el middleware checkAdminRole
router.get('/usuarios', checkAdminRole, obtenerUsuarios);
router.put('/:id', editarUsuario) // esto crea una ruta para el método POST
router.delete('/:id', eliminarUsuario) // esto crea una ruta para el método DELETE


export default router;


