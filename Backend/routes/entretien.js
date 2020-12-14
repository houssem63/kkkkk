const express=require('express');
const router=express.Router();
const EntretienController =require('../controller/entretienController')
const verifuser=require('../middleware/verifuser')

router.post('/add',verifuser,EntretienController.ajouter)
router.delete('/delete/:id',verifuser,EntretienController.Delete)
router.get('/getall',verifuser,EntretienController.getall)
//router.get('/getonebyid/:id',EntretienController.Getonebyid)
router.put('/update/:id',verifuser,EntretienController.Update)

module.exports =router