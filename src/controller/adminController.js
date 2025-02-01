// backend/src/controllers/adminController.js
import express from 'express'; 
import Usuarios from '../models/usuarios.js';
const router = express.Router();

// Obtener la lista de usuarios (solo para admin)
export const obtenerUsuarios = async (req, res) => {
    try {
        // Verificamos si el usuario tiene el rol 'admin' en el token
        const user = req.user; // 'req.user' es el usuario autenticado, proviene del middleware de autenticación
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado, solo administradores pueden ver los usuarios.' });
        }

        // Si es admin, obtenemos la lista de todos los usuarios
        const users = await Usuarios.find();
        res.status(200).json(users); // Respondemos con la lista de usuarios
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
};

// editar la lista de usuarios (solo para admin)
export const editarUsuario = async (req, res) => {
    try {
        // Verificamos si el usuario tiene el rol 'admin' en el token
        const actualizarUsuario = req.user; // 'req.user' es el usuario autenticado, proviene del middleware de autenticación
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado, solo administradores pueden ver los usuarios.' });
        }

        // Si es admin, obtenemos la lista de todos los usuarios
        const users = await Usuarios.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(actualizarUsuario); // Respondemos con la lista de usuarios
    } catch (error) {
        res.status(500).json({ message: 'Error al modificar los usuarios', error: error.message });
    }
};


export const eliminarUsuario = async (req, res) => {
    try {
        // Verificamos si el usuario tiene el rol 'admin' en el token
        const eliminarUsuario = req.user; // 'req.user' es el usuario autenticado, proviene del middleware de autenticación
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado, solo administradores pueden ver los usuarios.' });
        }

        // Si es admin, obtenemos la lista de todos los usuarios
        const users = await Usuarios.findByIdAndDelete(req.params.id);
        res.status(200).json(eliminarUsuario); // Respondemos con la lista de usuarios
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar los usuarios', error: error.message });
    }
}


export default router;