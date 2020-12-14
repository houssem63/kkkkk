const express=require('express');
const router=express.Router();
const voitureController =require('../controller/voitureController')
const voitureimages =require('../middleware/voitureupload')
const verifuser=require('../middleware/verifuser')

router.get('/getallvoitureofonesociete/:id',verifuser,voitureController.getallvoiture)
router.get('/getall/:id',verifuser,voitureController.getall)

router.post('/add',verifuser,voitureimages,voitureController.ajoute)
router.get('/getonevoiture/:id',verifuser,voitureController.getonevoiture)

router.put('/update/:id',verifuser,voitureimages,voitureController.update)
router.delete('/delete/:id',verifuser,voitureController.delete)
router.post('/addentretienparvehicule',verifuser,voitureController.addentretienparvehicule)
router.get('/entetienparv/:id',verifuser,voitureController.entetienparv)

module.exports =router