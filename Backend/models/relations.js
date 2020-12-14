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
const detailchargevehiculemodel=require('./detailchargevehicule')
const vistemodel=require('./visite')
const carteexpoitationmodel=require('./carteexploitation')
const vignettemodel=require('./vignette')
const maintenancemodel=require('./maintenance')
const entretienparvehiculemodel=require('./entretienparvehicule')
const fraismodel=require('./frais')
const missionmodel=require('./mission');
const fournisseurmodel=require('./fournissseur');
const resetTokenmodel=require('./resettoken')

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
const Viste = vistemodel(db, Sequelize)
const Maintenance = maintenancemodel(db, Sequelize)


const User_Role = user_rolemodel(db,Sequelize)
const Abonnement =abonnementmodel(db,Sequelize)
const Detailchargevehicule =detailchargevehiculemodel(db,Sequelize)
const Cateexploitaion =carteexpoitationmodel(db,Sequelize)
const Vignette =vignettemodel(db,Sequelize)
const EntretienparVehicule =entretienparvehiculemodel(db,Sequelize)
const Frais =fraismodel(db,Sequelize)
const Mission =missionmodel(db,Sequelize)
const Fournisseur =fournisseurmodel(db,Sequelize)
const ResetToken =resetTokenmodel(db,Sequelize)
//relation entre Societe et Compte
User.hasMany(Compte)
Compte.belongsTo(User)
//relation entre banque et compte
Banque.hasMany(Compte)
Compte.belongsTo(Banque)
//relation entre historiqueEmbauches et Personnel
HistoriqueEmbauches.belongsTo(User,{foreignKey:'PersonnelID' ,references: {
    model: 'users',
    key: 'ID'
  }})
  User.hasMany(HistoriqueEmbauches,{foreignKey:'PersonnelID' ,references: {
    model: 'users',
    key: 'ID'
  }})

Voiture.hasMany(Mission,{as:'tracteur-mission',foreignKey:'IDTracteur',references:{
    model:'voitures',
    key:'ID'
}})

Mission.belongsTo(Voiture,{as:'tracteur',foreignKey:'IDTracteur',references:{
    model:'voitures',
    key:'ID'
}})

Voiture.hasMany(Mission,{as:'remorque-mission',foreignKey:'IDRemorque',references:{
    model:'voitures',
    key:'ID'
}})

Mission.belongsTo(Voiture,{as:'remorque',foreignKey:'IDRemorque',references:{
    model:'voitures',
    key:'ID'
}})

User.hasMany(Mission,{as:'chauffeur-mission',foreignKey:'IDChauffeur',references:{
    model:'users',
    key:'ID'
}})

Mission.belongsTo(User,{as:'chauffeur',foreignKey:'IDChauffeur',references:{
    model:'users',
    key:'ID'
}})

User.hasMany(Mission,{as:'agent-mission',foreignKey:'IDAgent',references:{
    model:'users',
    key:'ID'
}})

Mission.belongsTo(User,{as:'agent',foreignKey:'IDAgent',references:{
    model:'users',
    key:'ID'
}})

User.hasMany(Mission,{as:'client-mission',foreignKey:'IDClient',references:{
    model:'users',
    key:'ID'
}})

Mission.belongsTo(User,{as:'client',foreignKey:'IDClient',references:{
    model:'users',
    key:'ID'
}})


Mission.belongsTo(User,{as:'societe',foreignKey:'SocieteID',references:{
    model:'users',
    key:'ID'
}})

User.hasMany(Mission,{as:'societe-missions',foreignKey:'SocieteID',references:{
    model:'users',
    key:'ID'
}})



//relation entre historiqueEmbauches et Poste
Poste.hasMany(HistoriqueEmbauches)
HistoriqueEmbauches.belongsTo(Poste ,{onDelete: 'CASCADE'})
//relation entre societe et poste
User.hasMany(Poste,{foreignKey:'SocieteID' ,references: {
    model: 'users',
    key: 'ID'
  }})
Poste.belongsTo(User,{foreignKey:'SocieteID' ,references: {
    model: 'users',
    key: 'ID'
  }})
//relation entre societe et voiture
User.hasMany(Voiture,{foreignKey:'SocieteID' ,references: {
    model: 'users',
    key: 'ID'
  }})
