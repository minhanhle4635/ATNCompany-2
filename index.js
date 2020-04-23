const express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb+srv://minhanhle:minhanh123@cluster0-p2f69.gcp.mongodb.net/test?retryWrites=true&w=majority';

router.get('/',(req,res)=>{
    req.session.username = null;
    res.render('index');
})

router.post('/',async(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;

    let client= await MongoClient.connect(url);
    let dbo = client.db("ATNCompany");
    let results = await dbo.collection("Account").find({"username":username, "password":password}).toArray();
    if(results == 0){
        res.redirect("/");          
    }
    else{
        req.session.username = username; 
        res.render("homepage");
    }
})

module.exports = router;
