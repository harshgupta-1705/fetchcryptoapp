const axios=require('axios');

/*
    creating getBalance controller that will fetch user tansaction from api and compute its
    current balance and also fetch current ether price 
*/
const getBalance=async (req,res)=>{
    const address=req.query.address;
    try{
        //fetching transaction list
        const resp=await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.APIKEY}`);
        if(resp.data.status==='0')
        throw new Error("Invalid Address");

        // computing user balance asper given conditions
        let userBalance=0;
        resp.data.result.map((e)=>{
            if(e.to===address)
            userBalance+=Number(e.value);
            if(e.from===address)
            userBalance-=Number(e.value);
        });
        // fetching current price
        const resp2=await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
        const price=resp2.data.ethereum.inr;
        const obj={
            status: "success",
            balance_eth : userBalance,
            curr_price_inr : price
        }
        return res.status(200).json(obj);
    }
    catch(err)
    {
        return res.status(400).json({status : "failure",error : err.message});
    }
};

module.exports=getBalance;