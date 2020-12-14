const express=require('express');
const router=express.Router();
const fournisseurController =require('../controller/fournisseurController')
const personnelimage =require('../middleware/personnelimage');
const verifuser=require('../middleware/verifuser')

router.post('/add',verifuser,personnelimage,fournisseurController.ajouter)
router.delete('/delete/:id',verifuser,fournisseurController.Delete)
router.get('/getall/:id',verifuser,fournisseurController.getall)
router.get('/getone/:id',verifuser,fournisseurController.getone)
router.put('/update/:id',verifuser,personnelimage,fournisseurController.Update)

module.exports =router