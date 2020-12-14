const { Compte ,Banque } =require('../models/relations')
const Joi = require('joi');

module.exports={
    ajouter:async (req,res)=>{
        try{
            const schema = Joi.object({
               
                
               RIB:Joi.string().required().messages({
                "any.required": `RIB est obligatoire`
              }),
            
            

               }).options({ allowUnknown: true })
               const { error, value } = schema.validate(req.body);
               if (error) {
                 return res.json({msg:error.message})
                 // on fail return comma separated errors
                // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
             } 
            
            const body=req.body
const compte = await   Compte.create(body)
const compteres = await Compte.findAll({where :{
    ID :compte.ID
},include :[Banque]})
if(compteres){
    res.json({ compte:compteres[0]})
}        }catch(e){
    res.status(500).json({err:'Erreur au niveau de serveur : ' + e})
}
        
    
           
       
    },
    Delete:(req,res)=>{
    
        Compte.destroy({
            where: {
              ID: req.params.id
            }
          }).then((responce)=>{
              res.status(200).json({msg:'Compte supprimé avec succès'})
          }).catch((err)=>{
              res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
          })
    },
    Update:(req,res)=>{
        const schema = Joi.object({
               
            RIB:Joi.string().required().messages({
                "any.required": `RIB est obligatoire`
              }),
           
         

            }).options({ allowUnknown: true })
            const { error, value } = schema.validate(req.body);
            if (error) {
              return res.json({msg:error.message})
              // on fail return comma separated errors
             // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
          } 
         
         
        const body =req.body
        Compte.update(body, {
            where: {
              ID: req.params.id
            }}).then(async(responce)=>{
                const compte =await Compte.findOne({
                    where :{ID :req.params.id},
                    include:[Banque]
                })
                res.status(200).json({compte, msg:'Compte mis à jour avec succès' ,ok:true})
            }).catch((err)=>{
                res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
            })
    },
    Getall:(req,res)=>{
        Compte.findAll({where:{
            userID :req.params.id
        } ,include :[Banque]}).then((responce)=>{
            res.status(200).json({compte :responce})
        }).catch((err)=>{
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        })
    },
    Getonebyid:(req,res)=>{
        Compte.findAll({
            where :{
                ID:req.params.id,
               
            }
        }).then((responce)=>{
            res.status(200).json({compte :responce[0]})
        }).catch((err)=>{
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        })
    }

}