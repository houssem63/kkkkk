const { Role, User_Role } = require('../models/relations')
const Joi = require('joi');

module.exports = {
    ajouter: (req, res) => {
        const schema = Joi.object({
            Libelle:Joi.string().required().messages({

                "any.required": `Libelle est obligatoire`
              }),
           Poids:Joi.number().required().messages({

            "any.required": `Poids est obligatoire`
          }),
         
    
          }).options({ allowUnknown: true })
          const { error, value } = schema.validate(req.body);
          if (error) {
           
            return res.json({msg:error.message})
            // on fail return comma separated errors
           // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        } 
        const body = req.body
        Role.create(body).then((resq) => {
            res.status(200).json({ role: resq })
        }).catch((err) => {
            res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err.message })
        })
    },
    Delete: (req, res) => {

        Role.destroy({
            where: {
                ID: req.params.id
            }
        }).then((responce) => {
            res.status(200).json({ msg: 'Rôle suprimé avec succès' })
        }).catch((err) => {
            res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })
        })
    },
    Update: (req, res) => {
        const schema = Joi.object({
            Libelle:Joi.string().required(),
           Poids:Joi.number().required(),
         
    
          }).options({ allowUnknown: true })
          const { error, value } = schema.validate(req.body);
          if (error) {
            return res.json({msg:error.message})
            // on fail return comma separated errors
           // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        } 
        const body = req.body
        Role.update(body, {
            where: {
                ID: req.params.id
            }
        }).then((responce) => {
            res.status(200).json({ msg: 'Rôle mis à jour avec succés' })
        }).catch((err) => {
            res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })
        })
    },
    Getall: (req, res) => {
        Role.findAll({
            order:[['Poids','ASC']]
        }).then((responce) => {
            res.status(200).json({ role: responce })
        }).catch((err) => {
            res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })
        })
    },
    Getonebyid: (req, res) => {
        Role.findAll({
            where: {
                ID: req.params.id
            }
        }).then((responce) => {
            res.status(200).json({ role: responce[0] })
        }).catch((err) => {
            res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })
        })
    },
    adduserrole: async (req, res) => {
        try {
            let roles =   JSON.parse(req.body.roles)
      roles=  roles.filter(r=> !(r.Etat ===true && r.BI==='b'))
   
      
roles.forEach( async p=>{
    if(p.BI==='b'){
      await  User_Role.destroy({where:{userID:req.params.id , roleID :p.ID}})
    }else{
       
      await  User_Role.create({
            userID:req.params.id ,roleID:p.ID
        })
    }
})
       
   
           
        } catch (err) {
            console.log(err)
            res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })

        }

    },
    
    changerolePoids: async (req, res) => {

        try {
            const rolechanged = req.body.roles
            const roles = await Role.findAll()
            roles.forEach(async r => {
                rolechanged.forEach(async c => {
                    if (r.ID === c.ID) {
                        if (r.Poids != c.Poids) {
                            await Role.update({ Poids: c.Poids }, { where: { ID: r.ID } })
                        }
                    }
                })
            })
            res.status(200).json({msg:'role change',ok:true})

        } catch (err) {
            console.log(err)
            res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })

        }

    }
}