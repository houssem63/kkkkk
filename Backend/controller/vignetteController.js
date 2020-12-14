const { Vignette,Detailchargevehicule }=require('../models/relations')
const Joi = require('joi');

module.exports ={
    ajoute:async(req, res)=>{
        try {
            const schema = Joi.object({
                DateOperation:Joi.date().required().messages({
                    "date.base":'invalid date format',

                    "any.required": `Date operation est obligatoire`
                  }),
                DateDebutValidite:Joi.date().required().messages({
                    "date.base":'invalid date format',

                    "any.required": `Date debut validite est obligatoire`
                  }),
                DateFinValidite:Joi.date().required().messages({
                    "date.base":'invalid date format',

                    "any.required": `Date fin validite est obligatoire`
                  }),
                userID:Joi.string().required().messages({

                    "any.required": `userID est obligatoire`
                  }),
                voitureID: Joi.string().required().messages({

                    "any.required": `voitureID est obligatoire`
                  }),
             
        
              }).options({ allowUnknown: true })
              const { error, value } = schema.validate(req.body);
              if (error) {
                return res.json({msg:error.message})
                // on fail return comma separated errors
               // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
            } 
           const Vignetteres= await Vignette.findAll({where :{ voitureID: req.body.voitureID,
            }})
          if(Vignetteres.length !==0){
              if((req.body.DateDebutValidite) < (Vignetteres[Vignetteres.length-1].DateFinValidite) ){
                return res.json({msg :'Une Vignette valide existe déjà pour la période spécifier'})
            }  
           }
            
                      global.CopierVignette
                        
                        const url = req.protocol + "://" + req.get("host");
                        if (!req.files['CopierVignette']) {
            
                            this.CopierVignette = null
            
                        } else {
            
                            this.CopierVignette = url + "/images/" + req.files['CopierVignette'][0].filename;
            
                        }
                        const Vignettereq = {
                            DateOperation: req.body.DateOperation,
                            DateDebutValidite: req.body.DateDebutValidite,
                            DateFinValidite: req.body.DateFinValidite,
                            voitureID: req.body.voitureID,

                            CopierVignette: this.CopierVignette,
                            userID :req.body.userID
                        }
            const Vignettesave =await Vignette.create(Vignettereq)
           if(Vignettesave){
                const Vignetteresponce =await Vignette.findAll({where:{
                ID:Vignettesave.ID
            }})
            res.status(200).json({Vignette:Vignetteresponce[0] ,ok:true})
           }
           
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    getVignetteofonevoiture:async(req,res)=>{
        try {
            const Vignettes= await Vignette.findAll({where:{
                voitureID:req.params.id
            }})
          
                res.status(200).json({Vignette:Vignettes})
            
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        }
    },
    delete:async(req,res)=>{
        try {
          await  Vignette.destroy({where:{ID:req.params.id}})
          res.status(200).json({msg:'Vignette supprimée avec succès',ok:true})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    getone :async(req,res)=>{
        try {
            const Vignetteres =await Vignette.findOne({where:{ID:req.params.id},include:[Detailchargevehicule]})
            res.status(200).json({Vignette:Vignetteres})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    update:async(req,res)=>{
        try {
            const schema = Joi.object({
                DateOperation:Joi.date().required().messages({
                    "date.base":'invalid date format',

                    "any.required": `Date operation est obligatoire`
                  }),
                DateDebutValidite:Joi.date().required().messages({
                    "date.base":'invalid date format',

                    "any.required": `Date debut validite est obligatoire`
                  }),
                DateFinValidite:Joi.date().required().messages({
                    "date.base":'invalid date format',

                    "any.required": `Date fin validite est obligatoire`
                  }),
                userID:Joi.string().required().messages({

                    "any.required": `userID est obligatoire`
                  }),
                voitureID: Joi.string().required().messages({

                    "any.required": `voitureID est obligatoire`
                  }),
             
        
              }).options({ allowUnknown: true })
              const { error, value } = schema.validate(req.body);
              if (error) {
                return res.json({msg:error.message})
                // on fail return comma separated errors
               // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
            } 
            global.CopierVignette
                        
            const url = req.protocol + "://" + req.get("host");
            if (!req.files['CopierVignette']) {

                this.CopierVignette = req.body.CopierVignette

            } else {

                this.CopierVignette = url + "/images/" + req.files['CopierVignette'][0].filename;

            }
            const Vignettereq = {
                DateOperation: req.body.DateOperation,
                DateDebutValidite: req.body.DateDebutValidite,
                DateFinValidite: req.body.DateFinValidite,
                voitureID: req.body.voitureID,

                CopierVignette: this.CopierVignette,
                userID :req.body.userID
            }
const Vignettesave =await Vignette.update(Vignettereq,{where:{ID:req.params.id}})
if(Vignettesave){
    const Vignetteresponce =await Vignette.findAll({where:{
    ID:req.params.id
},include:[Detailchargevehicule]})
res.status(200).json({Vignette:Vignetteresponce[0] ,ok:true})
}

        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    }
}