Voiture.belongsTo(User,{foreignKey:'SocieteID' ,references: {
    model: 'users',
    key: 'ID'
  }})
//relation entre assurance et voiture
Voiture.hasMany(Assurance)
Assurance.belongsTo(Voiture)
//relation entre assurance et voiture
User.hasMany(Assurance,{foreignKey:'PersonnelID' ,references: {
    model: 'users',
    key: 'ID'
  }})
Assurance.belongsTo(User,{foreignKey:'PersonnelID' ,references: {
    model: 'users',
    key: 'ID'
  }})
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





User.hasMany(PrestataireAssurance,{foreignKey:'SocieteID' ,references: {
    model: 'users',
    key: 'ID'
  }})
PrestataireAssurance.belongsTo(User,{foreignKey:'SocieteID' ,references: {
    model: 'users',
    key: 'ID'
  }})

  User.hasMany(Fournisseur,{foreignKey:'SocieteID' ,references: {
    model: 'users',
    key: 'ID'
  }})
Fournisseur.belongsTo(User,{foreignKey:'SocieteID' ,references: {
    model: 'users',
    key: 'ID'
  }})













//relation entre vehicule et entretien
Voiture.belongsToMany(Entretien, {
    through: {model :"entretien_vehicule",    model:"entretienparvehicule",  
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
    through: {model :"entretien_vehicule", model:"entretienparvehicule",     
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

Entretien.hasMany(EntretienparVehicule)
Voiture.hasMany(EntretienparVehicule)
EntretienparVehicule.belongsTo(Entretien)
EntretienparVehicule.belongsTo(Voiture)

Voiture.hasMany(Viste)
Viste.belongsTo(Voiture)
Voiture.hasMany(Vignette)
Vignette.belongsTo(Voiture)
Entretienvehicule.belongsTo(Voiture)
Entretienvehicule.belongsTo(Entretien)
//relation entre user et entretien
User.hasMany(Entretienvehicule,{foreignKey:'PersonnelID' ,references: {
    model: 'users',
    key: 'ID'
  }})
Entretienvehicule.belongsTo(User,{foreignKey:'PersonnelID' ,references: {
    model: 'users',
    key: 'ID'
  }})

User.hasMany(Abonnement,{foreignKey:'SocieteID' ,references: {
    model: 'users',
    key: 'ID'
  }})
Abonnement.belongsTo(User,{foreignKey:'SocieteID' ,references: {
    model: 'users',
    key: 'ID'},
  onDelete: 'CASCADE'})



ModePaiement.hasMany(Detailchargevehicule)
Detailchargevehicule.belongsTo(ModePaiement)

Entretienvehicule.hasMany(Detailchargevehicule)
Detailchargevehicule.belongsTo(Entretienvehicule)

Assurance.hasMany(Detailchargevehicule)
Detailchargevehicule.belongsTo(Assurance)


Viste.hasMany(Detailchargevehicule)
Detailchargevehicule.belongsTo(Viste,{onDelete: 'CASCADE'})

Vignette.hasMany(Detailchargevehicule)
Detailchargevehicule.belongsTo(Vignette)
Banque.hasMany(Detailchargevehicule)
Detailchargevehicule.belongsTo(Banque)
Voiture.hasMany(Cateexploitaion)
Cateexploitaion.belongsTo(Voiture)

Maintenance.hasMany(Detailchargevehicule)
Detailchargevehicule.belongsTo(Maintenance)


Cateexploitaion.hasMany(Detailchargevehicule)
Detailchargevehicule.belongsTo(Cateexploitaion)

 




Voiture.hasMany(Maintenance)
Maintenance.belongsTo(Voiture)
User.hasMany(Maintenance,{foreignKey:'PersonnelID' ,references: {
    model: 'users',
    key: 'ID'
  }})
Maintenance.belongsTo(User,{foreignKey:'PersonnelID' ,references: {
    model: 'users',
    key: 'ID'
  }})
db.sync({ alter: true }).then(() => {
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
    ModePaiement,
    Detailchargevehicule,
    Viste,
    Cateexploitaion,
    Vignette,
    Maintenance,
    EntretienparVehicule,
    Frais,
    Mission,
    Fournisseur,
    ResetToken
    

}