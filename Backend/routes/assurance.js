const express=require('express');
const router=express.Router();
const AssuranceController =require('../controller/assuranceController')
const voitureimages =require('../middleware/voitureupload')
const verifuser=require('../middleware/verifuser')

router.post('/add',verifuser,voitureimages,AssuranceController.ajoute)
router.get('/getassranceofonevoiture/:id',verifuser,AssuranceController.getassranceofonevoiture)
router.delete('/delete/:id',verifuser,AssuranceController.delete);
router.get('/getone/:id',verifuser,AssuranceController.getone)
router.put('/update/:id',verifuser,voitureimages,AssuranceController.update)
module.exports=router