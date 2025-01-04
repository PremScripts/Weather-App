
const formevent=document.querySelector('form');
const searchbar=document.querySelector('input');
const messageone=document.querySelector('#messageone');
const messagetwo=document.querySelector('#messagetwo');
formevent.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=searchbar.value;
    messageone.textContent='Loading....'
    messagetwo.textContent=''
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                messageone.textContent=data.error;
            }
            else{
                console.log(data.forecast);
                messageone.textContent=data.forecast
                console.log(data.location);
                messagetwo.textContent=data.location
                
            }
        })
    })
})