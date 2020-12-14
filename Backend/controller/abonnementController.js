const { Abonnement, User } = require('../models/relations')
const { Sequelize  } = require('sequelize');
const Op = Sequelize.Op;
const {hasrole ,decodetoken} =require('../middleware/hasrole')
const Joi = require('joi');

module.exports = {
    getabonnement: async (req, res) => {
        try {
            const token = req.headers.authorization.split(" ")[1];

            whereclause={
              }
            if(!hasrole('Administrateur',token)) {
              whereclause['SocieteID']=decodetoken(token).societeID
         
            }
            const abonnement = await Abonnement.findAll({ where: whereclause })
            if (abonnement) {
                res.status(200).json({ abonnement })
            }
        } catch (err) {
            res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })

        }
    },
    addabonnement: async (req, res) => {
        try {
            const schema = Joi.object({
               
                
                DateDebut :Joi.date().required().messages({
                    "any.required": `Date debut est obligatoire`,
                    "date.base":'invalid date format',

                  }),
                DateFin :Joi.date().required().messages({
                    "any.required": `Date fin est obligatoire`,
                    "date.base":'invalid date format',

                  }),
                Montant :Joi.number().required().messages({
                    "any.required": `Montant est obligatoire`,

                  }),
                Duree:Joi.number().required().messages({
                    "any.required": `Duree est obligatoire`,

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
              return  res.status(401).json({ msg: 'vous n\'etes pas autorisé a effuctuer cette tache' })

         
            }
            const lastabonnement = await Abonnement.findAll({
                where:whereclause
                ,
                 [Op.or]:[{
                    DateDebut: {[Op.between] :[new Date(req.body.DateDebut), new Date(req.body.DateFin)]}},
                      {
                      DateFin:
                       
                       { [Op.between]: [new Date(req.body.DateDebut), new Date(req.body.DateFin)]
                    }
                 }]
                }
            )
            if(lastabonnement.length !==0){
                return res.json({msg:'La société à déjà un abonnement pour la periode spécifiée' ,ok :false})
            }

            const abonnement = await Abonnement.create({
                DateDebut: req.body.DateDebut,
                DateFin: req.body.DateFin,
                Montant: req.body.Montant,
                Duree: req.body.Duree,
                SocieteID: req.params.id,
                AdminID:decodetoken(token).userID
            })
            if (abonnement) {
                res.status(200).json({ abonnement, ok: true })
await User.update({HasActivity :true},{where :{ID : req.params.id}})





            }
        } catch (err) {
            res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })

        }
    },
    updateabonnement: async (req, res) => {
        try {
            const schema = Joi.object({
               
                
                DateDebut :Joi.date().required().messages({
                    "any.required": `Date debut est obligatoire`,
                    "date.base":'invalid date format',

                  }),
                DateFin :Joi.date().required().messages({
                    "any.required": `Date fin est obligatoire`,
                    "date.base":'invalid date format',

                  }),
                Montant :Joi.number().required().messages({
                    "any.required": `Montant est obligatoire`,

                  }),
                Duree:Joi.number().required().messages({
                    "any.required": `Duree est obligatoire`,

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
            const lastabonnement = await Abonnement.findAll({
                where:whereclause
               

,
                 [Op.or]:[{
                    DateDebut: {[Op.between] :[new Date(req.body.DateDebut), new Date(req.body.DateFin)]}},
                      {
                      DateFin:
                       
                       { [Op.between]: [new Date(req.body.DateDebut), new Date(req.body.DateFin)]
                    }
                 }]



                   
                   
                     



                }


 
            )



            if(lastabonnement.length !==0){
                return res.json({msg:'La société à déjà un abonnement pour la periode spécifiée' ,ok :false})
            }
            const abonement = await Abonnement.update(req.body, {
                where: {
                    ID: req.body.ID
                }
            })
            if (abonement) {
                res.status(200).json({ abonnement :abonement,ok:true })
            }
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    }
}