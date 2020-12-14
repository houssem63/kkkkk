const express=require('express');
const prestataireassuranceController = require('../controller/prestataireassuranceController');
const router=express.Router();
const PrestataireController =require('../controller/prestataireassuranceController')
const verifuser=require('../middleware/verifuser')


router.post('/add/:id',verifuser,PrestataireController.ajoute)
router.get('/getall/:id',verifuser,PrestataireController.getall)
router.get('/getone/:id',verifuser,prestataireassuranceController.getone)
router.put('/update/:id',verifuser,PrestataireController.update)
router.delete('/delete/:id',verifuser,prestataireassuranceController.delete)
module.exports =router