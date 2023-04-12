/* creating functionality that will fetch current ether price from coingecko api 
and store this data along with current time in database */

const priceModel=require('../models/price.model.js');
const axios=require('axios');

const setPrice=async ()=>{
    try{
        const resp=await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');// fetching current price from api
        const price=resp.data.ethereum.inr;
        var moment = require('moment-timezone');
        const datetime =moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss');
        await priceModel.create({price : price, time : datetime});// storing price in database
    }
    catch(err)
    {
        console.log(err.message);
    }
};

module.exports=setPrice;