/*
importing required packages and database for creating express instance and environment
*/
const express=require('express');  
const dotenv=require('dotenv').config();
const cors=require('cors');
const database=require('./database/database.js');

/*importing routers to handle routes and also importing fetchPriceSystem */
const getTransactionRouter=require('./routes/getTransaction.router.js');
const fetchPriceSystem=require('./backGroundSystems/fetchPriceSystem.js');
const getBalanceRouter=require('./routes/getBalance.router.js');

const app=express();
const port=process.env.PORT;

/* middlewares for express instance*/
app.use(express.json());
app.use(cors());


setInterval(fetchPriceSystem,600000);  // Task 2 implementing functionality that store price of ether every 10 minutes

app.use('/transaction',getTransactionRouter); // Task 1 fetching user transaction history from etherscan.io api
app.use('/balance',getBalanceRouter); // Task 3 fetching total user balance and current price 

app.listen(port,()=>{
console.log(`Listening on port - ${port}`);
});