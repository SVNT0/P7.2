const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();
const app = express();
const postRoutes = require('./routes/post.js');
const authRoutes = require('./routes/authentification.js');
const userRoutes = require('./routes/user.js')

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_CONNEXION,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/post', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;