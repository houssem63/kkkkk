const express=require('express');
const router=express.Router();
const CompteController =require('../controller/compteController')
const verifuser=require('../middleware/verifuser')

router.post('/add',verifuser,CompteController.ajouter)
router.delete('/delete/:id',verifuser,CompteController.Delete)
router.get('/getall/:id',verifuser,CompteController.Getall)
router.get('/getonebyid/:id',verifuser,CompteController.Getonebyid)
router.put('/update/:id',verifuser,CompteController.Update)

module.exports =router