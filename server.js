const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB (Render usará tu variable MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.error("Error:", err));

// Esquema del usuario
const User = mongoose.model("User", new mongoose.Schema({
email: String,
name: String
}), "users");

// Ruta para recibir los datos del teléfono
app.post("/api/register", async (req, res) => {
try {
const newUser = new User(req.body);
await newUser.save();
res.status(201).json({ message: "Usuario guardado exitosamente" });
} catch (error) {
res.status(500).json({ error: error.message });
}
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Servidor en puerto " + PORT));

