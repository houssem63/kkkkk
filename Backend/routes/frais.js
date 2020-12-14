const express=require('express');
const router=express.Router();
const FraisController =require('../controller/fraisController')
const verifuser=require('../middleware/verifuser')

router.post('/add',verifuser,FraisController.ajouter)
router.delete('/delete/:id',verifuser,FraisController.Delete)
router.get('/getall',verifuser,FraisController.getall)
router.get('/getone/:id',verifuser,FraisController.getone)
router.put('/update/:id',verifuser,FraisController.Update)

module.exports =router