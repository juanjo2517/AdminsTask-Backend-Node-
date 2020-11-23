const express = require('express');
const connectDatabase = require('./config/db');
const cors = require('cors');

//Crear Servidor
const app = express(); 

//Conectar a la base de datos
connectDatabase();

//Habilitar Cors
app.use(cors());

// Habilitar express JSON - Leer datos del usuario
app.use(express.json({ extended: true }));  

//Pagina principal
app.get('/', (req, res) => {
    res.send('<h1>Vamos con NodeJS mi socio :3</h1>')
});

//puerto de la App
const PORT = process.env.PORT || 4000;

//Importar Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/project', require('./routes/project'));

app.use('/api/task', require('./routes/task'));

app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`)
});

