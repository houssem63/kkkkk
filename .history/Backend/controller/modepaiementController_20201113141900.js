const { ModePaiement}=require('../models/relations')
module.exports ={
    add:async(req,res)=>{
        try {
            const mode=await ModePaiement.create(req.body)
if(mode){
    res.status(200).json({mode ,msg:'Mode paiement ajouté avec succes' ,ok :true})
}
        } catch (error) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    Delete:async(req,res)=>{
        try {
            const mode =await ModePaiement.destroy({where:{ID:req.params.id}})
            if(mode){
                res.status(200).json({msg:'Mode paiement supprimer avec succes' ,ok :true})
    
            }
        } catch (error) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
       
    },
    Getall:async(req,res)=>{
        try {
            console.log('!!!!!!')
            const mode =await ModePaiement.findAll({})
            if(mode){
                res.status(200).json({mode})
    
            }
        } catch (error) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    Getonebyid:async(req,res)=>{
        try {
            const mode =await ModePaiement.findAll({where:{ID:req.params.id}})
            if(mode){
                res.status(200).json({mode})
    
            } 
        } catch (error) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    },
    Update:async(req,res)=>{
        try {
            const mode =await ModePaiement.findAll(req.body,{where:{ID:req.params.id}})
            if(mode){
                res.status(200).json({mode})
    
            } 
        } catch (error) {
            res.status(500).json({err:'Erreur au niveau de serveur : ' + err})

        }
    }
}