'use strict';

const express = require('express');
const udRoute = express.Router();
const connection = require('../db');


udRoute.put('/students/:id',function(req,res,next){
    const {first_name ,last_name, email, major ,enrollment_year} =  req.body;

    if(!first_name ||!last_name ||!email  ||!major ||!enrollment_year){
        return res.status(400).send('Missing required fields');
    }

    connection.execute(`UPDATE students SET first_name=?, last_name=?, email=?, major=?, enrollment_year=? WHERE student_id=?;`,
        [first_name, last_name, email, major, enrollment_year, req.params.id]
    ).then(() =>{
        console.log("Updated");
        res.status(200).send("Update Successfully.")
    }).catch((err) =>{
        console.log(err);
        res.end();
    });
    
    
})

udRoute.delete('/students/:id',function(req,res,next){
    connection.execute(`DELETE FROM students WHERE student_id=?;`,
        [req.params.id]
    ).then(() =>{
        console.log("Deleted");
        res.status(200).send("Delete Successfully.")
    }).catch((err) =>{
        console.log(err);
        res.end();
    });
})



module.exports = udRoute;