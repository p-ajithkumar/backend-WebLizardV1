const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/weblizard',()=>{
    console.log('mongodb connction done');
})


//creating a model

const User= mongoose.model('User',{
    
    name:String,
    password:String,
    email:String
}


)

const Newsdata= mongoose.model('Newsdata',{


    source: {
        id: String,
        name: String
      },
      author: String,
      title: String,
      description: String,
      url: String,
      urlToImage: String,
      publishedAt: String,
      content: String
      
})


const Bookmark= mongoose.model('Bookmark',{


   
      author: String,
      title: String,
      description: String,
      url: String,
      urlToImage: String,
      publishedAt: String,
      content: String
      
})



module.exports={User, Newsdata, Bookmark}

