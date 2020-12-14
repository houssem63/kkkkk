const { decode } = require('jsonwebtoken');
const { PrestataireAssurance  ,Assurance, User} =require('../models/relations')
const {hasrole ,decodetoken} =require('../middleware/hasrole')
const Joi = require('joi');

module.exports={
    ajoute :async(req,res)=>{
        try{
            const schema = Joi.object({
               
                Libelle:Joi.string().required().messages({
                    "any.required": `Libelle est obligatoire`
                  }),
                 
                  Adresse :Joi.string().required(),
                
                  Tel:Joi.string().length(8).required().messages({
                    'string.length':'Le numéro de téléphone doit contenir 8 chiffres',
        
                    "any.required": `Telephone est obligatoire`
                  }),
        
              }).options({ allowUnknown: true })
              const { error, value } = schema.validate(req.body);
              if (error) {
                return res.json({msg:error.message})
                // on fail return comma separated errors
               // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
            } 
            const token = req.headers.authorization.split(" ")[1];

    
          const body =req.body;
          const pre ={
              Libelle:req.body.Libelle,
              Adresse :req.body.Adresse,
              Site:req.body.Site,
              Tel:req.body.Tel,
              SocieteID:decodetoken(token).societeID
          }
        const prestataire=await PrestataireAssurance.create(pre)    
        if(prestataire){
            res.status(200).json({prestataire})
        }  
        }
        
      catch (err) {
        res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
    }},
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
          
           const prestataire= await PrestataireAssurance.findAll({where:
           whereclause,
           limit: pageSize,
           offset: pageSize * (currentPage - 1)
        });
           if(prestataire.lenght !=0){
             const count=await PrestataireAssurance.count()
               res.status(200).json({prestataire,count})
           }
        } catch (err) {
            res.status(500).json({err})
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
          
       const prestataire=await     PrestataireAssurance.findAll({where:whereclause})
            if(prestataire.lenght !=0){
                res.status(200).json({prestataire:prestataire[0]})
            }
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        }
    },
    update:async(req,res)=>{
try {
    const schema = Joi.object({
      
        Libelle:Joi.string().required().messages({
            "any.required": `Libelle est obligatoire`
          }),
         
          Adresse :Joi.string().required(),
         
          Tel:Joi.string().length(8).required().messages({
            'string.length':'Le numéro de téléphone doit contenir 8 chiffres',

            "any.required": `Telephone est obligatoire`
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
    const prestataire =await PrestataireAssurance.update(req.body,{where:whereclause})
res.status(200).json({msg : 'Prestataire mis à jour avec succès' ,ok:true})} 
catch (err) {
    res.status(500).json({err})
}
    },
    delete:async(req,res)=>{
        try {
            const token = req.headers.authorization.split(" ")[1];

            whereclause={
                ID:req.params.id
              }
            if(!hasrole('Administrateur',token)) {
              whereclause['SocieteID']=decodetoken(token).societeID
         
            }
            let assurance =[];
             assurance  =await Assurance.findAll({where:{
                prestataireassuranceID :req.params.id
            }}) 
            if(assurance[0] ===undefined){
                await PrestataireAssurance.destroy({where :whereclause}) 
                res.status(200).json({ms:'Prestataire supprimé avec succès',ok :true})
            }else{
               
                res.json({msg :'Le prestataire est déjà utilisé dans des assurances, vous ne pouvez pas le supprimé' ,ok:false})

            }
           
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    }
}