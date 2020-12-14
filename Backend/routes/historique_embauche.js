const express=require('express');
const router=express.Router();
const Historique_embaucheController =require('../controller/historique_embaucheController')
const verifuser=require('../middleware/verifuser')

router.post('/add',verifuser,Historique_embaucheController.ajouter)
router.delete('/delete/:id',verifuser,Historique_embaucheController.Delete)
router.get('/getall/:id',verifuser,Historique_embaucheController.Getall)
router.get('/getonebyid/:id',verifuser,Historique_embaucheController.Getonebyid)
router.put('/update/:id',verifuser,Historique_embaucheController.Update)

router.get('/gethistoriquedeonepersonnel/:id',Historique_embaucheController.gethistoriquedeonepersonnel)

module.exports =router