const path=require('path');
const hbs = require('hbs');
const express=require('express');
const forecast=require('./Weather.js')
const geocode=require('./call.js')
const { title } = require('process');
const publicdirectory=path.join(__dirname,'./public');
const app=express();
const viewsPath = path.join(__dirname, './views');
const partialpath=path.join(__dirname,'./views/partials');
app.set('view engine','hbs');
hbs.registerPartials(partialpath);
const viewsDirectory = path.join(__dirname, './views');

app.set('views', viewsDirectory); 
app.use(express.static(publicdirectory));
app.get('',(req,res)=>{
    res.render('index',{title:'Weather',name:'Prem'})
    
})
app.get('/weather',(req,res)=>{
    console.log(req.query);
    if(!req.query.address){
       return res.send({error:'Provide address'});
    }
    else{
        geocode(req.query.address,(error,response)=>{
            if(error){
                return res.send({error:error});
            }
            else{
                // console.log(response);
                const {location:lac,latitude:latu,longitude:longu}=response;
                forecast(latu,longu,(error,responser)=>{
                    if(error){
                        return res.send({error,});
                    }
                    else{
                        return res.send({place:req.query.address,forecast:responser,location:lac});
                    }
                })
            }
        })
        
    }
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Help Era'
    })
})
app.get('/about',(req,res)=>{
    res.render('About',{
        name:'About Section',
        title:'About'
    });
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
       title:'404',
       name:'Andrew mead',
       errormessage:'Article Not Found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'andrew mead',
        errormessage:'Page Not Found'
    })
})
app.listen(3000,()=>{
    console.log("Express is Up at Port 3000");
})