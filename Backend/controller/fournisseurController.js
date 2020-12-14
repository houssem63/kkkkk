const { Fournisseur } = require('../models/relations')
const {hasrole ,decodetoken} =require('../middleware/hasrole')
const Joi = require('joi');

module.exports ={
    getall:async(req,res)=>{
try {
    const token = req.headers.authorization.split(" ")[1];
    const pageSize = !isNaN(req.query.pagesize) ?+req.query.pagesize :null;
    const currentPage = !isNaN( req.query.page)  ?+req.query.page :null;
    whereclause={
        SocieteID:req.params.id
      }
    if(!hasrole('Administrateur',token)) {
      whereclause['SocieteID']=decodetoken(token).societeID
 
    }
  
    const fournisseur =await Fournisseur.findAll({where:whereclause, limit: pageSize,
      offset: pageSize * (currentPage - 1)})
    if(fournisseur){
      const count =await Fournisseur.count()
        res.status(200).json({fournisseur :fournisseur,count})
    }
} catch (err) {
    res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
}
    },
    ajouter:async(req,res)=>{
        try {
            const schema = Joi.object({
               
              Rs:Joi.string().required().messages({
                "any.required": `Rs est obligatoire`
              }),
            Adresse:Joi.string().required().messages({
                "any.required": `Adresse est obligatoire`
              }),
            Tel:Joi.string().length(8).required().messages({
                "any.required": `Le numéro de téléphone doit contenir 8 chiffres
                `
              }),
          
            Email:Joi.string().email().required().messages({
                "any.required": `Libelle est obligatoire`,
                "string.email":"invalid email format"
              }),
            
            Matfiscale :Joi.string().required().messages({
                "any.required": `Matfiscale est obligatoire`
              }),           
          
           
            Regfiscale:Joi.number().required().messages({
                "any.required": `Regfiscale est obligatoire`
              }),         
               }).options({ allowUnknown: true })
               const { error, value } = schema.validate(req.body);
               if (error) {
                 return res.json({msg:error.message})
                 // on fail return comma separated errors
                // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
             } 
            const token = req.headers.authorization.split(" ")[1];

            global.image;
            const url = req.protocol + "://" + req.get("host");
            if (!req.files['Image']) {
      
              this.image = "https://secure.gravatar.com/avatar/03723a218a9152e9bad38a84058e21d7?s=192&d=mm&r=g%202x"
      
            } else {
      
              this.image = url + "/images/" + req.files['Image'][0].filename;
      
            }
        const fournisseursave={
            Rs:req.body.Rs,
            Adresse:req.body.Adresse,
            Tel: req.body.Tel,
            Fax: req.body.Fax,
            Email: req.body.Email,
            Site: req.body.Site,
            NomPC:req.body.NomPC,
            PrenomPC:req.body.PrenomPC,
            TelPersonnelContact:req.body.TelPersonnelContact,
            FaxPersonnelContact:req.body.FaxPersonnelContact,
            AdresseEmailPersonnel: req.body.AdresseEmailPersonnel,
            Matfiscale: req.body.Matfiscale,
            Regfiscale:req.body.Regfiscale,
            Image: this.image,
            SocieteID:decodetoken(token).societeID
        }
            const fournisseur =await Fournisseur.create(fournisseursave)

            if(fournisseur){
                res.status(200).json({fournisseur :Fournisseur})
            }
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    Delete :async(req,res)=>{
        try {
            const token = req.headers.authorization.split(" ")[1];

            whereclause={
                ID:req.params.id              }
            if(!hasrole('Administrateur',token)) {
              whereclause['SocieteID']=decodetoken(token).societeID
         
            }
          await  Fournisseur.destroy({where:whereclause})   
        res.status(200).json({msg:'Fournisseur supprimé avec succès'})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
     
    },
    Update:async(req,res)=>{
        try {
            const schema = Joi.object({
               
                Rs:Joi.string().required().messages({
                    "any.required": `Rs est obligatoire`
                  }),
                Adresse:Joi.string().required().messages({
                    "any.required": `Adresse est obligatoire`
                  }),
                Tel:Joi.string().length(8).required().messages({
                    "any.required": `Le numéro de téléphone doit contenir 8 chiffres
                    `
                  }),
             
                Email:Joi.string().email().required().messages({
                    "any.required": `Libelle est obligatoire`,
                    "string.email":"invalid email format"
                  }),
              
                Matfiscale :Joi.string().required().messages({
                    "any.required": `Matfiscale est obligatoire`
                  }),
             
             
             
               
               
               
                Regfiscale:Joi.number().required().messages({
                    "any.required": `Regfiscale est obligatoire`
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
                ID:req.params.id              }
            if(!hasrole('Administrateur',token)) {
              whereclause['SocieteID']=decodetoken(token).societeID
         
            }
            global.image;
            const url = req.protocol + "://" + req.get("host");
            if (!req.files['Image']) {
      
              this.image = req.body.Image
      
            } else {
      
              this.image = url + "/images/" + req.files['Image'][0].filename;
      
            }
        const fournisseursave={
            Rs:req.body.Rs,
            Adresse:req.body.Adresse,
            Tel: req.body.Tel,
            Fax: req.body.Fax,
            Email: req.body.Email,
            Site: req.body.Site,
            NomPC:req.body.NomPC,
            PrenomPC:req.body.PrenomPC,
            TelPersonnelContact:req.body.TelPersonnelContact,
            FaxPersonnelContact:req.body.FaxPersonnelContact,
            AdresseEmailPersonnel: req.body.AdresseEmailPersonnel,
            Matfiscale: req.body.Matfiscale,
            Regfiscale:req.body.Regfiscale,
            Image: this.image,
            SocieteID:decodetoken(token).societeID
        }
         const update= await  Fournisseur.update(fournisseursave,{where:whereclause})   
        res.status(200).json({msg:'Fournisseur mis à jour avec succès',ok:true})
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }},
        getone:async(req,res)=>{
            try {
                const token = req.headers.authorization.split(" ")[1];

                whereclause={
                    ID:req.params.id              }
                if(!hasrole('Administrateur',token)) {
                  whereclause['SocieteID']=decodetoken(token).societeID
             
                }
                const fournissseur =await Fournisseur.findAll({where:whereclause})
                if(fournissseur){
                    res.status(200).json({fournissseur:fournissseur[0]})
                }
            } catch (err) {
                res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

            }
        }
}