const express = require('express');
var logger = require('morgan');
const path = require('path');
require('dotenv').config()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000;
const app = express();
require('./DB/db')
const User = require('./routes/user');
const Personnel = require('./routes/personel');
const Poste = require('./routes/poste');
const HistoriqueEmbauche = require('./routes/historique_embauche');
const Banque = require('./routes/banque');
const Compte = require('./routes/compte');
const Client = require('./routes/client');
const Voiture = require('./routes/voiture');
const Assurance=require('./routes/assurance');
const Prestataireassurance =require('./routes/prestataire_assurance')
const Entretien=require('./routes/entretien');
const Entretienvehicule=require('./routes/entretien-vehicule');
const Role = require('./routes/role');

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", " Origin , X-Requested-With, Content-Type, Accept , Authorization");
    res.setHeader("Access-Control-Allow-Methods", " POST, GET , DELETE ,PUT, OPTIONS");
    next();
  });
  app.use(logger('dev'));
  app.use(express());
  app.use(express.json());
  app.use("/images", express.static(path.join("images")))
  app.use(express.urlencoded({ extended: false }));
  app.use('/api/user', User);
  app.use('/api/personnel', Personnel);
  app.use('/api/poste', Poste);
  app.use('/api/HistoriqueEmbauche', HistoriqueEmbauche);
  app.use('/api/Banque', Banque);
  app.use('/api/Compte', Compte);
  app.use('/api/Client', Client);
  app.use('/api/voiture', Voiture);
app.use('/api/assurance',Assurance);
app.use('/api/prestataireassurance',Prestataireassurance);
app.use('/api/entretien',Entretien);
app.use('/api/entretien_vehicule',Entretienvehicule);
app.use('/api/role', Role);

  const server = app.listen(PORT, (req, res, next) => { console.log(`Server started on port ${PORT}`) })
  app.get('/', (req, res) => {
    res.send(`Server started on port ${PORT}`);
  });
module.exports = server