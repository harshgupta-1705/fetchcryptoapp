/* defining router to fetch user balance and current ether price*/

const express=require('express');
const getBalanceController=require('../controllers/getBalance.controller.js');

const router=express.Router();

router.get('/getBalance',getBalanceController);

module.exports= router;