const express = require("express");
const router = express.Router(); //manejador de rutas de express
const userSchema = require("../models/user");
router.post('/signup', async (req, res) => {
    const { usuario, correo, clave } = req.body;
    const user = new userSchema({
        usuario: usuario,
        correo: correo,
        clave: clave
    });
    user.clave = await user.encryptClave(user.clave);
    await user.save(); //save es un método de mongoose para guardar datos en MongoDB 
    res.json(user);
});
router.get("/signup", async (req, res) => {
  try {
    const users = await userSchema.find();  // Obtener todos los animales de la base de datos
    res.json(users);  // Devolver los animales en formato JSON
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;

