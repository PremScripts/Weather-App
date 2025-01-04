const address=process.argv[2];
const request=require('request');
const geocode=require('./call.js');
const forecast=(latitude,longitude,callback)=>{
  const urlp=`https://api.weatherstack.com/current?access_key=b56c019af7c6a141f5cb091863b7dce3&query=${latitude},${longitude}`
  request({url:urlp,json:true},(error,{body})=>{
    if(error){
        callback('Internet error');
    }
    else if(body.error){
        callback('Incorrect parameters');
    }
    else{
        const data=body;
        callback(undefined,`The Wheather Description is ${data.current.weather_descriptions[0]} and the temperature is ${data.current.temperature} Degree Celcius`);
    }
  })
}
module.exports=forecast;
