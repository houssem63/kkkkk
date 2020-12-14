const express=require('express');
const router=express.Router();
const VignetteController =require('../controller/vignetteController')
const voitureimages =require('../middleware/voitureupload')
const verifuser=require('../middleware/verifuser')

router.post('/add',verifuser,voitureimages,VignetteController.ajoute)
router.get('/getVignetteofonevoiture/:id',verifuser,VignetteController.getVignetteofonevoiture)
router.delete('/delete/:id',verifuser,VignetteController.delete);
router.get('/getone/:id',verifuser,VignetteController.getone)
router.put('/update/:id',verifuser,voitureimages,VignetteController.update)

module.exports=router