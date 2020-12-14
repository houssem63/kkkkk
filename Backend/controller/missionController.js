const { Mission, User,Voiture } = require('../models/relations')
const { Sequelize  } = require('sequelize');
const Op = Sequelize.Op;
const {hasrole ,decodetoken} =require('../middleware/hasrole')
const Joi = require('joi');

module.exports = {

add:async(req,res)=>{
    try {
      const schema = Joi.object({
               
    
        Depart:Joi.string().required().messages({
          "any.required": `Depart est obligatoire`
        }),
      Destination:Joi.string().required().messages({
        "any.required": `Destination est obligatoire`
      }),
      Compteur:Joi.number().required().messages({
        "any.required": `Compteur est obligatoire`
      }),
    DateHeureDepart:Joi.date().required().messages({
      "any.required": `Date heure depart est obligatoire`,
      "date.base":'invalid date format',

    }),
    DateHeureArriver:Joi.date().required().messages({
      "any.required": `Date heure arriver est obligatoire`,
      "date.base":'invalid date format',

    }),
    Prixunitaire:Joi.number().required().messages({
      "any.required": `Prixunitaire est obligatoire`
    }),
    MontantFrais:Joi.number().required().messages({
      "any.required": `MontantFrais est obligatoire`
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
req.body.SocieteID=decodetoken(token).societeID
        const mission= await Mission.create(req.body)
        if(mission){
            res.status(200).json({mission})
        }
    } catch (err) {
        res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

    }
},
getall:async(req,res)=>{
    try {
      const token = req.headers.authorization.split(" ")[1];
      const pageSize = !isNaN(req.query.pagesize) ?+req.query.pagesize :null;
      const currentPage = !isNaN( req.query.page)  ?+req.query.page :null;
      whereclause={
        
        }
      if(!hasrole('Administrateur',token)) {
        whereclause['SocieteID']=decodetoken(token).societeID
   
      }
        const mission= await Mission.findAll({
            include:[
                {
                    model: User,
                    as:'client'
                  },
                  {
                    model: User,
                    as:'societe'
                  }, {
                    model: User,
                    as:'chauffeur'
                  }, {
                    model: User,
                    as:'agent'
                  },
                  {
                    model: Voiture,
                    as:'tracteur'
                  },{
                    model: Voiture,
                    as:'remorque'
                  },
        ],where:whereclause,
        limit: pageSize,
                offset: pageSize * (currentPage - 1)})
        if(mission){
          const count =await Mission.count()
            res.status(200).json({mission,count})
        }
    } catch (err) {
        res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

    }
},
getone:async(req,res)=>{
    try {
      const token = req.headers.authorization.split(" ")[1];

      whereclause={
        ID:req.params.id
        }
      if(!hasrole('Administrateur',token)) {
        whereclause['SocieteID']=decodetoken(token).societeID
   
      }
        const mission= await Mission.findAll({
            include:[
                {
                    model: User,
                    as:'client'
                  },
                  {
                    model: User,
                    as:'societe'
                  }, {
                    model: User,
                    as:'chauffeur'
                  }, {
                    model: User,
                    as:'agent'
                  },
                  {
                    model: Voiture,
                    as:'tracteur'
                  },{
                    model: Voiture,
                    as:'remorque'
                  },
        ],where:whereclause})
        if(mission){
            res.status(200).json({mission:mission[0]})
        }
    } catch (err) {
        res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

    }},
    Delete :async(req,res)=>{
        try {
          const token = req.headers.authorization.split(" ")[1];

          whereclause={
            ID:req.params.id
            }
          if(!hasrole('Administrateur',token)) {
            whereclause['SocieteID']=decodetoken(token).societeID
       
          }
          await  Mission.destroy({where:{
           
        }})   
        res.status(200).json({msg:'Mission supprimé avec succès'})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
     
    },
    update :async(req,res)=>{
      try {
        const schema = Joi.object({
               
         
          Depart:Joi.string().required().messages({
            "any.required": `Depart est obligatoire`
          }),
        Destination:Joi.string().required().messages({
          "any.required": `Destination est obligatoire`
        }),
        Compteur:Joi.number().required().messages({
          "any.required": `Compteur est obligatoire`
        }),
      DateHeureDepart:Joi.date().required().messages({
        "any.required": `Date heure depart est obligatoire`,
        "date.base":'invalid date format',
  
      }),
      DateHeureArriver:Joi.date().required().messages({
        "any.required": `Date heure arriver est obligatoire`,
        "date.base":'invalid date format',
  
      }),
      Prixunitaire:Joi.number().required().messages({
        "any.required": `Prixunitaire est obligatoire`
      }),
      MontantFrais:Joi.number().required().messages({
        "any.required": `MontantFrais est obligatoire`
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
          ID:req.params.id
          }
        if(!hasrole('Administrateur',token)) {
          whereclause['SocieteID']=decodetoken(token).societeID
     
        }
        await  Mission.update(req.body,{where:whereclause})   
      res.status(200).json({msg:'Mission modifier avec succès',ok:true})
      } catch (err) {
          res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

      }
   
  },

}