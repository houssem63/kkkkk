const express=require('express');
const router=express.Router();
const ClientController =require('../controller/clientController')
const client_image =require('../middleware/personnelimage')
const verifuser=require('../middleware/verifuser')
router.post('/add',verifuser,client_image,ClientController.ajouter)
router.delete('/delete/:id',ClientController.Delete)
router.get('/getall/:id',verifuser,ClientController.Getall)
router.get('/getonebyid/:id',ClientController.Getonebyid)
router.put('/update/:id',client_image,ClientController.Update)

module.exports =router