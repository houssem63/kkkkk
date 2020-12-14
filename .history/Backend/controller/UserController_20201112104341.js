const { User, HistoriqueEmbauches, Role, User_Role, Abonnement ,Compte } = require('../models/relations')
const nodemailer = require("nodemailer");
const request = require('request');
const { Sequelize  } = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user_role = require('../models/user_role');
module.exports = {
  ajouter: async (req, res) => {
    try {
   console.log(req.body)
  
   if(req.body.Abonnement ===undefined){
    console.log(req.body)
  }
   
global.hasactivity 

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
      const user = req.body
      const { count } = await User.findAndCountAll();
      if (!count) {
        user.Status = true;

        const hash = await bcrypt.hash(req.body.MotDePasse, 10)
        if (hash) {
          this.user = {
            Adresse: req.body.Adresse,
            Tel: req.body.Tel,
            Email: req.body.Email,
            Image: this.personnelimage,
            MotDePasse: hash,
            Status: req.body.Status,
            Login: req.body.Login,
            HasActivity:false


          }
          await User.create(this.user)
        }
        await Role.bulkCreate([
          { Libelle: 'Administrateur', Poids: 1 },
          { Libelle: 'Société', Poids: 2 },
          { Libelle: 'Personnel', Poids: 3 },
          { Libelle: 'Client', Poids: 4 }

        ]);

        await User_Role.bulkCreate([
          { userID: 1, roleID: 1 },

        ]);
        return res.status(200).json({
          ok: true, msg: 'inscription effuctuée avec succès'
        });
      }
      if (req.body.roles) {
       

        global.user;
        const finduser = await User.findAll({ where: { Login: req.body.Login } })
        if (finduser[0]) {
          return res.json({ msg: 'Login déjà utilisé', ok: false })
        }
        const findEmail = await User.findAll({ where: { Email: req.body.Email } })

        if (findEmail[0]) {
          return res.json({ msg: 'Email déja utilisé', ok: false })
        }
        const findTel = await User.findAll({ where: { Tel: req.body.Tel } })

        if (findTel[0]) {
          return res.json({ msg: 'Numéro de téléphone déja utilisé', ok: false })
        }
        if(req.body.Matfiscale !==undefined){
          const findMatFiscale = await User.findAll({ where: { Matfiscale: req.body.Matfiscale } })

        if (findMatFiscale[0]) {
          return res.json({ msg: 'Matricule fiscale déja utilisé', ok: false })
        }
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
            HasActivity:req.body.Abonnement !==undefined ?true :false,

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
        
        const user = await User.create(this.user)

        const role = JSON.parse(req.body.roles)
        role.forEach(async (element) => {
          await User_Role.bulkCreate([
            { userID: user.ID, roleID: element.ID },

          ]);
        })
    
if(req.body.Abonnement !==undefined){
 

  const abonnement=JSON.parse(req.body.Abonnement)
  console.log(abonnement)

  const lastabonnement = await Abonnement.findAll({
    where:
    {

userId :user.ID,
     [Op.or]:[{
        DateDebut: {[Op.between] :[new Date(abonnement.DateDebut), new Date(abonnement.DateFin)]}},
          {
          DateFin:
           
           { [Op.between]: [new Date(abonnement.DateDebut), new Date(abonnement.DateFin)]
        }
     }]
    }
})
if(lastabonnement.length !==0){
    return res.json({msg:'La société à déjà un abonnement pour la periode spécifiée' ,ok :false})
}

const abonnementcreate = await Abonnement.create({
    DateDebut: abonnement.DateDebut,
    DateFin: abonnement.DateFin,
    Montant: abonnement.Montant,
    Duree: abonnement.Duree,
    userID: user.ID
})
}
        return res.status(200).json({ ok: true, msg: 'utilisateur ajouté  avec succès' })

      }






      global.user;
      const finduser = await User.findAll({ where: { Login: req.body.Login } })

      if (finduser[0]) {
        return res.json({ msg: 'Login déjà utilisé', ok: false })
      }
      const findEmail = await User.findAll({ where: { Email: req.body.Email } })

      if (findEmail[0]) {
        return res.json({ msg: 'Email déja utilisé', ok: false })
      }
      const findTel = await User.findAll({ where: { Tel: req.body.Tel } })

      if (findTel[0]) {
        return res.json({ msg: 'Numéro de téléphone déja utilisé', ok: false })
      }
      if(req.body.Matfiscale !=='undefined'){
        const findMatFiscale = await User.findAll({ where: { Matfiscale: req.body.Matfiscale } })

      if (findMatFiscale[0]) {
        return res.json({ msg: 'Matricule fiscale déja utilisé', ok: false })
      }
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
          HasActivity:false,

          CopierPermis: this.copierpermis,
          Rs: req.body.Rs,
          NomPC: req.body.NomPC,
          PrenomPC: req.body.PrenomPC,
          TelPersonnelContact: req.body.TelPersonnelContact,
          FaxPersonnelContact: req.body.FaxPersonnelContact,
          AdresseEmailPersonnel: req.body.AdresseEmailPersonnel,
          MatFiscal: req.body.MatFiscal,
          Regfiscale: req.body.Regfiscale,
          SocieteID: req.body.SocieteID,


        }
      }

      User.create(this.user).then(async (resq) => {
        const role = await Role.findOne({ where: { Libelle: req.body.role } })

        if (role) {
          const user_role = await User_Role.create({ userID: resq.ID, roleID: role.ID })
        }
        if (user_role) {
          res.status(200).json({ ok: true, msg: 'inscription effuctuée avec succès' })

        }
        /* */
      }).catch((err) => {
        console.log(err)
        res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })
      })

      const output = `
                <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
   <head> 
    <meta charset="UTF-8"> 
    <meta content="width=device-width, initial-scale=1" name="viewport"> 
    <meta name="x-apple-disable-message-reformatting"> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta content="telephone=no" name="format-detection"> 
    <title>Nouveau modèle de courrier électronique 2020-10-23</title> 
    <!--[if (mso 16)]>
      <style type="text/css">
      a {text-decoration: none;}
      </style>
      <![endif]--> 
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
    <!--[if gte mso 9]>
  <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG></o:AllowPNG>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
  </xml>
  <![endif]--> 
    <!--[if !mso]><!-- --> 
    <link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i" rel="stylesheet"> 
    <!--<![endif]--> 
    <style type="text/css">
  #outlook a {
    padding:0;
  }
  .ExternalClass {
    width:100%;
  }
  .ExternalClass,
  .ExternalClass p,
  .ExternalClass span,
  .ExternalClass font,
  .ExternalClass td,
  .ExternalClass div {
    line-height:100%;
  }
  .es-button {
    mso-style-priority:100!important;
    text-decoration:none!important;
  }
  a[x-apple-data-detectors] {
    color:inherit!important;
    text-decoration:none!important;
    font-size:inherit!important;
    font-family:inherit!important;
    font-weight:inherit!important;
    line-height:inherit!important;
  }
  .es-desk-hidden {
    display:none;
    float:left;
    overflow:hidden;
    width:0;
    max-height:0;
    line-height:0;
    mso-hide:all;
  }
  @media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button { font-size:20px!important; display:block!important; border-width:15px 25px 15px 25px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
  </style> 
   </head> 
   <body style="width:100%;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
    <div class="es-wrapper-color" style="background-color:#F4F4F4"> 
     <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#f4f4f4"></v:fill>
        </v:background>
      <![endif]--> 
     <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
       <tr class="gmail-fix" height="0" style="border-collapse:collapse"> 
        <td style="padding:0;Margin:0"> 
         <table cellspacing="0" cellpadding="0" border="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px"> 
           <tr style="border-collapse:collapse"> 
            <td cellpadding="0" cellspacing="0" border="0" style="padding:0;Margin:0;line-height:1px;min-width:600px" height="0"><img src="https://esputnik.com/repository/applications/images/blank.gif" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px" alt width="600" height="1"></td> 
           </tr> 
         </table></td> 
       </tr> 
       <tr style="border-collapse:collapse"> 
        <td valign="top" style="padding:0;Margin:0"> 
         <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
           <tr style="border-collapse:collapse"> 
            <td align="center" style="padding:0;Margin:0"> 
             <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"> 
               <tr style="border-collapse:collapse"> 
                <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px"> 
                 <!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:282px" valign="top"><![endif]--> 
                 <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                   <tr style="border-collapse:collapse"> 
                    <td align="left" style="padding:0;Margin:0;width:282px"> 
                     <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td class="es-infoblock es-m-txt-c" align="left" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC">Put your preheader text here<br></p></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table> 
                 <!--[if mso]></td><td style="width:20px"></td><td style="width:278px" valign="top"><![endif]--> 
                 <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                   <tr style="border-collapse:collapse"> 
                    <td align="left" style="padding:0;Margin:0;width:278px"> 
                     <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td align="right" class="es-infoblock es-m-txt-c" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:14px;color:#CCCCCC"><a href="https://viewstripo.email" class="view" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:12px;text-decoration:underline;color:#CCCCCC">View in browser</a></p></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table> 
                 <!--[if mso]></td></tr></table><![endif]--></td> 
               </tr> 
             </table></td> 
           </tr> 
         </table> 
         <table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:#FFA73B;background-repeat:repeat;background-position:center top"> 
           <tr style="border-collapse:collapse"> 
            <td align="center" bgcolor="#407dfe" style="padding:0;Margin:0;background-color:#407DFE"> 
             <table class="es-header-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"> 
               <tr style="border-collapse:collapse"> 
                <td align="left" style="Margin:0;padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px"> 
                 <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                   <tr style="border-collapse:collapse"> 
                    <td valign="top" align="center" style="padding:0;Margin:0;width:580px"> 
                     <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:25px;padding-bottom:25px;font-size:0"><img src="https://ocqheq.stripocdn.email/content/guids/CABINET_3df254a10a99df5e44cb27b842c2c69e/images/7331519201751184.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="40"></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table></td> 
           </tr> 
         </table> 
         <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
           <tr style="border-collapse:collapse"> 
            <td style="padding:0;Margin:0;background-color:#407DFE" bgcolor="#407dfe" align="center"> 
             <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"> 
               <tr style="border-collapse:collapse"> 
                <td align="left" style="padding:0;Margin:0"> 
                 <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                   <tr style="border-collapse:collapse"> 
                    <td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
                     <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#FFFFFF;border-radius:4px" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff" role="presentation"> 
                       <tr style="border-collapse:collapse"> 
                        <td align="center" style="Margin:0;padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:35px"><h1 style="Margin:0;line-height:58px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:48px;font-style:normal;font-weight:normal;color:#111111">Bienvenu! ${req.body.Rs}</h1></td> 
                       </tr> 
                       <tr style="border-collapse:collapse"> 
                        <td bgcolor="#ffffff" align="center" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0"> 
                         <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td style="padding:0;Margin:0;border-bottom:1px solid #FFFFFF;background:#FFFFFFnone repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table></td> 
           </tr> 
         </table> 
         <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
           <tr style="border-collapse:collapse"> 
            <td align="center" style="padding:0;Margin:0"> 
             <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"> 
               <tr style="border-collapse:collapse"> 
                <td align="left" style="padding:0;Margin:0"> 
                 <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                   <tr style="border-collapse:collapse"> 
                    <td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
                     <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:4px;background-color:#FFFFFF" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff" role="presentation"> 
                       <tr style="border-collapse:collapse"> 
                        <td class="es-m-txt-l" bgcolor="#ffffff" align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:30px;padding-right:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:18px;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p></td> 
                       </tr> 
                       <tr style="border-collapse:collapse"> 
                        <td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:30px;padding-right:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:18px;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666">If that doesn't work, copy and paste the following link in your browser:</p></td> 
                       </tr> 
                       <tr style="border-collapse:collapse"> 
                        <td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:30px;padding-right:30px"><a target="_blank" href="https://viewstripo.email/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:18px;text-decoration:underline;color:#FFA73B">XXX.XXXXXXX.XXX / XXXXXXXXXXXXX</a></td> 
                       </tr> 
                       <tr style="border-collapse:collapse"> 
                        <td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:30px;padding-right:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:18px;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666">If you have any questions, just reply to this email—we're always happy to help out.</p></td> 
                       </tr> 
                       <tr style="border-collapse:collapse"> 
                        <td class="es-m-txt-l" align="left" style="Margin:0;padding-top:20px;padding-left:30px;padding-right:30px;padding-bottom:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:18px;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666">Cheers,</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:18px;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666">The Ceej Team</p></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table></td> 
           </tr> 
         </table> 
         <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
           <tr style="border-collapse:collapse"> 
            <td align="center" style="padding:0;Margin:0"> 
             <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"> 
               <tr style="border-collapse:collapse"> 
                <td align="left" style="padding:0;Margin:0"> 
                 <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                   <tr style="border-collapse:collapse"> 
                    <td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
                     <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td align="center" style="Margin:0;padding-top:10px;padding-bottom:20px;padding-left:20px;padding-right:20px;font-size:0"> 
                         <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td style="padding:0;Margin:0;border-bottom:1px solid #F4F4F4;background:#FFFFFFnone repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table></td> 
           </tr> 
         </table> 
         <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
           <tr style="border-collapse:collapse"> 
            <td align="center" style="padding:0;Margin:0"> 
             <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"> 
               <tr style="border-collapse:collapse"> 
                <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px"> 
                 <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                   <tr style="border-collapse:collapse"> 
                    <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                     <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td align="center" style="padding:0;Margin:0;display:none"></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table></td> 
           </tr> 
         </table></td> 
       </tr> 
     </table> 
    </div>  
   </body>
  </html>
          `;

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          name: process.env.NAME,
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD // generated ethereal password
        }, tls: {
          rejectUnauthorized: false
        },

      });

      // setup email data with unicode symbols
      let mailOptions = {
        from: '"autoecole030@gmail.com', // sender address
        to: req.body.Email, // list of receivers
        subject: 'Bienvenu sur notre plateforme', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log('err message' + error.message);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      })





    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }

  },
  Delete: async (req, res) => {

    try {



      const responce = await User.destroy({
        where: {
          ID: req.params.id,
          HasActivity:false
        }
      })
console.log(responce)
if(responce ===0){
  return res.status(200).json({msg :'Vous ne pouvez pas supprimer cet utilisateur !' ,ok :false})
}
      await HistoriqueEmbauches.destroy({
        where: {
          PersonnelID: req.params.id
        }
      })
      await Compte.destroy({
        where: {
          userID: req.params.id
        }
      })

      res.status(200).json({ msg: 'Utilisateur supprimé avec succès',ok:true })
    } catch (e) {
      res.status(500).json({ err: e })
    }


  },
  Update: async (req, res) => {
    try {
         
       global.personnelimage;
       global.copierpermis;
       global.hashpass ='';

         const url = req.protocol + "://" + req.get("host");
        
       const userresponce =await User.findOne({where :{ID :req.params.id},include: [
         {
           model: Role,
           as: "roles",
         
         },
         {
           model: Abonnement,
           as: "abonnements",
         
         }]})      
         
         if(req.files !==undefined){
        
            this.personnelimage=url + "/images/" + req.files['Image'][0].filename;
            
       }
       if(req.files !==undefined){
           
        
            this.copierpermis=url + "/images/" + req.files['CopierPermis'][0].filename
            
       }
       if(req.body.MotDePasse){
         this.hashpass =await bcrypt.hash(req.body.MotDePasse, 10)
       }
         if(userresponce){
           userresponce.update({
             Rs: req.body.Rs ?  req.body.Rs :userresponce.Rs,
             Adresse:req.body.Adresse ?  req.body.Adresse :userresponce.Adresse,
             Tel:req.body.Tel ?  req.body.Tel :userresponce.Tel,
             Fax:req.body.Fax ?  req.body.Fax :userresponce.Fax,
             Email:req.body.Email ?  req.body.Email :userresponce.Email,
             Site:req.body.Site ?  req.body.Site :userresponce.Site,
             Matfiscale:req.body.Matfiscale?  req.body.MatFiscal :userresponce.MatFiscal,
             Image:this.personnelimage ?  this.personnelimage :userresponce.Image,
             MotDePasse:this.hashpass ? this.hashpass :userresponce.MotDePasse,
             Status:req.body.Status ,
             DateExpiration:req.body.DateExpiration ?  req.body.DateExpiration :userresponce.DateExpiration,
             Login:req.body.Login ?  req.body.Login :userresponce.Login,
             Cin:req.body.Cin ?  req.body.Cin :userresponce.Cin,
             Nom:req.body.Nom ?  req.body.Nom :userresponce.Nom,
          Prenom:req.body.Prenom ?  req.body.Rs :userresponce.Prenom,
          DateDeNaissance:req.body.DateDeNaissance ?  req.body.DateDeNaissance :userresponce.DateDeNaissance,  
          NumCNSS:req.body.NumCNSS ?  req.body.NumCNSS :userresponce.NumCNSS,
          SituationFamilialle:req.body.SituationFamilialle ?  req.body.SituationFamilialle :userresponce.SituationFamilialle,
          
          CopierPermis:this.copierpermis?  this.copierpermis :userresponce.CopierPermis, 
        
           NomPC:req.body.NomPC ?  req.body.NomPC :userresponce.NomPC,
          PrenomPC:req.body.PrenomPC ?  req.body.PrenomPC :userresponce.PrenomPC,
          TelPersonnelContact:req.body.TelPersonnelContact ?  req.body.TelPersonnelContact :userresponce.TelPersonnelContact,
          FaxPersonnelContact:req.body.FaxPersonnelContact ?  req.body.FaxPersonnelContact :userresponce.FaxPersonnelContact,
          AdresseEmailPersonnel:req.body.AdresseEmailPersonnel ?  req.body.AdresseEmailPersonnel :userresponce.AdresseEmailPersonnel,
          Regfiscale:req.body.Regfiscale ?  req.body.Regfiscale :userresponce.Regfiscale,
          Function:req.body.Function ?  req.body.Function :userresponce.Function,
          SocieteID:req.body.SocieteID ?  req.body.SocieteID :userresponce.SocieteID,
     
           })
                
         }
        
 
 
 if(userresponce){
 
   
   res.status(200).json({msg:'Utilisateur mis à jour avec succès',user:userresponce ,ok:true})
 
 }
    } catch (error) {
      res.status(500).json({ err: 'Erreur au niveau de serveur : ' + error })

    }


  },
  Getallsociete: (req, res) => {
    User.findAll({
      include: [{
        model: Role,
        required: true,
        as: 'roles',
        where: { Libelle: 'Société' },
      }]

    }).then((responce) => {
      res.status(200).json({ societe: responce })
    }).catch((err) => {
      res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })
    })
  },
  Getbyid: (req, res) => {
    User.findAll({
      where: {
        ID: req.params.id
      }, include: [
        {
          model: Role,
          as: "roles",

        },
        {
          model: Abonnement,
          as: "abonnements",

        },]
    }).then((responce) => {
      responce[0].MotDePasse = '';
      res.status(200).json({ user: responce[0].dataValues })
    }).catch((err) => {
      res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })
    })
  },

  auth: async (req, res, next) => {
    try {
     
      global.user;
      this.user = await User.findAll({
        where: {
          Login: req.body.Login
        }, include: [{
          model: Role,
          as: "roles",

        }],
      })
      if (!this.user[0]) {
        return res.json({ msg: "login ou mot de passe incorrect", ok: false });
      }


      const pass = await bcrypt.compare(req.body.MotDePasse, this.user[0].MotDePasse)

      if (!pass) {
        return res.json({ msg: "login ou mot de passe incorrect", ok: false })
      }
      global.adminindex;
      this.adminindex = this.user[0].roles.findIndex(r => r.Libelle === 'Administrateur')
      if (!(this.adminindex !== -1 && this.user[0].Status !== false)) {
        global.societe;
        if (this.user[0].Status === false) {
          return res.json({ msg: "Votre compte n'est pas activé", ok: false })

        }
        if (this.user[0].SocieteID !== null) {
          this.societe = await User.findAll({
            where: {
              ID: Number(this.user[0].SocieteID)

            }
          })

        }
        if(this.societe ===null){
            if (this.societe[0].Status === false) {
          return res.json({ msg: "Le compte  de votre société n'est pas actif", ok: false })
        }
        }
      
      }





      const token = jwt.sign({ email: this.user[0].Email }, process.env.SECRET,
        { expiresIn: "4h" }
      );
      let userId;
      userId = { id: this.user[0].ID }

      const dernierconnection = new Date();
      const resdate = await User.update({ Dernierconnection: dernierconnection }, {
        where: {
          ID: this.user[0].ID
        }
      })
      this.user[0].MotDePasse=''
      res.status(200).json({ token: token,user:this.user[0] ,roles: this.user[0].roles, expiresIn: "14400", ok: true, msg: 'Connexion effectué avec succès' })
    }
        
        
        catch(err) {
    res.json({ err: "mot de passe ou email incorrect" + err, ok: false })
  };

},
  updateimage : (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const image = url + "/images/" + req.files['Image'][0].filename;
    const bady = { Image: image }
    User.update(bady, {
      where: {
        ID: req.params.id
      }
    }).then((responce) => {
      res.status(200).json({ imagepath: image, msg: 'Utilisateur mis à jour avec succès' })
    }).catch((err) => {
      res.status(500).json({ err: 'Erreur au niveau de serveur : ' + err })
    })
  },
    changemotdpasse: async (req, res) => {
      const user = await User.findAll({
        where: {
          ID: req.params.id
        }
      })
      const test = await bcrypt.compare(req.body.actuelMotDePasse, user[0].MotDePasse)
      if (!test) {
        return res.json({ msg: 'Mot de passe actuel incorrect', ok: false })
      }
      const hach = await bcrypt.hash(req.body.nouvelleMotDePasse, 10)

      User.update({ MotDePasse: hach }, {
        where: {
          ID: req.params.id
        }
      }).then((responce) => {
        res.json({ msg: 'Mot de passe mis à jour avec succès', ok: true })
      })
    },
      validateCaptcha: async (req, res) => {
        try {
          const token = req.body.recaptcha;
          // const secretkey = process.env.RECAPTCHA_SECRET_KEY; //the secret key from your google admin console;

          //token validation url is URL: https://www.google.com/recaptcha/api/siteverify 
          // METHOD used is: POST

          const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}&remoteip=${req.connection.remoteAddress}`
          // const url =  `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

          //note that remoteip is the users ip address and it is optional
          // in node req.connection.remoteAddress gives the users ip address
          if (token === null || token === undefined) {
            res.status(201).send({ success: false, message: "Token vide ou invalide" })
            return console.log("token empty");
          }

          request(url, function (err, response, body) {
            //the body is the data that contains success message
            body = JSON.parse(body);

            //check if the validation failed
            if (body.success !== undefined && !body.success) {
              res.status(200).json({
                success: false,
                message: "échec de recaptcha."
              });
            }

            //if passed response success message to client
            res.status(200).json({
              success: true,
              message: "recaptcha passé."
            });

          })

        } catch (error) {
          res.status(500).json({
            success: false,
            message: "recaptcha pas passé."
          });
        }

      },
        getallusers : async (req, res) => {
          try {
            const users = await User.findAll({
              include: [
                {
                  model: Role,
                  as: "roles",

                }, {
                  model: Abonnement,
                  as: "abonnements",

                },
              ], order: [['ID', 'ASC']]
            }
            )
            if (users) {
              res.status(200).json({ users })
            }
          } catch (error) {
            res.status(500).json({ err: 'Erreur au niveau de serveur : ' + error })

          }

        },
          recherchecompte: async (req, res) => {
            try {
              const useremail = await User.findOne({ where: { Email: req.body.email } })
              if (useremail) {
                const output = `
  <h1>changement de mot de passe oublie</h1>
  
  <ul>  
    <li>Bonjour: </li>
  </ul>
  <tr class=”button”  style="border-radius: 8px;">
  <a  class=”link” href="http://localhost:4200/changepassoublie/${useremail.ID}" target="_blank" 
  style=" background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;">
Change votre mot de passe</a>
  </tr>
<br>

  <h3>Message : </h3>
  <p>pour change votre mot de passe click sur le boutton</p>
`;

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                  host: "smtp.gmail.com",
                  port: 465,
                  secure: true,
                  auth: {
                    name: process.env.NAME,
                    user: process.env.EMAIL, // generated ethereal user
                    pass: process.env.PASSWORD // generated ethereal password
                  }, tls: {
                    rejectUnauthorized: false
                  },

                });

                // setup email data with unicode symbols
                let mailOptions = {
                  from: '"autoecole030@gmail.com', // sender address
                  to: useremail.Email, // list of receivers
                  subject: 'Changement de mot de passe oublie', // Subject line
                  text: 'Hello world?', // plain text body
                  html: output // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    return console.log('err message' + error.message);
                  }
                  console.log('Message sent: %s', info.messageId);
                  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                  res.status(200).json({ msg: 'email envouye a votre email', ok: true })
                })
              } else {
                res.status(200).json({ msg: 'email envouye a votre email', ok: true })

              }
            } catch (error) {
              res.status(500).json({ err: 'Erreur au niveau de serveur : ' + error })

            }
          },
            updatemotdepasse : async (req, res) => {
              try {

                const hash = await bcrypt.hash(req.body.MotDePasse, 10)

                const user = await User.update({ MotDePasse: hash }, {
                  where: {
                    ID: req.params.id
                  }
                })
                if (user) {
                  res.status(200).json({ msg: 'mot de passe chanage', ok: true })

                }
              } catch (error) {
                res.status(500).json({ err: 'Erreur au niveau de serveur : ' + error })

              }
            },
            getusershasrole:async(req,res)=>{
              try {
                console.log(req.params.role)
                const users = await User.findAll({
                  where:{
                    SocieteID:req.params.IDsociete,

                  },
                  include: [
                    {
                      model: Role,
                      as: "roles",
                      where:{Libelle: 'Client'}
    
                    }, {
                      model: Abonnement,
                      as: "abonnements",
    
                    },
                  ], order: [['ID', 'ASC']]
                }
                )
                if (users) {
                  res.status(200).json({ users })
                }
              } catch (error) {
                console.log(error)
                res.status(500).json({ err: 'Erreur au niveau de serveur : ' + error })
    
              }
    
            }

}