const { Abonnement, User } = require('../models/relations')
const { Sequelize  } = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    getabonnement: async (req, res) => {
        try {
            const abonnement = await Abonnement.findAll({ where: { userID: req.params.id } })
            if (abonnement) {
                res.status(200).json({ abonnement })
            }
        } catch (error) {
            res.status(500).json({ err: 'Erreur au niveau de serveur : ' + error })

        }
    },
    addabonnement: async (req, res) => {
        try {
            console.log(req.body)
            const lastabonnement = await Abonnement.findAll({
                where:
                {

userId :req.params.id,
                 [Op.or]:[{
                    DateDebut: {[Op.between] :[new Date(req.body.DateDebut), new Date(req.body.DateFin)]}},
                      {
                      DateFin:
                       
                       { [Op.between]: [new Date(req.body.DateDebut), new Date(req.body.DateFin)]
                    }
                 }]
                }
            })
            if(lastabonnement.length !==0){
                return res.json({msg:'La société à déjà un abonnement pour la periode spécifiée' ,ok :false})
            }

            const abonnement = await Abonnement.create({
                DateDebut: req.body.DateDebut,
                DateFin: req.body.DateFin,
                Montant: req.body.Montant,
                Duree: req.body.Duree,
                userID: req.params.id
            })
            if (abonnement) {
                res.status(200).json({ abonnement, ok: true })
await User.update({HasActivity :true},{where :{ID : req.params.id}})





            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ err: 'Erreur au niveau de serveur : ' + error })

        }
    },
    updateabonnement: async (req, res) => {
        try {
            const lastabonnement = await Abonnement.findAll({
                where:
                {

userId :req.params.id,
                 [Op.or]:[{
                    DateDebut: {[Op.between] :[new Date(req.body.DateDebut), new Date(req.body.DateFin)]}},
                      {
                      DateFin:
                       
                       { [Op.between]: [new Date(req.body.DateDebut), new Date(req.body.DateFin)]
                    }
                 }]



                   
                   
                     



                }



            })




            if(lastabonnement.length !==0){
                return res.json({msg:'La société à déjà un abonnement pour la periode spécifiée' ,ok :false})
            }
            const abonement = await Abonnement.update(req.body, {
                where: {
                    ID: req.body.ID
                }
            })
            if (abonement) {
                res.status(200).json({ abonnement ,ok:true })
            }
        } catch (error) {

        }
    }
}