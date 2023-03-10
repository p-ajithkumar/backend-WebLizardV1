const express =require('express')
const cors = require('cors')
const dataService = require('./services/dataService')

const server = express()

server.listen(3000,()=>{
    console.log('server started at 3000');
})

server.use(cors

    ({origin:'http://localhost:4200'})

    )


    server.use(express.json())







    server.post('/login',(req,res)=>{ 
        console.log(req.body);
        dataService.login(req.body.uname, req.body.pswd)
        .then((result)=>
        {
    
            res.status(result.statusCode).json(result) 
        })
       
    }) 








       server.get('/news',(req,res)=>{ 
dataService.news().then((result)=>
{
    res.status(result.statusCode).json(result)
})
        
       })
       
       

       server.post('/register',(req,res)=>
       {
        dataService.register(req.body.uname,req.body.pswd,req.body.mail).then((result)=>
        {
            res.status(result.statusCode).json(result)
        })
       })
       







       server.get('/getbookmarks',(req,res)=>
       {
        dataService.getbookmarks().then((result)=>{
            res.status(result.statusCode).json(result)
        })
       })



       server.post('/addtobookmark',(req,res)=>
       {
        
dataService.addtobookmark(req.body).then((result)=>
{
    console.log('mycheck',req.body);
    res.status(result.statusCode).json(result)
})
       })
   






server.post('/removebookmark',(req,res)=>
{
 
dataService.removebookmark(req.body.url).then((result)=>
{
console.log('content in index.js is',req.body);
res.status(result.statusCode).json(result)
})
})


server.put('/update',(req,res)=>
{
 dataService.update(req.body.mail,req.body.pswd).then((result)=>
 {
     res.status(result.statusCode).json(result)
 })
})




server.post('/post-news',(req,res)=>
{
 dataService.postNews(req.body).then((result)=>
 {
     console.log('in index.js',req.body);
     res.status(result.statusCode).json(result)
 })
})