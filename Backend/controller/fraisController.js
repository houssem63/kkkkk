const { Frais } = require('../models/relations')
const Joi = require('joi');

module.exports ={
    getall:async(req,res)=>{
try {
    const frais =await Frais.findAll({})

    if(frais){
        res.status(200).json({Frais :frais})
    }
} catch (err) {
    res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
}
    },
    ajouter:async(req,res)=>{
        try {
            const schema = Joi.object({
               
                Libelle:Joi.string().required().messages({
                    "any.required": `Libelle est obligatoire`
                  }),
               
        
        Montant:Joi.number().required().messages({
            "any.required": `Montant est obligatoire`
          }),
           Type: Joi.string().required().messages({
            "any.required": `Montant est obligatoire`
          }),
            
        
         
               }).options({ allowUnknown: true })
               const { error, value } = schema.validate(req.body);
               if (error) {
                 return res.json({msg:error.message})
                 // on fail return comma separated errors
                // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
             }
            const frais =await Frais.create(req.body)

            if(Frais){
                res.status(200).json({Frais :frais})
            }
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    Delete :async(req,res)=>{
        try {
          await  Frais.destroy({where:{
            ID:req.params.id
        }})   
        res.status(200).json({msg:'Frais supprimé avec succès'})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
     
    },
    Update:async(req,res)=>{
        try {
            const schema = Joi.object({
               
                Libelle:Joi.string().required().messages({
                    "any.required": `Libelle est obligatoire`
                  }),
               
        
        Montant:Joi.number().required().messages({
            "any.required": `Montant est obligatoire`
          }),
           Type: Joi.string().required().messages({
            "any.required": `Montant est obligatoire`
          }),
            
        
         
               }).options({ allowUnknown: true })
               const { error, value } = schema.validate(req.body);
               if (error) {
                 return res.json({msg:error.message})
                 // on fail return comma separated errors
                // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
             } 
          await  Frais.update(req.body,{where:{
            ID:req.params.id
        }})   
        res.status(200).json({msg:'Frais mis à jour avec succès'})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }},
        getone:async(req,res)=>{
            try {
                const frais =await Frais.findAll({where:{ID:req.params.id}})
                if(frais){
                    res.status(200).json({Frais :frais[0]})
                }
            } catch (err) {
                res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

            }
        }
}