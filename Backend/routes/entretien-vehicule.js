const express=require('express');
const router=express.Router();
const Entretien_vehiculeController =require('../controller/entretien_vehiculeController')
const verifuser=require('../middleware/verifuser')

router.post('/add',verifuser,Entretien_vehiculeController.ajouter)
router.delete('/delete/:id',verifuser,Entretien_vehiculeController.Delete)
router.get('/getall/:id',verifuser,Entretien_vehiculeController.getall)
router.get('/getone/:id',verifuser,Entretien_vehiculeController.getone)
router.put('/update/:id',verifuser,Entretien_vehiculeController.Update)

module.exports =router