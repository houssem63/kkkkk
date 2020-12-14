const express=require('express');
const router=express.Router();
const RoleController =require('../controller/roleController')
const verifuser=require('../middleware/verifuser')

router.post('/add',verifuser,RoleController.ajouter)
router.delete('/delete/:id',verifuser,RoleController.Delete)
router.get('/getall',RoleController.Getall)
router.get('/getonebyid/:id',verifuser,RoleController.Getonebyid)
router.put('/update/:id',verifuser,RoleController.Update)
router.post('/adduserrole/:id',verifuser,RoleController.adduserrole)

router.post('/changerolePoids',verifuser,RoleController.changerolePoids)

module.exports =router