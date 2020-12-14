const express=require('express');
const router=express.Router();
const marqueController =require('../controller/marqueController')

const verifuser=require('../middleware/verifuser')





router.get('/ajoute',verifuser,marqueController.addmarque)
router.delete('/delete/:id',verifuser,marqueController.Delete)
router.get('/getall',verifuser,marqueController.Getall)
router.get('/getonebyid/:id',verifuser,marqueController.Getonebyid)
router.put('/update/:id',verifuser,marqueController.Update)
router.post('/add',verifuser,marqueController.add)
module.exports =router