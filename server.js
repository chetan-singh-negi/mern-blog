const express=require('express');
const mongoose=require('mongoose');
const DB="mongodb+srv://chetan:Chetan@9410@cluster0.q8u0hcq.mongodb.net/mernblog?retryWrites=true&w=majority";
conn=mongoose.connect(DB);
conn.then(()=>{
    console.log("you are connected to mongodb atlas");
}).catch(()=>{
    console.log("you are not connect to mongodb");
})
const path=require('path');
const articleSchema=mongoose.Schema({
    name:String,
    comments:Array
});
const article=mongoose.model('article',articleSchema);
const app=express();
const port=process.env.port || 8000;
app.use(express.json({extended:false}));
app.get('/',(req,res)=>{
    res.send("hello kaise h app");
})
app.post('/',(req,res)=>{
    res.send(`hello ${req.body.name}`);
})
app.get('/article/:name',(req,res)=>{
    res.send(`hello ${req.params.name}`);
})
app.post('/api/articles/:name',async(req,res)=>{
    let x=req.params.name;
    const info=await article.findOne({name:x});
    res.json(info);
})
app.post('/api/articles/:name/add-comments',async (req,res)=>{
    let x=req.params.name;
    const username=req.body.username;
    const text=req.body.comment
    const a=await article.find({name:x},{comments:1});
    let b=a[0].comments;
    b=[...b,{name:username,comment:text}];
    const result=await article.updateOne({name:x},{$set:{comments:b}});
    res.json(result);
})
app.listen(port,()=>{
    console.log(` i am connected at port number ${port}`);
})