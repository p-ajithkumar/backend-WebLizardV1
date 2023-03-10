const { Mongoose } = require('mongoose')
const db= require('./db')



const login =(uname,pswd)=>
{
  
  return db.User.findOne(
    {
      name:uname,
      password:pswd
    }
   ).then((result)=>{

    if(result) //if acc already exits 
    {
        return{
            statusCode:200,
            message:'sucessful login!!',
            userdata:result
         }
    }
    
    else{
      return {
        statusCode:404,
        message:'inavild username or password!'
      }

    }
    
    

   })
}


const news= ()=>
{
  return db.Newsdata.find().then((result)=>
  {
    if(result) 
    {
        return{
            statusCode:200,
            newsData:result
        }
    }

    else
    {
      return{
        statusCode:404,
        message:"data not found"
    }
    }
  })
}








const register =(uname,pswd,mail)=>
{
  
  return db.User.findOne(
    {email:mail}
   ).then((result)=>{

    if(result) //if acc already exits 
    {
 return db.User.findOne({name:uname}).then((result)=>{

  return{
    statusCode:403,
    message:'username or mail address already in use!'
}

 })
    }
    
    else{
    
      const newUser = new db.User({
        name:uname,
        password:pswd,
        email:mail
      })

      newUser.save()

      return {
        statusCode:200,
        message:'registration successful, kindly login!'
      }

    }
    
    

   })
}



const addtobookmark =(newsdata)=>
{
    //checking id matches with product's key id
return db.Bookmark.findOne({url:newsdata.url}).then(result=>
    {
        if(result)
        {
            return{
                statusCode:401,
                message:"item already in bookmarks"
            } 
        }



                else{
                  let newBookmark = new db.Bookmark({
                    author: newsdata.author,
                    title: newsdata.title,
                    description: newsdata.description,
                    url: newsdata.url,
                    urlToImage: newsdata.urlToImage,
                    publishedAt: newsdata.publishedAt,
                    content: newsdata.content
                      })

            newBookmark.save()

            return{
                statusCode:200,
                message:"item bookmarked"
            } 
        }
    })
}



const getbookmarks = ()=>{
    return db.Bookmark.find().then((result)=>
    {
        console.log(result);
        
        if(result)
        {
          return{
            statusCode:200,
            bookmarks:result
           }
            
        }
    
        else
        {
            return{
                statusCode:404,
                message:"no bookmarks added yet"
            }
        }
    })
}









const removebookmark =(content)=>
{

  console.log('content in ds is',content);
   
return db.Bookmark.findOne({url:content}).then(result=>
    {

        if(result)
        {
         
          return db.Bookmark.deleteOne(result).then(data=>
            {
              if(result)
              {
               
              return  db.Bookmark.find().then(newdata=>
                {
                   if(newdata)
                   {
                    return{
                      statusCode:200,
                      message:"item removed",
                      bookmarks:newdata
                           }
                   }

                })
              }
            })
        }

        else{
               return{
                statusCode:401,
                message:"item not found"
                     } 
        }
    })
}








const update =(mail,pswd)=>
{
  
  return db.User.findOne(
    {email:mail}
   ).then((result)=>{

    if(result) //if acc already exits 
    {
 
      result.password = pswd

      result.save()

      return {
        statusCode:200,
        message:'Password changed successfully, kindly login again'
      }

     
    }
    
    else{

      return {
        statusCode:404,
        message:'No account found associated with given mail address'
      }

    }
    
    

   })
}


const postNews=(newData)=>
{

 return db.Newsdata.findOne({url:newData.url}).then((result)=>
 {
  if(result)
  {
    return {
      statusCode:404,
      message:'Sorry This News Was Already Was Published'
    }
  }

  else{
  
    const addNews = db.Newsdata({

      author: newData.author,
      title: newData.title,
      description: newData.description,
      url: newData.url,
      urlToImage: newData.urlToImage,

    })

    addNews.save()

    return{
      statusCode:200,
      message:"your content has been published"
  } 
  }

 })

}




module.exports = {
 login,news,register,addtobookmark,getbookmarks,removebookmark,update,postNews
}


