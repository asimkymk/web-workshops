const searchProfile = document.querySelector('#searchProfile');

searchProfile.addEventListener("keyup",(event)=>{
    let text = event.target.value;
    if(text!== ''){
        console.log(text);
    }
})