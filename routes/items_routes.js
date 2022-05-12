const express = require('express');
const router = express.Router();

// import Task model 
const Modelone = require('../models/data_structure');
const  listofdata = Modelone.listofQuestions;

//  todo : Define dynamic routes 

// GEt data from server 
router.get('/datas',(req,res) =>{
    listofdata.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    });
});

//  put the data in to the server 
router.use(express.urlencoded());
router.use(express.json());

router.post("/data",(req,res) => {
 listofdata.create(req.body)
  .then((result) => {
    res.send(result);
    console.log("Data already uploaded into mongoDB");
  })
  .catch((error) => {
    res.send(error);
    console.log("We can't upload data into mongoDB'");
  })
})

// Update data in the server
router.put("/updateDt/:id",(req, res) => {
    listofdata.updateMany({_id:req.params.id},req.body)
    .then((result) => {
      res.send(result);
      console.log("update successfully");
    })
    .catch((error) => {
      res.send(error);
      console.log("can't update from mongoDB");
    })
  })

// Delete data in the server 
router.delete("/deletequestion/:id",(req,res) => {
    listofdata.deleteOne({_id:req.params.id})
    .then((result) => {
      res.send(result);
      console.log("successfully for delete data");
    })
    .catch((error) => {
      res.send(error);
      console.log("Unsuccessfully for delete data");
    })
  })

module.exports =router;