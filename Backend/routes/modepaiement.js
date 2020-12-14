const express=require('express');
const router=express.Router();
const ModePaiementController =require('../controller/modepaiementController')
const verifuser=require('../middleware/verifuser')

router.post('/add',verifuser,ModePaiementController.add)
router.delete('/delete/:id',verifuser,ModePaiementController.Delete)
router.get('/getall',verifuser,ModePaiementController.Getall)
router.get('/getonebyid/:id',verifuser,ModePaiementController.Getonebyid)
router.put('/update/:id',verifuser,ModePaiementController.Update)

module.exports =router