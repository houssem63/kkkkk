const express=require('express');
const router=express.Router();
const PosteController =require('../controller/posteController')
const verifuser=require('../middleware/verifuser')

router.post('/add',verifuser,PosteController.ajouter)
router.delete('/delete/:id',verifuser,PosteController.Delete)
router.get('/getall/:id',verifuser,PosteController.Getall)
router.get('/getonebyid/:id',verifuser,PosteController.Getonebyid)
router.put('/update/:id',verifuser,PosteController.Update)

module.exports =router