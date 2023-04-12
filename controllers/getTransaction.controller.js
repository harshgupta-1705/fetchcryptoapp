const userModel=require('../models/user.model.js');
const axios=require('axios');

/*
    creating transaction controller that will fetch transaction list from etherscan api 
    ans store this information in user collection
*/

const getTransaction=async (req,res)=>{
    const add=req.query.address;
    try{
        //fetching response from api using axios
        const resp=await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${add}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.APIKEY}`);
        if(resp.data.status==='0')
        throw new Error("Invalid Address");

        const user=await userModel.find({address : add}); // checking whether user already exists or not
        if(user.length===0)
        await userModel.create({address : add,transaction : resp.data.result});// if not exist than create record
        else 
        await userModel.updateOne({address : add},{transaction : resp.data.result});// if exist than update transaction list
        
        return res.status(200).json({status : "success",result : resp.data.result});
    }
    catch(err)
    {
        return res.status(400).json({status : "failure",error : err.message});
    }
};

module.exports=getTransaction;