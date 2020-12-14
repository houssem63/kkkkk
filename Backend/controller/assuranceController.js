const { Assurance ,PrestataireAssurance ,Detailchargevehicule,Voiture }=require('../models/relations')
const {hasrole ,decodetoken} =require('../middleware/hasrole')
const Joi = require('joi');

module.exports ={
    ajoute:async(req, res)=>{
        try {
            const schema = Joi.object({
               
                
                prestataireassuranceID: Joi.number().required().messages({
                    "any.required": `prestataire assurance est obligatoire`
                  }),
                DateOperation: Joi.date().required().messages({
                    "any.required": `Date operation est obligatoire`,
                    "date.base":'invalid date format',

                  }),
                DateDebutValidite: Joi.date().required().messages({
                    "any.required": `Date debut validite est obligatoire`,
                    "date.base":'invalid date format',

                  }),
                DateFinValidite: Joi.date().required().messages({
                    "any.required": `Date fin validite est obligatoire`,
                    "date.base":'invalid date format',

                  }),
                Montant:Joi.number().required().messages({
                    "any.required": `Montant est obligatoire`
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
              const assuranceres= await Assurance.findAll({where :{voitureID:req.body.voitureID}
            })
           if(assuranceres.length !==0){
              if((req.body.DateDebutValidite) < (assuranceres[assuranceres.length-1].DateFinValidite) ){
                return res.json({msg :'Une assurance valide existe déjà pour la période spécifier'})
            }  
           }
           
                      global.CopierAssurance
                        
                        const url = req.protocol + "://" + req.get("host");
                        if (!req.files['CopierAssurance']) {
            
                            this.CopierAssurance = null
            
                        } else {
            
                            this.CopierAssurance = url + "/images/" + req.files['CopierAssurance'][0].filename;
            
                        }
                        const assurancereq = {
                            prestataireassuranceID: req.body.prestataireassuranceID,
                            DateOperation: req.body.DateOperation,
                            DateDebutValidite: req.body.DateDebutValidite,
                            DateFinValidite: req.body.DateFinValidite,
                            Montant: req.body.Montant,
                            voitureID: req.body.voitureID,

                            CopierAssurance: this.CopierAssurance,
                            PersonnelID :req.body.PersonnelID
                        }
            const assurance =await Assurance.create(assurancereq)
            const assuranceresponce =await Assurance.findAll({where:{
                ID:assurance.ID
            },include :[PrestataireAssurance]})
            res.status(200).json({assurance:assuranceresponce[0] ,ok:true})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    getassranceofonevoiture:async(req,res)=>{
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
            const assurances= await Assurance.findAll({where:{voitureID:req.params.id}
                
            ,include:[PrestataireAssurance]})
          
                res.status(200).json({assurance:assurances})
            
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        }
    },
    delete:async(req,res)=>{
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
          await  Assurance.destroy({where:{ID:req.params.id}})
          res.status(200).json({msg:'Assurance supprimée avec succès',ok:true})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    getone :async(req,res)=>{
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
            const assurance =await Assurance.findOne({where:{ID:req.params.id},include:[PrestataireAssurance,
                
                Detailchargevehicule]})
            res.status(200).json({assurance:assurance})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    update:async(req,res)=>{
        try {
            const schema = Joi.object({
               
                
                prestataireassuranceID: Joi.number().required().messages({
                    "any.required": `prestataire assurance est obligatoire`
                  }),
                DateOperation: Joi.date().required().messages({
                    "any.required": `Date operation est obligatoire`,
                    "date.base":'invalid date format',

                  }),
                DateDebutValidite: Joi.date().required().messages({
                    "any.required": `Date debut validite est obligatoire`,
                    "date.base":'invalid date format',

                  }),
                DateFinValidite: Joi.date().required().messages({
                    "any.required": `Date fin validite est obligatoire`,
                    "date.base":'invalid date format',

                  }),
                Montant:Joi.number().required().messages({
                    "any.required": `Montant est obligatoire`
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
            global.CopierAssurance
                        
            const url = req.protocol + "://" + req.get("host");
            if (!req.files['CopierAssurance']) {

                this.CopierAssurance = req.body.CopierAssurance

            } else {

                this.CopierAssurance = url + "/images/" + req.files['CopierAssurance'][0].filename;

            }
            const assurancereq = {
                prestataireassuranceID: req.body.prestataireassuranceID,
                DateOperation: req.body.DateOperation,
                DateDebutValidite: req.body.DateDebutValidite,
                DateFinValidite: req.body.DateFinValidite,
                Montant: req.body.Montant,
                voitureID: req.body.voitureID,

                CopierAssurance: this.CopierAssurance,
                PersonnelID :req.body.PersonnelID
            }
            const assuranceupdated= await Assurance.update(assurancereq,{where :{ID:req.params.id}})
            const assurance =await Assurance.findOne({where:{ID:req.params.id},include:[PrestataireAssurance,
                
                Detailchargevehicule]})
                if(assurance){
                  res.status(200).json({assurance:assurance ,ok:true})   
                }
           
                } catch (err) {
                    res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    }
}