const express=require('express');
const router=express.Router();
const MissionController =require('../controller/missionController')
const verifuser=require('../middleware/verifuser')

router.delete('/delete/:id',verifuser,MissionController.Delete)
router.post('/add',verifuser,MissionController.add)
router.get('/getall/:id',verifuser,MissionController.getall)
router.get('/getone/:id',verifuser,MissionController.getone)


router.put('/update/:id',verifuser,MissionController.update)

module.exports =router