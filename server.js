require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const poolMySQL = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/api/usuarios/mysql', async (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    try {
        const [result] = await poolMySQL.execute(
            'INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)',
            [nombre, correo, contraseña]
        );
        res.json({
            mensaje: 'Usuario guardado en MariaDB',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/usuarios/mysql', async (req, res) => {
    const [rows] = await poolMySQL.execute('SELECT * FROM usuarios');
    res.json(rows);
});

app.get('/api/usuarios/mysql/:id', async (req, res) => {
    const [rows] = await poolMySQL.execute('SELECT * FROM usuarios WHERE id=?', [req.params.id]);
    res.json(rows);
});

app.delete('/api/usuarios/mysql/:id', async (req, res) => {
    await poolMySQL.execute('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
    res.json({ mensaje: 'Usuario eliminado' });
});

app.put('/api/usuarios/mysql/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contraseña } = req.body;

    const [result] = await poolMySQL.execute(
        'UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ? WHERE id = ?',
        [nombre, correo, contraseña, id]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario actualizado correctamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});