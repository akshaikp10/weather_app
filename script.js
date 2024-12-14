const weatherinfo = document.querySelector(".inputbox");
const cityinfo = document.querySelector(".cityinput");
const card = document.querySelector(".box");

const apikey ="c4fc6952fe7e57ed74ad40170656a99d";

weatherinfo.addEventListener("submit", async event =>{

    event.preventDefault(); // to prevent the refresh of the page

    const city = cityinfo.value;
    if(city){

        try{
            const weathdata = await getweather(city);
            display(weathdata);

        }
        catch(error){
            console.error(error);
            diserror(error);

        }

    }
    else{

        diserror("Enter a city name")
    }

})

async function getweather(city) {

    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const res= await fetch(apiurl);
    
     
    if(!res.ok){
        throw new Error("Could not fetch weather data")
    }
    
    return await res.json();
    
}

function display(data){
       
    console.log(data);

       const {name:city,
              main:{temp,humidity,feels_like},
              weather:[{description,id}],
              wind:{speed},
              sys:{ sunrise,sunset
              }
             } = data;
        srt= time(sunrise)
        sst= time1(sunset)
        card.textContent="";
        card.style.display="flex";
        
        
        const citydis = document.createElement("h1");
        const temdis = document.createElement("p");
        const humdis = document.createElement("p");
        const disdis = document.createElement("p");
        const emdis = document.createElement("p");
        const realte = document.createElement("p");
        const win = document.createElement("p");
        const sunr = document.createElement("p");
        const suns = document.createElement("p");

        citydis.textContent=city;
        citydis.classList.add("cityname");
        card.appendChild(citydis);

        temdis.textContent=`${(temp-273.15).toFixed(1)}°C`;
        temdis.classList.add("tem");
        card.appendChild(temdis);

        realte.textContent=`RealFeel ${(feels_like-273.15).toFixed(1)}°C`;
        realte.classList.add("realtem");
        card.appendChild(realte);

        emdis.textContent= getemoji(id)
        emdis.classList.add("emoji");
        card.appendChild(emdis);

        disdis.textContent = description;
        disdis.classList.add("dis");
        card.appendChild(disdis);
       
        humdis.textContent=`Humidity: ${humidity}%`;
        humdis.classList.add("humidity");
        card.appendChild(humdis);

        win.textContent=`Windspeep: ${speed}m/s`;
        win.classList.add("wind");
        card.appendChild(win);

        sunr.textContent=`Sunrise: ${srt} (GTM)`;
        sunr.classList.add("sunrise");
        card.appendChild(sunr);

        suns.textContent=`Sunset: ${sst} (GTM)`;
        suns.classList.add("sunset");
        card.appendChild(suns);

        

        
}
function getemoji(em){


    switch(true){
        case(em >=200 && em<=300):
             return "⛈️";
            
        case(em >=300 && em<=400):
             return "🌦️";
               
        case(em >=500 && em<=600):
             return "🌧️";
            
        case(em >=600 && em<=700):
             return "❄️";
            
        case(em >=700 && em<=800):
             return "🌨️";
             
        case(em == 800):
             return "☀️";
             
        case(em >=801 && em<=8010):
             return "☁️";
             
        default:
            return "?";                               
    }                                
    }
    
function time(ti1){

   // The Unix timestamp
const timestamp = ti1;

// Create a Date object using the timestamp
const date = new Date(timestamp * 1000);

// Convert the time to GMT
const gmtHours = date.getUTCHours();
const gmtMinutes = date.getUTCMinutes();

// Convert to 12-hour format and determine AM/PM
let hours = gmtHours % 12;
hours = hours ? hours : 12; // The hour '0' should be '12'
const minutes = gmtMinutes.toString().padStart(2, '0');
const ampm = gmtHours >= 12 ? 'PM' : 'AM';

// Format the time in "HH:MM AM/PM"
const gmtTime = `${hours}:${minutes} ${ampm}`;

return gmtTime


}
      
function time1(ti2){

    // The Unix timestamp
 const timestamp = ti2;
 
 // Create a Date object using the timestamp
 const date = new Date(timestamp * 1000);
 
 // Convert the time to GMT
 const gmtHours = date.getUTCHours();
 const gmtMinutes = date.getUTCMinutes();
 
 // Convert to 12-hour format and determine AM/PM
 let hours = gmtHours % 12;
 hours = hours ? hours : 12; // The hour '0' should be '12'
 const minutes = gmtMinutes.toString().padStart(2, '0');
 const ampm = gmtHours >= 12 ? 'PM' : 'AM';
 
 // Format the time in "HH:MM AM/PM"
 const gmtTime = `${hours}:${minutes} ${ampm}`;
 
 return gmtTime
 
 
 }     

function diserror(message){
       
    const errmsg = document.createElement("p")
    errmsg.textContent=message
    errmsg.classList.add("cityname");

    card.textContent=""
    card.style.display="flex";
    card.appendChild(errmsg)


}