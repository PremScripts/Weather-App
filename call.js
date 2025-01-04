const request = require("request")

const geocode=(address,callback)=>{
    const url=`https://api.maptiler.com/geocoding/${address}.json?proximity=7.658000%2C46.838000&autocomplete=false&fuzzyMatch=true&limit=3&key=N1r6r2Ft6aSlS9Qkp2aM`
    request({url:url,json:true},(error,response)=>{
        if(error){
           callback('Check Internet Connection');
        }
        else if(response.body.features.length===0){
           callback('Location write not defined rewrite location again');
        }
        else{
            const {place_name:place,center:[longu,latu]}=response.body.features[0];
            callback(undefined,{
                location:place,
                latitude:latu,
                longitude:longu
            })
        }
    })
}
module.exports=geocode;