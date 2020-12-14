const express = require('express');
var logger = require('morgan');
const path = require('path');
require('dotenv').config()
const {
  User
 
} = require("./models/relations");
const {PORT}=require('./constant')|| 5000;
const bodyParser = require('body-parser')

const app = express();
require('./DB/db')
const Userroute = require('./routes/user');
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
const ModePaiement = require('./routes/modepaiement');
const Detailchargevehicule = require('./routes/Detailchargevehicule');
const CarteExploitation = require('./routes/carteexploitation');
const Vignette=require('./routes/vignette');
const Viste = require('./routes/visite');
const Frais = require('./routes/frais');
const Mission = require('./routes/mission');
const Fournisseur = require('./routes/fournisseur');
const Marque = require('./routes/marque');

console.log(process.env.NODE_ENV )
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
    " Origin , X-Requested-With, Content-Type, Accept , Authorization");
    res.setHeader("Access-Control-Allow-Methods",
     " POST, GET , DELETE ,PUT, OPTIONS");
    next();
  });
  app.use(logger('dev'));
  app.use(express());
  app.use(express.json());
  app.use("/images", express.static(__dirname + '/' + 'images'))
  app.use(express.urlencoded({ extended: false }));
  app.use('/api/user', Userroute);
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
app.use('/api/modepaiement', ModePaiement);
app.use('/api/viste', Viste);
app.use('/api/carte_exploitation', CarteExploitation);
app.use('/api/vignette', Vignette);
app.use('/api/frais', Frais);
app.use('/api/mission', Mission);
app.use('/api/fournisseur', Fournisseur);
app.use('/api/marque', Marque);

app.use('/api/detailchargevehicule', Detailchargevehicule);

  const server = app.listen(PORT, (req, res, next) => { console.log(`Server started on port ${PORT}`) })
  app.get('/', (req, res) => {
    res.send(`Server started on port ${PORT}`);
  });
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
  }})
  
  io.on('connection', (socket) => {
    console.log('a user connected'+socket);
    User.afterCreate(function (instance){
      io.emit('new-message','changed');
  
  })
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
module.exports = server