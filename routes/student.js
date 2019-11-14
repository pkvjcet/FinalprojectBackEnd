const express=require('express');
const router=express.Router();
router.get('/',(req,res)=>{
    
    res.send("welcome student");
})
module.exports=router;