const { Banque } =require('../models/relations')
const rp = require('request-promise');
const cheerio=require('cheerio')
const url = 'https://en.wikipedia.org/wiki/List_of_banks_in_Tunisia';
const Joi = require('joi');

module.exports={
    ajouter: async(req,res)=>{
try {
    arr = [];
    await {
        
    }
    const result = await rp(url)
    
    const $ = cheerio.load(result);
     $("ol >li").each(async(index, element) => {
       arr.push($(element).text()) ;
       const banque ={
        libelle : $(element).text()
         }
        await Banque.create(banque)
     });
     res.json({ok:true})

    
    
   
 
  
} catch (err) {
    res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

}
      
     
    },
    Delete:(req,res)=>{
    
        Banque.destroy({
            where: {
              ID: req.params.id
            }
          }).then((responce)=>{
              res.status(200).json({msg:'Banque supprimée avec succès'})
          }).catch((err)=>{
              res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
          })
    },
    Update:(req,res)=>{
        const schema = Joi.object({
               
            libelle:Joi.string().required().messages({
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
        Banque.update(body, {
            where: {
              ID: req.params.id
            }}).then((responce)=>{
                
                res.status(200).json({msg:'Banque mise à jour avec succès' ,ok:true})
            }).catch((err)=>{
                console.log(err)
                res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
            })
    },
    Getall:async (req,res)=>{
        try {
            const pageSize = !isNaN(req.query.pagesize) ?+req.query.pagesize :null;
            const currentPage = !isNaN( req.query.page)  ?+req.query.page :null;
            const banque =await Banque.findAll({
                limit: pageSize,
                offset: pageSize * (currentPage - 1)
            })
            if(banque){
                const count = await Banque.count()
                console.log(count)
                res.status(200).json({banque,count})
        
            }      
        } catch (err) {
            console.log(err)
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        }
      
       
    },
    Getonebyid:(req,res)=>{
        Banque.findAll({
            where :{
                ID:req.params.id
            }
        }).then((responce)=>{
            res.status(200).json({banque :responce[0]})
        }).catch((err)=>{
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        })
    }
,add:async(req,res)=>{
    try {
        const schema = Joi.object({
               
            libelle:Joi.string().required().messages({
                "any.required": `Libelle est obligatoire`
              }),
          
     
           }).options({ allowUnknown: true })
           const { error, value } = schema.validate(req.body);
           if (error) {
             return res.json({msg:error.message})
             // on fail return comma separated errors
            // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
         }
        const banque=await Banque.create(req.body)
        if(banque){
            
            res.json({banque})
        }
    } catch (error) {
        res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

    }
}
}