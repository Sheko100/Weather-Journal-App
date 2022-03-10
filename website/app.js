
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=8e25534c4965a13b8db29f4e921530ea";
// global variables 
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generateData);
/* Function called by event listener */
function generateData() {
  
  const zip = document.getElementById("zip").value;
 const feeling = document.getElementById("feelings").value;
  //const feeling = "happy";

 if( zip != "" && feeling != "" ) {
  
  getWeather(zip)   
  .then(function(data) {
    
     postData("/all", {temperature: data.temp, date: newDate, feeling: feeling});
  
    }).then(function() {
    printData();
  });
} else {
    window.alert("please, fill all fields");
} 
  }
/* Function to GET Web API Data*/

const getWeather = async (zipCode) => {
    const baseURL = "https://api.openweathermap.org/geo/1.0/zip?zip=";
    const zip = `${zipCode},US`;
    const res =  await fetch(baseURL+zip+apiKey);
  
    try {
      const geoData = await res.json();
      //const coordinates = {lat:geoData.lat, lon:geoData.lon};
      const weatherData = async (getLat, getLon) => {
             const baseURL = "https://api.openweathermap.org/data/2.5/onecall?";
    const lat = `lat=${getLat}`;
    const lon = `&lon=${getLon}`;
    const exclude = "&exclude=minutely,hourly,daily";
    const response = await fetch(baseURL+lat+lon+exclude+apiKey);        
        try {
        const data = await response.json();
        if(data.current) {
          return data.current;
        } else {
          window.alert("please, enter valid US ZIP code");
        }
                } catch(error) {
  console.log(error);
                }
    };
      return weatherData(geoData.lat, geoData.lon);
    } catch(error) {
      console.log(error);
    }

    
   }

/* Function to POST data */
const postData = async (url, data) => {
  const res = await fetch(url, {
   method: "POST",
    credntials: "same-origin",
    headers: {
    "content-type": "application/json"
    },
    body: JSON.stringify(data)
  });

try {
    const newData = await res.json();
    return newData;
  } catch(err) {
    console.log("error: ", err);
  }
}

 /*Function to GET Project Data*/ 
const printData = async () => {
console.log("hii");
  const response = await fetch("/all");
  
try {
  const projectData = await response.json();
  console.log(projectData);

 document.getElementById("temp").innerHTML = projectData.temperature;
  document.getElementById("date").innerHTML = projectData.date;
  document.getElementById("content").innerHTML = projectData.feeling;
} catch (error) {
  console.log(error);
}
}

  //getWeather(35.3273, 28.336);
//generateData(85001);
//postData("/forecast", {greeting:"hi"});

