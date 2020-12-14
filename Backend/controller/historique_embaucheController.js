const { HistoriqueEmbauches ,Poste} =require('../models/relations')
const {hasrole ,decodetoken} =require('../middleware/hasrole')
const Joi = require('joi');

module.exports={
    ajouter: async(req,res)=>{
        try{
          const schema = Joi.object({
               
            
            DateEmbauche:Joi.date().required().messages({
              "any.required": `Date embauche est obligatoire`,
              "date.base":'invalid date format',

            }),
        
          Salaire:Joi.number().required().messages({
            "any.required": `Salaire est obligatoire`
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
                PersonnelID:req.body.PersonnelID

              }
            if(!hasrole('Administrateur',token)) {
              whereclause['SocieteID']=decodetoken(token).societeID
         
            }
       const Embauches =await HistoriqueEmbauches.findAll({where :whereclause
            })
            if(Embauches.length != 0){
                if(Embauches[(Embauches.length)-1].DateSortie ===null){
              return res.json({msg:'vous etes encore travaille'})
                }
            }
                req.body.SocieteID=decodetoken(token).societeID
            
        const newembauche =  await  HistoriqueEmbauches.create(req.body)
        const embaucheres =await HistoriqueEmbauches.findAll({
            where:{ID :newembauche.ID},include : [Poste]
        })
        res.json({ historique:embaucheres[0]})
    }catch(err){
      
        res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
    }
    },
    Delete:(req,res)=>{
        const token = req.headers.authorization.split(" ")[1];

        whereclause={
            ID: req.params.id

          }
        if(!hasrole('Administrateur',token)) {
          whereclause['SocieteID']=decodetoken(token).societeID
     
        }
        HistoriqueEmbauches.destroy({
            where:whereclause
          }).then((responce)=>{
              res.status(200).json({msg:'Embauche supprimée avec succès'})
          }).catch((err)=>{
              res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
          })
    },
    Update:async(req,res)=>{
        try{
          const schema = Joi.object({
               
            
            DateEmbauche:Joi.date().required().messages({
              "any.required": `Date embauche est obligatoire`,
              "date.base":'invalid date format',

            }),
       
          Salaire:Joi.number().required().messages({
            "any.required": `Salaire est obligatoire`
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
                ID: req.params.id
    
              }
            if(!hasrole('Administrateur',token)) {
              whereclause['SocieteID']=decodetoken(token).societeID
         
            }
            const body =req.body

     await       HistoriqueEmbauches.update(body, {
                where: whereclause})
                const historiqueupdate = await HistoriqueEmbauches.findAll({where:whereclause,include :[Poste]})
                if(historiqueupdate){
     res.json({historique:historiqueupdate[0]})               
                }


        }catch(err){
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        }
        
    },
    Getall:(req,res)=>{
        const token = req.headers.authorization.split(" ")[1];

        whereclause={

          }
        if(!hasrole('Administrateur',token)) {
          whereclause['SocieteID']=decodetoken(token).societeID
     
        }        HistoriqueEmbauches.findAll({
            where :whereclause,include:[Poste]
        }).then((responce)=>{
            res.status(200).json({HistoriqueEmbauches :responce})
        }).catch((err)=>{
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        })
    },
    Getonebyid:(req,res)=>{
        const token = req.headers.authorization.split(" ")[1];

        whereclause={
            ID:req.params.id

          }
        if(!hasrole('Administrateur',token)) {
          whereclause['SocieteID']=decodetoken(token).societeID
     
        }   
        HistoriqueEmbauches.findAll({
            where :whereclause,include:[Poste]
        }).then((responce)=>{
            res.status(200).json({Historique :responce[0]})
        }).catch((err)=>{
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        })
    },
    gethistoriquedeonepersonnel:(req,res)=>{
        const token = req.headers.authorization.split(" ")[1];

        whereclause={
            PersonnelID:req.params.id
          }
        if(!hasrole('Administrateur',token)) {
          whereclause['SocieteID']=decodetoken(token).societeID
     
        }   
        HistoriqueEmbauches.findAll({
            where :whereclause,
            include:[Poste]}).then(responce=>{
            responce.forEach(h => {
              
            });
            res.json({historique : responce})
        })
    }

}