require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const configRoutes = require('./routes/configRoutes');
const supportRoutes = require('./routes/supportRoutes');

const { errorHandler } = require('./middlewares/errorMiddleware');
const { initDatabase } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar banco de dados antes das rotas
initDatabase()
  .then(() => {
    app.get('/', (req, res) => {
      res.json({ success: true, data: { message: 'Avano Imóveis API' }, message: 'API funcionando' });
    });

    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/properties', propertyRoutes);
    app.use('/api/appointments', appointmentRoutes);
    app.use('/api/dashboard', dashboardRoutes);
    app.use('/api/config', configRoutes);
    app.use('/api/support', supportRoutes);

    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao inicializar o banco de dados:', err);
    process.exit(1);
  });
