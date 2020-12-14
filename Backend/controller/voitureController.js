const { Voiture ,User, Entretien, Marquevoiture ,EntretienparVehicule, Assurance,Cateexploitaion,Viste,Vignette} = require('../models/relations')

const {hasrole ,decodetoken} =require('../middleware/hasrole')
const Joi = require('joi');

module.exports = {
    getallvoiture: async (req, res) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const pageSize = !isNaN(req.query.pagesize) ?+req.query.pagesize :null;
            const currentPage = !isNaN( req.query.page)  ?+req.query.page :null;
            whereclause={
              }
            if(!hasrole('Administrateur',token)) {
              whereclause['SocieteID']=decodetoken(token).societeID
         
            }
           
                const voiture = await Voiture.findAll({
                       
                    
                    include: [
                        {
                          model: Entretien,
                          as: "entretien",
                        
                        },
                      
                      ],
                      where: whereclause,
                      limit: pageSize,
                offset: pageSize * (currentPage - 1)

                })
                    if (voiture) {
                      const count=await Voiture.count()
                        res.json({ voiture ,count})
                    }
            
          
            
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        }

    },
    ajoute: async (req, res) => {
        try {
            const schema = Joi.object({
                Matricule:Joi.string().required().messages({
                 
                    "any.required": `Matricule est obligatoire`
                  }),
                Type:Joi.string().required().messages({
                 
                    "any.required": `Type est obligatoire`
                  }),
                DPMC:Joi.date().required().messages({
                 "date.base":'invalid date format',
                    "any.required": `DPMC est obligatoire`
                  }),
                Marque:Joi.string().required().messages({
                 
                    "any.required": `Marque est obligatoire`
                  }),
                Categorie: Joi.string().required().messages({
                 
                    "any.required": `Categorie est obligatoire`
                  }),
                Compteur: Joi.string().required().messages({
                 
                    "any.required": `Compteur est obligatoire`
                  }),
                Propritaire: Joi.string().required().messages({
                 
                    "any.required": `Propritaire est obligatoire`
                  }),
                  SocieteID: Joi.number().required().messages({
                 
                    "any.required": `Propritaire est obligatoire`
                  }),
        
              }).options({ allowUnknown: true })
              const { error, value } = schema.validate(req.body);
              if (error) {
                return res.json({msg:error.message})
                // on fail return comma separated errors
               // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
            } 
            const token = req.headers.authorization.split(" ")[1];

            global.CopierCarteGrise
            global.CopierContrat
          const matriculevalidation =await Voiture.findAll({where :{
            Matricule:req.body.Matricule
          }})
       
          if(matriculevalidation.length !=0){
              return res.json({msg :"Matricule déjà utilisé" ,ok :false})
          }
            const url = req.protocol + "://" + req.get("host");
            if (!req.files['CopierCarteGrise']) {

                this.CopierCarteGrise = null

            } else {

                this.CopierCarteGrise = url + "/images/" + req.files['CopierCarteGrise'][0].filename;

            }
            if (!req.files['CopierContrat']) {

                this.CopierContrat = null

            } else {

                this.CopierContrat = url + "/images/" + req.files['CopierContrat'][0].filename

            }
            const voiture = {
                Matricule: req.body.Matricule,
                Type: req.body.Type,
                DPMC: req.body.DPMC,
                Marque: req.body.Marque,
                Categorie: req.body.Categorie,
                Compteur: req.body.Compteur,
                Propritaire: req.body.Propritaire,
                CopierContrat: this.CopierContrat,
                CopierCarteGrise: this.CopierCarteGrise,
                SocieteID :decodetoken(token).societeID
            }
            const voitureres = await Voiture.create(voiture)
            if(voitureres){
                res.status(200).json({voiture :voitureres[0] ,msg:'Véhicule ajouté avec succès' ,ok:true})
            }

        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        }

    },
    getonevoiture:async(req,res)=>{
        try {
            const token = req.headers.authorization.split(" ")[1];

            whereclause={
                ID:req.params.id

              }
            if(!hasrole('Administrateur',token)) {
              whereclause['SocieteID']=decodetoken(token).societeID
         
            }
         const voiture =await   Voiture.findAll({where :whereclause
            ,include:[Assurance,Cateexploitaion,Viste,Vignette]})
            res.status(200).json({voiture:voiture[0]})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        }
    },
   
    
    update :async(req,res)=>{
        try {
            const schema = Joi.object({
                Matricule:Joi.string().required().messages({
                 
                    "any.required": `Matricule est obligatoire`
                  }),
                Type:Joi.string().required().messages({
                 
                    "any.required": `Type est obligatoire`
                  }),
                DPMC:Joi.date().required().messages({
                 "date.base":'invalid date format',
                    "any.required": `DPMC est obligatoire`
                  }),
                Marque:Joi.string().required().messages({
                 
                    "any.required": `Marque est obligatoire`
                  }),
                Categorie: Joi.string().required().messages({
                 
                    "any.required": `Categorie est obligatoire`
                  }),
                Compteur: Joi.string().required().messages({
                 
                    "any.required": `Compteur est obligatoire`
                  }),
                Propritaire: Joi.string().required().messages({
                 
                    "any.required": `Propritaire est obligatoire`
                  }),
                  SocieteID: Joi.number().required().messages({
                 
                    "any.required": `Propritaire est obligatoire`
                  }),
              }).options({ allowUnknown: true })
              const { error, value } = schema.validate(req.body);
              if (error) {
                return res.json({msg:error.message})
                // on fail return comma separated errors
               // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
            } 
            const token = req.headers.authorization.split(" ")[1];

            global.CopierCarteGrise
            global.CopierContrat
            const url = req.protocol + "://" + req.get("host");
            if (!req.files['CopierCarteGrise']) {

                this.CopierCarteGrise = req.body.CopierCarteGrise

            } else {

                this.CopierCarteGrise = url + "/images/" + req.files['CopierCarteGrise'][0].filename;

            }
            if (!req.files['CopierContrat']) {

                this.CopierContrat = req.body.CopierContrat

            } else {

                this.CopierContrat = url + "/images/" + req.files['CopierContrat'][0].filename

            }
            const voiturebody = {
                Matricule: req.body.Matricule,
                Type: req.body.Type,
                DPMC: req.body.DPMC,
                Marque: req.body.Marque,
                Categorie: req.body.Categorie,
                Compteur: req.body.Compteur,
                Propritaire: req.body.Propritaire,
                CopierContrat: this.CopierContrat,
                CopierCarteGrise: this.CopierCarteGrise,
                SocieteID :decodetoken(token).societeID
            }
   
            const voiture= await  Voiture.update(voiturebody,{where:{
                  ID :req.params.id
              }})
          const resvoiture=await    Voiture.findOne({where:{
                  ID:req.params.id
              }})
              res.status(200).json({voiture :resvoiture,ok :true})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

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

     const voiture =     await  Voiture.destroy({where :whereclause})
        if(voiture){
            res.status(200).json({ok :true})
        }
        
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
     
    },
    addentretienparvehicule:async(req,res)=>{
        try {
         
            eparv=  req.body.e.filter(r=> !(r.Etat ===true && r.BI==='b'))
   
      
            eparv.forEach( async p=>{
                if(p.BI==='b'){
                  await  EntretienparVehicule.destroy({where:{voitureID:p.voitureID , entretienID :p.entretienID}})
                }else{
                   
                    const [entretien, created] =  await  EntretienparVehicule.findOrCreate({
                    where: { voitureID:p.voitureID , entretienID :p.entretienID },
                    defaults: {
                        voitureID:p.voitureID , entretienID :p.entretienID                    }
                   
                    })
                    
                    if(created){
                        res.status(200).json({msg:'created'})
                    }
                }})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    entetienparv:async(req,res)=>{
        try {
            
            const eparv= await EntretienparVehicule.findAll({where:{voitureID:req.params.id},include:[Entretien]})
        if(eparv){
            res.status(200).json({eparv})
        }
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
        
    },
    getall: async (req, res) => {
        try {
            const token = req.headers.authorization.split(" ")[1];

            whereclause={
              }
            if(!hasrole('Administrateur',token)) {
              whereclause['SocieteID']=decodetoken(token).societeID
         
            }
           
                const voiture = await Voiture.findAll({
                       
                    
                    include: [
                        {
                          model: Entretien,
                          as: "entretien",
                        
                        },
                      
                      ],
                      where: whereclause

                })
                    if (voiture) {
                        res.json({ voiture })
                    }
            
            
        } catch (err) {
         
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        }

    },

}