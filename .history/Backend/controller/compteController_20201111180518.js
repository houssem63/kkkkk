const { Compte ,Banque } =require('../models/relations')
module.exports={
    ajouter:async (req,res)=>{
        try{const body=req.body
        console.log(body)
const compte = await   Compte.create(body)
console.log(compte.ID)
const compteres = await Compte.findAll({where :{
    ID :compte.ID
},include :[Banque]})
if(compteres){
    res.json({ compte:compteres[0]})
}        }catch(e){
            console.log(e)
        }
        
    
           
       
    },
    Delete:(req,res)=>{
    
        Compte.destroy({
            where: {
              ID: req.params.id
            }
          }).then((responce)=>{
              res.status(200).json({msg:'Compte supprimé avec succès'})
          }).catch((err)=>{
              res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
          })
    },
    Update:(req,res)=>{
        const body =req.body
        Compte.update(body, {
            where: {
              ID: req.params.id
            }}).then((responce)=>{
                res.status(200).json({msg:'Compte mis à jour avec succès'})
            }).catch((err)=>{
                res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
            })
    },
    Getall:(req,res)=>{
        Compte.findAll({where:{
            userID :req.params.id
        } ,include :[Banque]}).then((responce)=>{
            console.log(responce[0])
            res.status(200).json({compte :responce})
        }).catch((err)=>{
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        })
    },
    Getonebyid:(req,res)=>{
        Compte.findAll({
            where :{
                ID:req.params.id,
               
            }
        }).then((responce)=>{
            console.log(responce)
            res.status(200).json({compte :responce[0]})
        }).catch((err)=>{
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})
        })
    }

}