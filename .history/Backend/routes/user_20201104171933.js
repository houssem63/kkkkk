const express=require('express');
const router=express.Router();
const UserController =require('../controller/UserController')
const AbonnementController =require('../controller/abonnementController')

const personnelimage =require('../middleware/personnelimage');
const { user_role } = require('../models/relations');
const abonnementController = require('../controller/abonnementController');
router.post('/add',personnelimage,UserController.ajouter)
router.delete('/delete/:id',UserController.Delete)
router.get('/getallsociete',UserController.Getallsociete)
router.get('/getonebyid/:id',UserController.Getbyid)
router.put('/update/:id',personnelimage,UserController.Update)
router.put('/updateimage/:id',personnelimage,UserController.updateimage)
router.put('/changemotdpasse/:id',UserController.changemotdpasse)
router.post('/validate_captcha',UserController.validateCaptcha)
router.post('/login',UserController.auth)
router.get('/getallusers',UserController.getallusers)
router.post('/recherchecompte',UserController.recherchecompte)
router.put('/updatemotdepasse/:id',UserController.updatemotdepasse)
router.get('/getallabonnement/:id',abonnementController.getabonnement)
router.post('/ajouteabonnement/:id',abonnementController.addabonnement)
router.put('/updateabonnement/:id',abonnementController.updateabonnement)

module.exports =router