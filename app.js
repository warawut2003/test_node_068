const express =  require('express');
const dotenv =  require('dotenv');
const app = express();

const PORT = process.env.PORT || 3068;






app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const writeRead = require('./routes/writeRead');
const UpdateDelete = require('./routes/UpdateDelete');

app.use('/api',writeRead);
app.use('/api',UpdateDelete);


app.use('/',function(req,res,next){
    res.sendStatus(404);
})

app.listen(PORT,()=>
    console.log('Server running on port:'+ PORT)
);