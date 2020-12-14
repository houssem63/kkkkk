const { ModePaiement}=require('../models/relations')
const Joi = require('joi');

module.exports ={
    add:async(req,res)=>{
        try {
            const schema = Joi.object({
               
                Libelle:Joi.string().required().messages({
                    "any.required": `Libelle est obligatoire`
                  }),
              
         
               }).options({ allowUnknown: true })
               const { error, value } = schema.validate(req.body);
               if (error) {
                 return res.json({msg:error.message})
                 // on fail return comma separated errors
                // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
             } 
           
            const mode=await ModePaiement.create(req.body)
if(mode){
    res.status(200).json({mode ,msg:'Mode paiement ajouté avec succes' ,ok :true})
}
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    Delete:async(req,res)=>{
        try {
            const mode =await ModePaiement.destroy({where:{ID:req.params.id}})
            if(mode){
                res.status(200).json({msg:'Mode paiement supprimer avec succes' ,ok :true})
    
            }
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
       
    },
    Getall:async(req,res)=>{
        try {
            console.log(req.query)
            const pageSize = !isNaN(req.query.pagesize) ?+req.query.pagesize :null;
            const currentPage = !isNaN( req.query.page)  ?+req.query.page :null;
            const mode =await ModePaiement.findAll({
                limit: pageSize,
                offset: pageSize * (currentPage - 1)
            })
            if(mode){
                const count = await ModePaiement.count()
                res.status(200).json({mode,count})
    
            }
        } catch (err) {
       
console.log(err)
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    Getonebyid:async(req,res)=>{
        try {
            const mode =await ModePaiement.findAll({where:{ID:req.params.id}})
            if(mode){
                res.status(200).json({mode:mode[0]})
    
            } 
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
              
         
               }).options({ allowUnknown: true })
               const { error, value } = schema.validate(req.body);
               if (error) {
                
                 return res.json({msg:error.message})
                 // on fail return comma separated errors
                // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
             } 
            const edit =await ModePaiement.update(req.body,{where:{ID:req.params.id}})
const mode = await ModePaiement.findAll({where:{ID:req.params.id}})
            if(mode){
                res.status(200).json({mode:mode[0],ok:true})
    
            } 
        } catch (err) {
        
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    }
}