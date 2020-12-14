const express=require('express');
const router=express.Router();
const UserController =require('../controller/UserController')
const AbonnementController =require('../controller/abonnementController')
const verifuser=require('../middleware/verifuser')

const personnelimage =require('../middleware/personnelimage');
const { user_role } = require('../models/relations');
const abonnementController = require('../controller/abonnementController');
router.post('/add',personnelimage,UserController.ajouter)
router.delete('/delete/:id',verifuser,UserController.Delete)
router.get('/getallsociete',UserController.Getallsociete)
router.get('/getonebyid/:id',verifuser,UserController.Getbyid)
router.put('/update/:id',verifuser,personnelimage,UserController.Update)
router.put('/updateimage/:id',personnelimage,UserController.updateimage)
router.post('/changemotdpasse',UserController.changemotdpasse)
router.post('/validate_captcha',UserController.validateCaptcha)
router.post('/login',UserController.auth)
router.get('/getallusers',verifuser,UserController.getallusers)
router.post('/recherchecompte',UserController.recherchecompte)
router.put('/updatemotdepasse/:id',UserController.updatemotdepasse)
router.get('/getallabonnement/:id',verifuser,abonnementController.getabonnement)
router.post('/ajouteabonnement/:id',verifuser,abonnementController.addabonnement)
router.put('/updateabonnement/:id',verifuser,abonnementController.updateabonnement)
router.get('/getusershasrole/:IDsociete/:role',verifuser,UserController.getusershasrole)
router.get('/GetonePersonnelbyid/:id',verifuser,UserController.GetonePersonnelbyid)
router.get('/resetPassword',UserController.resetPassword)
module.exports =router