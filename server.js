const { urlencoded } = require('express');
const express=require('express');
const mongoose=require('mongoose');
conn=mongoose.connect("mongodb://localhost:27017/mernblog");
conn.then(()=>{
    console.log("you are connected to mongodb");
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
__dirname=path.resolve();
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,'/client/build')));
}
app.listen(port,()=>{
    console.log(` i am connected at port number ${port}`);
})