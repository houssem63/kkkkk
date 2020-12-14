const { Entretien } = require('../models/relations')
const Joi = require('joi');

module.exports ={
    getall:async(req,res)=>{
try {
    console.log(req.query)
    const pageSize = !isNaN(req.query.pagesize) ?+req.query.pagesize :null;
    const currentPage = !isNaN( req.query.page)  ?+req.query.page :null;
    const entretien =await Entretien.findAll({
        limit: pageSize?pageSize:null,
        offset:currentPage? pageSize * (currentPage - 1):null
    })
    if(entretien){
        const count = await Entretien.count()
        res.status(200).json({entretien,count})

    }
} catch (err) {
    console.log(err)
    res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
}
    },
    ajouter:async(req,res)=>{
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
            const entretien =await Entretien.create(req.body)

            if(entretien){
                const count=await Entretien.count()
                res.status(200).json({entretien :entretien,count})
            }
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    Delete :async(req,res)=>{
        try {
          await  Entretien.destroy({where:{
            ID:req.params.id
        }})   
        res.status(200).json({msg:'Entretien supprimé avec succès'})
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
          await  Entretien.update(req.body,{where:{
            ID:req.params.id
        }})   
        res.status(200).json({msg:'Entretien mis à jour avec succès'})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }}
}