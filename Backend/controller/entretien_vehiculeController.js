const { Entretienvehicule ,Entretien ,User,Voiture,Detailchargevehicule} = require('../models/relations')
const { Sequelize  } = require('sequelize');
const Op = Sequelize.Op;
const {hasrole ,decodetoken} =require('../middleware/hasrole')
const Joi = require('joi');

module.exports ={
    getall:async(req,res)=>{
try {


    const token = req.headers.authorization.split(" ")[1];

    whereclause={
      }
    if(!hasrole('Administrateur',token)) {
     whereclause['SocieteID']=decodetoken(token).societeID
 
    }          
    const voiture = await Voiture.findOne({
               
            
        
          where: whereclause

    })
if(!voiture){
return  res.status(401).json({ msg: 'vous n\'etes pas autorisé a effuctuer cette tache' })

}









    const entretienvoiture =await Entretienvehicule.findAll({where :{
        voitureID :req.params.id,
        DateProchainEntretien: {[Op.gte]: new Date()}
    },include:[Entretien,Detailchargevehicule,{model:User,attributes:['Nom', 'Prenom']}]})
    if(entretienvoiture){
        res.status(200).json({entretienvoiture :entretienvoiture})
    }
} catch (err) {
    res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
}
    },
    ajouter:async  (req,res)=>{
      try {
        const schema = Joi.object({
               
                
          
            Montant:Joi.number().required().messages({
                "any.required": `Montant est obligatoire`
              }),
            DatedebutOperation: Joi.date().required().messages({
                "any.required": `Date debut operation est obligatoire`,
                "date.base":'invalid date format',

              }),
            DatefinOperation: Joi.date().required().messages({
                "any.required": `Date fin operation est obligatoire`,
                "date.base":'invalid date format',

              }),
            Montantentretien :Joi.number().required().messages({
                "any.required": `Montant entretien est obligatoire`
              }),
            PieceRechange:Joi.string().required().messages({
                "any.required": `Piece rechange est obligatoire`
              }),
            MontantPieceRechange: Joi.number().required().messages({
                "any.required": `Montant Piece Rechange est obligatoire`
              }),
            MainOEuvre: Joi.number().required().messages({
                "any.required": `Main OEuvre est obligatoire`
              }),
            AgentEntretien: Joi.string().required().messages({
                "any.required": `Agent entretien est obligatoire`
              }),
            KilomettrageArret: Joi.number().required().messages({
                "any.required": `Kilomettrage arret est obligatoire`
              }),
            KilomettrageLimite: Joi.number().required().messages({
                "any.required": `Kilomettrage limite est obligatoire`
              }),
            DateProchainEntretien: Joi.date().required().messages({
                "any.required": `Date Prochain Entretien est obligatoire`,
                "date.base":'invalid date format',

              }),
            Remarques: Joi.string().required().messages({
                "any.required": `Libelle est obligatoire`
              }),

            }).options({ allowUnknown: true })
            const { error, value } = schema.validate(req.body);
            if (error) {
              return res.json({msg:error.message})
              // on fail return comma separated errors
             // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
          }
         
           const entretien_vehicule ={
            DatedebutOperation: req.body.DatedebutOperation,
            DatefinOperation: req.body.DatefinOperation,
            Montantentretien:req.body.Montantentretien,
            PieceRechange: req.body.PieceRechange,
            MontantPieceRechange: req.body.MontantPieceRechange,
            MainOEuvre: req.body.MainOEuvre,
            AgentEntretien: req.body.AgentEntretien,
            KilomettrageArret: req.body.KilomettrageArret,
            KilomettrageLimite: req.body.KilomettrageLimite,
            DateProchainEntretien: req.body.DateProchainEntretien,
            Remarques: req.body.Remarques,
            voitureID: req.body.voitureID,
            entretienID: req.body.entretienID,
            PersonnelID:req.body.PersonnelID,
           }
      const entretien =await Entretienvehicule.create(entretien_vehicule
       
        )
 

        const entr = await Entretienvehicule.findAll({where:{
            ID :entretien.ID
        },include :[Entretien,Detailchargevehicule]})

res.status(200).json({entretienvoiture:entr[0],ok:true})
           
       } catch (err) {
           res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        }        
          //  

           // if(entretienvoiture){
           //     res.status(200).json({entretienvoiture :entretienvoiture})
           // }        
    },
    Delete :async(req,res)=>{
        try {
            const token = req.headers.authorization.split(" ")[1];

            whereclause={
              }
            if(!hasrole('Administrateur',token)) {
             whereclause['SocieteID']=decodetoken(token).societeID
         
            }          
            const voiture = await Voiture.findOne({
                       
                    
                
                  where: whereclause

            })
if(!voiture){
    return  res.status(401).json({ msg: 'vous n\'etes pas autorisé a effuctuer cette tache' })

}
          await  Entretienvehicule.destroy({where:{
            ID:req.params.id
        }})   
        res.status(200).json({msg:'Entretien pour véhicule désactivé avec succès'})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
     
    },
    Update:async(req,res)=>{
        try {
            const schema = Joi.object({
               
                
          
                Montant:Joi.number().required().messages({
                    "any.required": `Montant est obligatoire`
                  }),
                DatedebutOperation: Joi.date().required().messages({
                    "any.required": `Date debut operation est obligatoire`,
                    "date.base":'invalid date format',

                  }),
                DatefinOperation: Joi.date().required().messages({
                    "any.required": `Date fin operation est obligatoire`,
                    "date.base":'invalid date format',

                  }),
                Montantentretien :Joi.number().required().messages({
                    "any.required": `Montant entretien est obligatoire`
                  }),
                PieceRechange:Joi.string().required().messages({
                    "any.required": `Piece rechange est obligatoire`
                  }),
                MontantPieceRechange: Joi.number().required().messages({
                    "any.required": `Montant Piece Rechange est obligatoire`
                  }),
                MainOEuvre: Joi.number().required().messages({
                    "any.required": `Main OEuvre est obligatoire`
                  }),
                AgentEntretien: Joi.string().required().messages({
                    "any.required": `Agent entretien est obligatoire`
                  }),
                KilomettrageArret: Joi.number().required().messages({
                    "any.required": `Kilomettrage arret est obligatoire`
                  }),
                KilomettrageLimite: Joi.number().required().messages({
                    "any.required": `Kilomettrage limite est obligatoire`
                  }),
                DateProchainEntretien: Joi.date().required().messages({
                    "any.required": `Date Prochain Entretien est obligatoire`,
                    "date.base":'invalid date format',

                  }),
                Remarques: Joi.string().required().messages({
                    "any.required": `Libelle est obligatoire`
                  }),
    
                }).options({ allowUnknown: true })
                const { error, value } = schema.validate(req.body);
                if (error) {
                  return res.json({msg:error.message})
                  // on fail return comma separated errors
                 // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
              } 
            const token = req.headers.authorization.split(" ")[1];

            whereclause={
              }
            if(!hasrole('Administrateur',token)) {
             whereclause['SocieteID']=decodetoken(token).societeID
         
            }          
            const voiture = await Voiture.findOne({
                       
                    
                
                  where: whereclause

            })
if(!voiture){
    return  res.status(401).json({ msg: 'vous n\'etes pas autorisé a effuctuer cette tache' })

}
          await  Entretienvehicule.update(req.body,{where:{
            ID:req.params.id
        }})   
        res.status(200).json({msg:'Entretien pour véhicule mis à jour avec succès'})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }},
        getone :async(req,res)=>{
            try {
                const entretienvehicule =await Entretienvehicule.findOne({where:{ID:req.params.id},
                    include:[Entretien,Detailchargevehicule,{model:User,attributes:['Nom', 'Prenom','ID']}]})
                res.status(200).json({entretienvoiture:entretienvehicule})
            } catch (err) {
                res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
    
            }
        }
}