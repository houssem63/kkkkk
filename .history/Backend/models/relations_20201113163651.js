const { Sequelize } = require('sequelize');
const db = require('../DB/db')
const userModel = require('./user')

const banqueModel = require('./banque')
const comptemodel = require('./compte')
const historiqueEmbauchesmodel = require('./historiqueEmbauche')
const postemodel = require('./poste')
const rolemodel = require('./role')
const voituremodel = require('./voiture')
const assurancemodel = require('./assurance')
const prestataireassrancemodel = require('./prestataireassurance')
const entretienmodel = require('./entretien')
const entretienvehiculemodel = require('./entretienvehicule')
const marquevoituremodel = require('./marque-voiture')
const user_rolemodel=require('./user_role')
const abonnementmodel=require('./abonnement')
const modepaiementmodel=require('./modepaiment')

const User = userModel(db, Sequelize)
const Role = rolemodel(db, Sequelize)
const Banque = banqueModel(db, Sequelize)
const Compte = comptemodel(db, Sequelize)
const HistoriqueEmbauches = historiqueEmbauchesmodel(db, Sequelize)
const Poste = postemodel(db, Sequelize)
const Voiture = voituremodel(db, Sequelize)
const Assurance = assurancemodel(db, Sequelize)
const PrestataireAssurance = prestataireassrancemodel(db, Sequelize)
const Entretien = entretienmodel(db, Sequelize)
const Entretienvehicule = entretienvehiculemodel(db, Sequelize)
const Marquevoiture = marquevoituremodel(db, Sequelize)
const ModePaiement = modepaiementmodel(db, Sequelize)

const User_Role = user_rolemodel(db,Sequelize)
const Abonnement =abonnementmodel(db,Sequelize)

//relation entre Societe et Compte
User.hasMany(Compte)
Compte.belongsTo(User)
//relation entre banque et compte
Banque.hasMany(Compte)
Compte.belongsTo(Banque)
//relation entre historiqueEmbauches et Personnel
HistoriqueEmbauches.belongsTo(User,{foreignKey:'societeID' ,references: {
    model: 'users',
    key: 'ID'
  }})
  User.hasMany(HistoriqueEmbauches,{foreignKey:'societeID' })

//relation entre historiqueEmbauches et Poste
Poste.hasMany(HistoriqueEmbauches)
HistoriqueEmbauches.belongsTo(Poste ,{onDelete: 'CASCADE'})
//relation entre societe et poste
User.hasMany(Poste)
Poste.belongsTo(User)
//relation entre societe et voiture
User.hasMany(Voiture)
Voiture.belongsTo(User)
//relation entre assurance et voiture
Voiture.hasMany(Assurance)
Assurance.belongsTo(Voiture)
//relation entre assurance et voiture
User.hasMany(Assurance)
Assurance.belongsTo(User)
//relation entre assurance et prestatire_assurance
PrestataireAssurance.hasMany(Assurance)
Assurance.belongsTo(PrestataireAssurance)


//relation entre User et role
User.belongsToMany(Role, {
    through: "user_roles",
    as: "roles",
    foreignKey: "userID",
    references: {
        model: 'users',
        key: 'ID'
      },
      onDelete: 'CASCADE',

})
User_Role.belongsTo(User)

Role.belongsToMany(User, {
    through: "user_roles",
    as: "users",
    foreignKey: "roleID",
    references: {
        model: 'roles',
        key: 'ID'
      },
      onDelete: 'CASCADE',

})
User_Role.belongsTo(Role)
//relation entre vehicule et entretien
Voiture.belongsToMany(Entretien, {
    through: {model :"entretien_vehicule",      
    unique:false
},
    as: "entretien",
    foreignKey: "voitureID",
    references: {
        model: 'voitures',
        key: 'ID'
      },

      onDelete: 'CASCADE',


})
Entretien.belongsToMany(Voiture, {
    through: {model :"entretien_vehicule",      
    unique:false
},
    as: "voitures",
    foreignKey: "entretienID",
    references: {
        model: 'entretien',
        key: 'ID'
      },
      onDelete: 'CASCADE',

})
//Entretienvehicule.belongsTo(Voiture)
Entretienvehicule.belongsTo(Entretien)
//relation entre user et entretien
User.hasMany(Entretienvehicule)
Entretienvehicule.belongsTo(User)

User.hasMany(Abonnement)
Abonnement.belongsTo(User,{onDelete: 'CASCADE',})

db.sync({ force: true }).then(() => {
    console.log('table created !!!!!!')
}).catch(e=>{
    console.log(e)
})
module.exports = {
    User,
    Role,
    Poste,
    Banque,
    HistoriqueEmbauches,
    Compte,
    Voiture,
    Assurance,
    User_Role,
    PrestataireAssurance,
    Entretien,
    Entretienvehicule,
    Marquevoiture,
    Abonnement,
    ModePaiement

}