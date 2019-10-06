window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let temperatureSection = document.querySelector('.temperature')
    const temepratureSpan = document.querySelector('.temperature span');


    if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(position =>{
             long = position.coords.longitude;
             lat = position.coords.latitude;

             const proxy = "https://cors-anywhere.herokuapp.com/"
             const api = `${proxy}https://api.darksky.net/forecast/2fafefd622c967222bad7458da44b9ca/${lat},${long}`;
             fetch(api)
             .then(data =>{
                 return data.json();
             })
             .then(data =>{
                 const { temperature, summary, icon } = data.currently;
                 //Set DOM elements from the API
                 temperatureDegree.textContent = temperature;
                 temperatureDescription.textContent = summary;
                 locationTimezone.textContent = data.timezone

                 //Formula for Celcius
                 let celcius = (temperature - 32) * (5 / 9);
                        //set icon
                    setIcons(icon, document.querySelector(".icon"))

                //Degree changed
                temperatureSection.addEventListener('click', ()=>{
                    if(temepratureSpan.textContent === 'F'){
                        temepratureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celcius);
                    }else {
                        temepratureSpan.textContent = "F"
                        temperatureDegree.textContent = temperature;
                    }
                })
             });    
         });

        
    }

 function setIcons(icon, iconID){
     const skycons = new Skycons({color: "white"});
     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
     skycons.play();
     return skycons.set(iconID, Skycons[currentIcon]);
 }    
});