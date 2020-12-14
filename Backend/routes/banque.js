const express=require('express');
const router=express.Router();
const BanqueController =require('../controller/banqueController')
const verifuser=require('../middleware/verifuser')

router.get('/ajoute',verifuser,BanqueController.ajouter)
router.delete('/delete/:id',verifuser,BanqueController.Delete)
router.get('/getall',verifuser,BanqueController.Getall)
router.get('/getonebyid/:id',verifuser,BanqueController.Getonebyid)
router.put('/update/:id',verifuser,BanqueController.Update)
router.post('/add',verifuser,BanqueController.add)

module.exports =router