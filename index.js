const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id : 1, name:'course1'},
    {id : 2, name:'course2'},
    {id : 3, name:'course3'},
];

app.get('/',(req,res)=>{
    res.send('Hello world!');
});

// app.get('/',(req,res)=>{
//     return res.json('Hello world');
// });

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.get('/api/courses:id',(req,res)=>{

    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given id was not found ');
    res.send(course);
});


//post request
app.post('/api/courses',(req,res)=>{
    const schema = {
        name :Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body,schema);

    //.........without joi.................

    // if (!req.body.name ||req.body.name.length<3) {
    //     res.status(400).send('Name is required and should be minimum 3 characters');
    //     return;
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
        
    }

        
    // }
    

    const course ={
        id : courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.params);
});

app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.query);
});

app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id===parseInt(req.params.id));

    if (!course)res.status(404).send('The course with the given Id was not found');

    const schema = {
        name : Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);

});

const port = process.env.PORT|| 3000;

app.listen(port,()=>console.log(`listening on port ${port}...`));