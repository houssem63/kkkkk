const { User, HistoriqueEmbauches } = require('../models/relations')
const bcrypt = require('bcryptjs');

module.exports = {
    ajouter: async (req, res) => {
        global.personnelimage;
        global.copierpermis;


        const url = req.protocol + "://" + req.get("host");
        if (!req.files['Image']) {

            this.personnelimage = "https://secure.gravatar.com/avatar/03723a218a9152e9bad38a84058e21d7?s=192&d=mm&r=g%202x"

        } else {

            this.personnelimage = url + "/images/" + req.files['Image'][0].filename;

        }
        if (!req.files['CopierPermis']) {

            this.copierpermis = null

        } else {

            this.copierpermis = url + "/images/" + req.files['CopierPermis'][0].filename

        }

        global.user;
        const finduser = await User.findAll({ where: { Login: req.body.Login } })

        if (finduser[0]) {
            return res.json({ msg: 'Login déjà utilisé', ok: false })
        }
        const findEmail = await User.findAll({ where: { Email: req.body.Email } })

        if (findEmail[0]) {
            return res.json({ msg: 'Email déjà utilisé', ok: false })
        }
        const hash = await bcrypt.hash(req.body.MotDePasse, 10)
        if (hash) {
            this.user = {
                Rs: req.body.Rs,
                Adresse: req.body.Adresse,
                Tel: req.body.Tel,
                Fax: req.body.Fax,
                Email: req.body.Email,
                Site: req.body.Site,
                Matfiscale: req.body.Matfiscale,
                Image: this.personnelimage,
                MotDePasse: hash,
                Status: req.body.Status,
                DateExpiration: req.body.DateExpiration,
                Login: req.body.Login,
                Cin: req.body.Cin,
                Nom: req.body.Nom,
                Prenom: req.body.Prenom,
                DateDeNaissance: req.body.DateDeNaissance,
                NumCNSS: req.body.NumCNSS,
                SituationFamilialle: req.body.SituationFamilialle,

                CopierPermis: this.copierpermis,
                Rs: req.body.Rs,
                NomPC: req.body.NomPC,
                PrenomPC: req.body.PrenomPC,
                TelPersonnelContact: req.body.TelPersonnelContact,
                FaxPersonnelContact: req.body.FaxPersonnelContact,
                AdresseEmailPersonnel: req.body.AdresseEmailPersonnel,
                MatFiscal: req.body.MatFiscal,
                Regfiscale: req.body.Regfiscale,
                Function: req.body.Function,
                SocieteID: req.body.SocieteID,


            }

        }

        User.create(this.user).then((resq) => {
            res.status(200).json({ ok: true, msg: 'Inscription effectuée avec succès' })
        }).catch((err) => {

            res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })
        })
    },
    Delete: async (req, res) => {
        try {
            await User.destroy({
                where: {
                    ID: req.params.id
                }
            })
            await HistoriqueEmbauches.destroy({ where: { PersonnelID: req.params.id } })
            res.status(200).json({ msg: 'Utilisateur supprimé avec succès' })
        }
        catch (err) {
            res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })
        }



    },
    Update: (req, res) => {

        global.personnelimage;
        global.copierpermis;
        const url = req.protocol + "://" + req.get("host");
        if (!req.files['Image']) {

            this.personnelimage = "https://secure.gravatar.com/avatar/03723a218a9152e9bad38a84058e21d7?s=192&d=mm&r=g%202x"

        } else {

            this.personnelimage = url + "/images/" + req.files['Image'][0].filename;

        } if (!req.files['CopierPermis']) {

            this.copierpermis = req.body.CopierPermis

        } else {

            this.copierpermis = url + "/images/" + req.files['CopierPermis'][0].filename

        }
        this.personnel = {
            Cin: req.body.Cin,
            Nom: req.body.Nom,
            Prenom: req.body.Prenom,
            DateDeNaissance: req.body.DateDeNaissance,
            Adresse: req.body.Adresse,
            Tel: req.body.Tel,
            Image: this.personnelimage,
            Fax: req.body.Fax,
            Email: req.body.Email,
            NumCNSS: req.body.NumCNSS,
            CopierPermis: this.copierpermis,
            SituationFamilialle: req.body.SituationFamilialle,
            societeID: req.body.societeID

        }
        User.update(this.personnel, {
            where: {
                ID: req.params.id
            }
        }).then((responce) => {

            res.status(200).json({ msg: 'Personnel mis à jour avec succès', personnel: this.personnel })
        }).catch((err) => {
            res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })
        })
    },
    Getall:async (req, res) => {
        global.user;
      console.log(req.params.id)

            User.findAll({
                where: {
                    societeID: req.params.id,
                
                }
            }).then((responce) => {
                console.log(responce)
                res.status(200).json({ personnel: responce })}) .catch((err) => {
                res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })
            })
        
     
       

},
    Getonebyid: (req, res) => {
        console.log(req.params.id)
        User.findAll({
            where: {
                ID: req.params.id
            }
        }).then((responce) => {
            res.status(200).json({ personnel: responce[0] })
        }).catch((err) => {
            res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })
        })
    }

}