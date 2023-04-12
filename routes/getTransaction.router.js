/* defining router to fetch user Transaction list*/

const express=require('express');
const getTransactionController=require('../controllers/getTransaction.controller.js');

const router=express.Router();

router.get('/getTransaction',getTransactionController);

module.exports= router;