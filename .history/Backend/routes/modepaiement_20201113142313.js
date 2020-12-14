const express=require('express');
const router=express.Router();
const ModePaiementController =require('../controller/modepaiementController')

router.post('/add',ModePaiementController.add)
router.delete('/delete/:id',ModePaiementController.Delete)
router.get('/getall',ModePaiementController.Getall)
router.get('/getonebyid/:id',ModePaiementController.Getonebyid)
router.put('/update/:id',ModePaiementController.Update)

module.exports =router