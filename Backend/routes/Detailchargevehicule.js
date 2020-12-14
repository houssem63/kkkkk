const express=require('express');
const router=express.Router();
const DetailchargevehiculeController=require('../controller/detailchargevehiculeController')
const verifuser=require('../middleware/verifuser')

router.post('/add',verifuser,DetailchargevehiculeController.add)
router.put('/update/:id',verifuser,DetailchargevehiculeController.update)
router.delete('/delete/:id',verifuser,DetailchargevehiculeController.delete)
module.exports =router