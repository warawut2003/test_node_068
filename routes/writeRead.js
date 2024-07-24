'use strict';

const express = require('express');
const wrRoute = express.Router();
const connection = require('../db');

wrRoute.post('/students',function(req,res,next){
    const {first_name ,last_name, email, major ,enrollment_year} =  req.body;

    if(!first_name ||!last_name ||!email  ||!major ||!enrollment_year){
        return res.status(400).send('Missing required fields');
    }

    connection.execute(`INSERT INTO students(first_name, last_name, email, major, enrollment_year) VALUES (?, ?, ?, ?, ?);`,
        [first_name, last_name, email, major, enrollment_year]
    ).then(() =>{
        console.log('Inserted');
        
        
    }).catch((err) =>{
        console.log(err);
    });
    res.status(200).send('Insert Successfully');
    res.end();
})

wrRoute.get('/students',function(req,res,next){
    

    connection.execute(`SELECT * FROM students;`
    ).then((result) =>{
        var rawData = result[0];
        res.send(rawData);
    }).catch((err) =>{
        console.log(err);
        res.end();
    });
    
    
})

wrRoute.get('/students/:id',function(req,res,next){
    

    connection.execute(`SELECT * FROM students WHERE student_id=?;`,
        [req.params.id]
    ).then((result) =>{
        var data = result[0];
        if(data.length === 0 ){
            res.status(400).send("Student not found");
        }else{
            res.status(200).json(data);
            
        }
    }).catch((err) =>{
        console.log(err);
        res.end();
    });
    
    
})

module.exports = wrRoute;