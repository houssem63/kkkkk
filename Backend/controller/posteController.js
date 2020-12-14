const { Poste,User } =require('../models/relations')
const {hasrole ,decodetoken} =require('../middleware/hasrole')
const Joi = require('joi');

module.exports={
    ajouter:async (req,res,next)=>{
        try {
            const schema = Joi.object({   
                Libelle:Joi.string().required().messages({
                    "any.required": `Libelle est obligatoire`
                  }),              
                  SocieteID:Joi.number().required().messages({
                    "any.required": `SocieteID est obligatoire`
                  }),              
               }).options({ allowUnknown: true })
               const { error, value } = schema.validate(req.body);
               if (error) {
                 return res.json({msg:error.message})
                 // on fail return comma separated errors
                // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
             } 
            const body=req.body

            const token = req.headers.authorization.split(" ")[1];
    
           req.body.SocieteID=decodetoken(token).societeID
           const resq=await Poste.create(body)
           if(resq){
            res.status(200).json({poste:resq})

           }

        } catch (error) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + error})
        }
      
          
        
    },
    Delete:(req,res)=>{
    
        Poste.destroy({
            where: {
              ID: req.params.id
            }
          }).then((responce)=>{
              res.status(200).json({msg:'Poste supprimé avec succès'})
          }).catch((err)=>{
              res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
          })
    },
    Update:(req,res)=>{
        const schema = Joi.object({
               
            Libelle:Joi.string().required().messages({
                "any.required": `Libelle est obligatoire`
              }),
          
              SocieteID:Joi.number().required().messages({
                "any.required": `SocieteID est obligatoire`
              }),
           }).options({ allowUnknown: true })
           const { error, value } = schema.validate(req.body);
           if (error) {
             return res.json({msg:error.message})
             // on fail return comma separated errors
            // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
         } 
        const body =req.body
        const token = req.headers.authorization.split(" ")[1];

        whereclause={
            ID: req.params.id
          }
        if(!hasrole('Administrateur',token)) {
          whereclause['SocieteID']=decodetoken(token).societeID
     
        }
        Poste.update(body, {
            where:whereclause}).then((responce)=>{
                res.status(200).json({msg:'Poste mis à jour avec succès'})
            }).catch((err)=>{
                res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
            })
    },
    Getall:async(req,res)=>{
        try {
          const pageSize = !isNaN(req.query.pagesize) ?+req.query.pagesize :null;
          const currentPage = !isNaN( req.query.page)  ?+req.query.page :null;
            const token = req.headers.authorization.split(" ")[1];

            whereclause={
              }
            if(!hasrole('Administrateur',token)) {
              whereclause['SocieteID']=decodetoken(token).societeID
         
            }
          
            
                 const poste = await Poste.findAll({
                where: whereclause,
                limit: pageSize,
              offset: pageSize * (currentPage - 1)
            })
             if (poste) {
              const count = await Poste.count()

                res.json({ poste,count })
            }
           
            
          
            
        } catch (err) {
console.log(err)
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        }

     
       
    },
    Getonebyid:(req,res)=>{
        const token = req.headers.authorization.split(" ")[1];

        whereclause={
            ID:req.params.id

          }
        if(!hasrole('Administrateur',token)) {
          whereclause['SocieteID']=decodetoken(token).societeID
     
        }
        Poste.findAll({
            where :whereclause
        }).then((responce)=>{
            res.status(200).json({societe :responce})
        }).catch((err)=>{
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        })
    }

}