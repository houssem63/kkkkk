const { Detailchargevehicule } =require('../models/relations')
const Joi = require('joi');

module.exports={
add :async(req,res) => {
    try {
        const schema = Joi.object({
               
                
          
            Montant:Joi.number().required().messages({
                "any.required": `Montant est obligatoire`
              }),
            Echeance:Joi.string().required().messages({
                "any.required": `Echeance est obligatoire`,
                
              }),
            DateOperation:Joi.date().required().messages({
                "any.required": `Date operation est obligatoire`,
                "date.base":'invalid date format',

              }),
           // DatePaiementEffectif:Joi.string().required(),

            }).options({ allowUnknown: true })
            const { error, value } = schema.validate(req.body);
            if (error) {
              return res.json({msg:error.message})
              // on fail return comma separated errors
             // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
          } 
         
        const detail =await Detailchargevehicule.create(req.body)
if(detail){
    res.status(200).json({detailchargevehicule:detail})
}
    } catch (err) {
        res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

    }
},
update:async(req,res)=>{
    try {
        const schema = Joi.object({
               
                
          
      
            Montant:Joi.number().required().messages({
                "any.required": `Montant est obligatoire`
              }),
            Echeance:Joi.string().required().messages({
                "any.required": `Echeance est obligatoire`,
                
              }),
            DateOperation:Joi.date().required().messages({
                "any.required": `Date operation est obligatoire`,
                "date.base":'invalid date format',

              }),
           // DatePaiementEffectif:Joi.string().required(),

            }).options({ allowUnknown: true })
            const { error, value } = schema.validate(req.body);
            if (error) {
              return res.json({msg:error.message})
              // on fail return comma separated errors
             // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
          } 
        const detail=await Detailchargevehicule.findAll({where:{ID:req.params.id}})
        detail.forEach(element => {
            
        });
        const updated=await Detailchargevehicule.update(req.body,{where:{ID:req.params.id}})
        if(updated){
            res.status(200).json({ok:true})
        }
    } catch (err) {
        res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
    }
},
delete:async(req,res)=>{
    try {
        const deletedetail=await Detailchargevehicule.destroy({where:{ID:req.params.id}})
        if(deletedetail){
            res.status(200).json({ok:true})
        }
    } catch (err) {
        res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

    }
}

}