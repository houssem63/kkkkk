const { Voiture ,User, Entretien, Marquevoiture } = require('../models/relations')
const rp = require('request-promise');
const cheerio=require('cheerio')
const url = 'https://martouf.ch/2012/10/liste-de-noms-de-modele-de-voiture/';
module.exports = {
    getallvoiture: async (req, res) => {
        try {
            const user = await User.findAll({where :{
                ID :req.params.id
            }})
            if(user[0].Function ==='Société'){
                 const voiture = await Voiture.findAll({
                where: {
                    userID: user[0].ID
                },include:{model:Entretien,as: "entretien"}
                
            })
             if (voiture) {
                res.json({ voiture })
            }
            }else{
                const voiture = await Voiture.findAll({
                    where: {
                        userID: user[0].SocieteID
                    },
                    include: [
                        {
                          model: Entretien,
                          as: "entretien",
                        
                        },
                      ],
                
                })
                    if (voiture) {
                        res.json({ voiture })
                    }
            }
          
            
        } catch (error) {
            console.log(error)

            res.status(500).json({ error })
        }

    },
    ajoute: async (req, res) => {
        try {
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
                userID :req.body.userID
            }
            const voitureres = await Voiture.create(voiture)
            if(voitureres){
                res.status(200).json({voiture :voitureres[0] ,msg:'Véhicule ajouté avec succès' ,ok:true})
            }

        } catch (error) {
            res.status(500).json({ error })
        }

    },
    getonevoiture:async(req,res)=>{
        try {
         const voiture =await   Voiture.findAll({where :{
                ID:req.params.id
            }})
            res.status(200).json({voiture:voiture[0]})
        } catch (error) {
            res.status(500).json({error})
        }
    },
   
    addmarque: async(req,res)=>{

        arr = [];
        const result = await rp(url)
        
        const $ = cheerio.load(result);
         $("div[class='entry-content']>ul>li").each(async(index, element) => {
          
           console.log($(element).text())

           arr.push($(element).text())
        /*   console.log(arr)
          arr.forEach(element => {
            console.log(element)
            const banque ={
                libelle :element
            }
            Banque.create(banque).then(res=>{

            })
           });*/
           
           
         });
         arr.forEach(element => {
            console.log(element)
            const marque ={
                Libelle :element
            }
            Marquevoiture.create(marque).then(res=>{

            })
        })
        
       
      /*  const body=req.body
        console.log(body)
        Banque.create(body).then((resq)=>{
            console.log(resq)
            res.status(200).json({resq})
        }).catch((err)=>{
            console.log(err)
            res.status(500).json({err:'error server' + err.message})
        })*/

    },
    getallmarque:async(req,res)=>{
        try {
            const marque= await Marquevoiture.findAll({})
       res.json({marque:marque}) 
        } catch (error) {
            res.status(500).json({error})

        }
      
    },
    update :async(req,res)=>{
        try {
          
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
                userID :req.body.userID
            }
   
            const voiture= await  Voiture.update(voiturebody,{where:{
                  ID :req.params.id
              }})
          const resvoiture=await    Voiture.findOne({where:{
                  ID:req.params.id
              }})
              res.status(200).json({voiture :resvoiture,ok :true})
        } catch (error) {
            res.status(500).json({error})

        }
       
    },
    delete:async(req,res)=>{
        try {
     const voiture =     await  Voiture.destroy({where :{
            ID:req.params.id
        }})
        if(voiture){
            res.status(200).json({ok :true})
        }
        
        } catch (error) {
            res.status(500).json({error})

        }
     
    }

}