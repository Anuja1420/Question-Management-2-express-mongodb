const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();  //Creating a Router instance for creating requests.: router.get, router.put etc.

// app.use(express.json());  //While connecting with express and react no need to write this line

const questionSchema = new mongoose.Schema({
    questiontext : String,  //Fields which we want to include
    image : String,   //Url will be in String type
    description : String,
    category : String
})
const Questions = mongoose.model('Questions',questionSchema);

router.get("/" , async (req,res)=>{   //Get all data  // "/" means questions in postman's path
    try{
        const questions = await Questions.find();
        res.send(questions);
    }catch(error){
        res.status(500).send(error);
    }
})

router.get("/id/:id" , async (req,res)=>{    //Get Data by id  // "/id/:id" means questions/id/anyid
    try{
        const question = await Questions.findById(req.params.id);
        if(!question){
            return res.status(404).send('Question not found');
        }
        res.send(question);
    }catch(error){
        res.status(500).send(error);
    }
})

router.get("/category/:category" , async (req,res)=>{    //Get questions by Category
    try{
        const question = await Questions.findByCategory(req.params.id);
        if(!question){
            return res.status(404).send('Question not found');
        }
        res.send(question);
    }catch(error){
        res.status(500).send(error);
    }
})

router.delete("/:id" , async (req,res)=>{    //Delete data by Id
    try{
        const question = await Questions.findByIdAndDelete(req.params.id);
        if(!question){
            return res.status(404).send('Question not found');
        }
        res.send('Question deleted successfully');
    }catch(error){
        res.status(500).send(error);
    }
})

router.put("/:id" , async (req,res)=>{   //Put data By Id
    try{
        const question = await Questions.findByIdAndUpdate(req.params.id , req.body, {new:true});
        if(!question){
            return res.status(404).send('Question not found');
        }
        res.send("Question Updated Successfully...");
    }catch(error){
        res.status(500).send(error);
    }
})

router.post('/' , async (req,res)=>{     //Post data by Id
    try{
        const question = new Questions(req.body);
        await  question.save();
        res.send("Question Added Successfully");
    }catch(error){
        res.status(500).send(error);
    }
})

module.exports = router;

