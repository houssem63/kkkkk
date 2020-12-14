const { Marquevoiture} = require('../models/relations')
const rp = require('request-promise');
const cheerio=require('cheerio');
const url = 'https://martouf.ch/2012/10/liste-de-noms-de-modele-de-voiture/';
const Joi = require('joi');

module.exports={
    addmarque: async(req,res)=>{

        arr = [];
        const result = await rp(url) 
        
        const $ = cheerio.load(result);
         $("div[class='entry-content']>ul>li").each(async(index, element) => {
          
            const marque ={
                Libelle :$(element).text()
            }
           await Marquevoiture.create(marque)
        
        
       
        })
        res.json({msg:'ok'})
      
    },
    getallmarque:async(req,res)=>{
        try {
            const pageSize = +req.query.pagesize;
            const currentPage = +req.query.page;
            const marque= await Marquevoiture.findAll({   limit: pageSize,
                offset: pageSize * (currentPage - 1)})
                const count=await Marquevoiture.count()
if(count){
           res.json({marque:marque,count}) 

}
        } catch (err) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
      
    },
    Delete:(req,res)=>{
    
        Marquevoiture.destroy({
            where: {
              ID: req.params.id
            }
          }).then((responce)=>{
              res.status(200).json({msg:'MarqueVoiture supprimée avec succès'})
          }).catch((err)=>{
              res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
          })
    },
    Update:(req,res)=>{
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
        const body =req.body
        Marquevoiture.update(body, {
            where: {
              ID: req.params.id
            }}).then((responce)=>{
                res.status(200).json({msg:'MarqueVoiture mise à jour avec succès' ,ok:true})
            }).catch((err)=>{
                res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
            })
    },
    Getall:async(req,res)=>{
        try {
            console.log(req.query)
            const pageSize = !isNaN(req.query.pagesize) ?+req.query.pagesize :null;
            const currentPage = !isNaN( req.query.page)  ?+req.query.page :null;
            const marque =await Marquevoiture.findAll({
                limit: pageSize,
                offset: pageSize * (currentPage - 1)
            })
            if(marque){
                const count = await Marquevoiture.count()
                console.log(count)
                res.status(200).json({marque,count})
        
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
      
    
    },
    Getonebyid:(req,res)=>{
        Marquevoiture.findAll({
            where :{
                ID:req.params.id
            }
        }).then((responce)=>{
            res.status(200).json({marque :responce[0]})
        }).catch((err)=>{
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        })
    }
,add:async(req,res)=>{
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
        const marque=await Marquevoiture.create(req.body)
        if(marque){
            res.json({marque})
        }
    } catch (error) {
        res.status(500).json({err:'Erreur au niveau de serveur : ' + error})

    }
}
}