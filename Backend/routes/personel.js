const express=require('express');
const router=express.Router();
const PersonnelController =require('../controller/personnelController')
const personnel_image =require('../middleware/personnelimage')

router.post('/add',personnel_image,PersonnelController.ajouter)
router.delete('/delete/:id',PersonnelController.Delete)
router.get('/getall/:id',PersonnelController.Getall)
router.get('/getonebyid/:id',PersonnelController.Getonebyid)
router.put('/update/:id',personnel_image,PersonnelController.Update)

module.exports =router