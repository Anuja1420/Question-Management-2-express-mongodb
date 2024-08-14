const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


// app.use(express.json());

const userSchema = new mongoose.Schema({
    "username" : String,
    "password" : String,
    "role" : String

})
const Users = mongoose.model('Users',userSchema);


router.get("/" , async (req,res)=>{   //Get all data
    try{
        const users = await Users.find();
        res.send(users);
    }catch(error){
        res.status(500).send(error);
    }
})

router.get("/:id" , async (req,res)=>{    //Get Data by id
    try{
        const user = await Users.findById(req.params.id);
        if(!user){
            return res.status(404).send('User not found');
        }
        res.send(user);
    }catch(error){
        res.status(500).send(error);
    }
})

router.get("/username/:username" , async (req,res)=>{    //Get Data by id
    try{
        const user = await Users.find({username : req.params.username});
        if(!user){
            return res.status(404).send('User not found');
        }
        res.send(user);
    }catch(error){
        res.status(500).send(error);
    }
})


router.delete("/:id" , async (req,res)=>{    //Delete data by Id
    try{
        const user = await Users.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).send('User not found');
        }
        res.send(user);
    }catch(error){
        res.status(500).send(error);
    }
})

router.put("/:id" , async (req,res)=>{   //Put data By Id
    try{
        const user = await Users.findByIdAndUpdate(req.params.id , req.body, {new:true});
        if(!user){
            return res.status(404).send('User not found');
        }
        res.send(user);
    }catch(error){
        res.status(500).send(error);
    }
})

router.post("/" , async (req,res)=>{     //Post data by Id
    try{
        const user = new Users(req.body);
        await  user.save();
        res.send(user);
    }catch(error){
        res.status(500).send(error);
    }
})

module.exports = router;

