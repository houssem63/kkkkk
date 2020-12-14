const detailchargevehicule = require('../models/detailchargevehicule')
const { Viste,Detailchargevehicule, Voiture }=require('../models/relations')
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

                    "any.required": `Date operation est obligatoire`
                  }),
                DateFinValidite:Joi.date().required().messages({
                    "date.base":'invalid date format',

                    "any.required": `Date fin validite est obligatoire`
                  }),
                Agence:Joi.string().required().messages({

                    "any.required": `Agence est obligatoire`
                  }),
                voitureID: Joi.string().required().messages({

                    "any.required": `voitureID est obligatoire`
                  }),
                userID :Joi.string().required().messages({

                    "any.required": `userID est obligatoire`
                  }),
        
              }).options({ allowUnknown: true })
              const { error, value } = schema.validate(req.body);
              if (error) {
                return res.json({msg:error.message})
                // on fail return comma separated errors
               // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
            } 
           const Visteres= await Viste.findAll({where :{ voitureID: req.body.voitureID,
            }})
          if(Visteres.length !==0){
              if((req.body.DateDebutValidite) < (Visteres[Visteres.length-1].DateFinValidite) ){
                return res.json({msg :'Une Viste valide existe déjà pour la période spécifier'})
            }  
           }
            
                      global.CopierViste
                        
                        const url = req.protocol + "://" + req.get("host");
                        if (!req.files['CopierVisite']) {
            
                            this.CopierViste = null
            
                        } else {
            
                            this.CopierViste = url + "/images/" + req.files['CopierVisite'][0].filename;
            
                        }
                        const Vistereq = {
                            DateOperation: req.body.DateOperation,
                            DateDebutValidite: req.body.DateDebutValidite,
                            DateFinValidite: req.body.DateFinValidite,
                            Agence: req.body.Agence,
                            voitureID: req.body.voitureID,

                            CopierVisite: this.CopierViste,
                            userID :req.body.userID
                        }
            const Vistesave =await Viste.create(Vistereq)
           if(Vistesave){
            const change =await Voiture.change()
            console.log(change +'change')
                const Visteresponce =await Viste.findAll({where:{
                ID:Vistesave.ID
            }})
            res.status(200).json({viste:Visteresponce[0] ,ok:true})
           }
           
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    getvisteofonevoiture:async(req,res)=>{
        try {
            const Vistes= await Viste.findAll({where:{
                voitureID:req.params.id
            }})
          
                res.status(200).json({viste:Vistes})
            
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        }
    },
    delete:async(req,res)=>{
        try {
          await  Viste.destroy({where:{ID:req.params.id}})
          res.status(200).json({msg:'Viste supprimée avec succès',ok:true})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    getone :async(req,res)=>{
        try {
            const Visteres =await Viste.findOne({where:{ID:req.params.id},include:[Detailchargevehicule]})
            res.status(200).json({viste:Visteres})
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

                    "any.required": `Date operation est obligatoire`
                  }),
                DateFinValidite:Joi.date().required().messages({
                    "date.base":'invalid date format',

                    "any.required": `Date fin validite est obligatoire`
                  }),
                Agence:Joi.string().required().messages({

                    "any.required": `Agence est obligatoire`
                  }),
                voitureID: Joi.string().required().messages({

                    "any.required": `voitureID est obligatoire`
                  }),
                userID :Joi.string().required().messages({

                    "any.required": `userID est obligatoire`
                  }),
             
        
              }).options({ allowUnknown: true })
              const { error, value } = schema.validate(req.body);
              if (error) {
                return res.json({msg:error.message})
                // on fail return comma separated errors
               // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
            } 
            global.CopierViste
                        
            const url = req.protocol + "://" + req.get("host");
            if (!req.files['CopierVisite']) {

                this.CopierViste = req.body.CopierVisite

            } else {

                this.CopierViste = url + "/images/" + req.files['CopierVisite'][0].filename;

            }
            const Vistereq = {
                DateOperation: req.body.DateOperation,
                DateDebutValidite: req.body.DateDebutValidite,
                DateFinValidite: req.body.DateFinValidite,
                Agence: req.body.Agence,
                voitureID: req.body.voitureID,

                CopierVisite: this.CopierViste,
                userID :req.body.userID
            }
const Vistesave =await Viste.update(Vistereq,{where:{ID:req.params.id}})
console.log(Vistesave)
if(Vistesave){
    const Visteresponce =await Viste.findAll({where:{
    ID:req.params.id
},include:[Detailchargevehicule]})
res.status(200).json({viste:Visteresponce[0] ,ok:true})
}

        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    }
}