const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB usando la variable de Render
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Conectado exitosamente a MongoDB Atlas 🚀"))
.catch(err => console.error("Error al conectar a MongoDB:", err));

// Definir el esquema del Usuario
const UserSchema = new mongoose.Schema({
email: String,
name: String
});
const User = mongoose.model("User", UserSchema, "users");

// Ruta principal de prueba
app.get("/", (req, res) => {
res.send("Backend funcionando al 100% 🚀");
});

// Ruta para registrar usuarios desde el teléfono
app.post("/api/users", async (req, res) => {
try {
const newUser = new User(req.body);
await newUser.save();
res.status(201).json({ success: true, message: "Usuario guardado en la base de datos!" });
} catch (error) {
res.status(500).json({ success: false, error: error.message });
}
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
console.log("Servidor corriendo en puerto " + PORT);
});
