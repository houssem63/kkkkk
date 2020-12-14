const express=require('express');
const router=express.Router();
const VisiteController =require('../controller/visiteController')
const voitureimages =require('../middleware/voitureupload')
const verifuser=require('../middleware/verifuser')

router.post('/add',verifuser,voitureimages,VisiteController.ajoute)
router.get('/getvisteofonevoiture/:id',verifuser,VisiteController.getvisteofonevoiture)
router.delete('/delete/:id',verifuser,VisiteController.delete);
router.get('/getone/:id',verifuser,VisiteController.getone)
router.put('/update/:id',verifuser,voitureimages,VisiteController.update)

module.exports=router