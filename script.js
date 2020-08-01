//api connection information
let api = {
    key: '&appid=9f4d4fab1c6ea5975b142626ba7055fa',
    urlstart: 'https://api.openweathermap.org/data/2.5/weather?q=',
    units: '&units=metric',
    location: ''
}

//page initialisation
let timer = window.setInterval(displayTime, 1000);
window.onload(displayDate());
let refresh = window.setInterval(displayWeather, 1000);


async function displayWeather() 
{
    api.location = document.getElementById('searchPlace').value;
    let mainList = ['Clouds', 'Clear', 'Mist', 'Fog', 'Snow', 'Rain', 'Drizzle', 'Thunderstorm'];

    let result = await fetch(api.urlstart + api.location + api.units + api.key);
    
    let data = await result.json();

    //icon selection to match weather description
    if (data.weather[0].main == mainList[0] && data.weather[0].description == 'overcast clouds' || data.weather[0].description == 'broken clouds') 
    {
        icon = 'icons/cloudy.png';
    }
    else if (data.weather[0].main == mainList[0] && data.weather[0].description == 'few clouds' || data.weather[0].description == 'scattered clouds') 
    {
        icon = 'icons/partlycloudy.png';
    }
    else if (data.weather[0].main == mainList[1]) 
    {
        icon = 'icons/sunny.png';
    }
    else if (data.weather[0].main == mainList[2] || data.weather[0].main == mainList[3]) 
    {
        icon = 'icons/foggy.png';
    }
    else if (data.weather[0].main == mainList[4]) 
    {
        icon = 'icons/snow.png';
    }
    else if (data.weather[0].main == mainList[5] || data.weather[0].main == mainList[6]) 
    {
        icon = 'icons/rain.png';
    }
    else if (data.weather[0].main == mainList[7]) 
    {
        icon = 'icons/storm.png';
    }
    if (data.wind.speed >= 13.9) 
    {
        icon = 'icons/windy.png';
    }
    if (data.weather[0].main == mainList[2] && window.h >= 20) 
    {
        icon = 'icons/night.png';
    }

    //setting weather values to display on page
    document.getElementById('display-location').innerHTML = data.name + ', ' + data.sys.country;
    document.getElementById('display-temp').innerHTML = data.main.temp + '°C';
    document.getElementById('display-description').innerHTML = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1).toLowerCase()
    document.getElementById('display-icon').src = icon;
}


function displayTime()
{
    let d = new Date();
    window.h = d.getHours();
    let m = d.getMinutes();
    let suffix = '';
    if (window.h >=12) 
    {
        suffix = ' PM';
    }
    else
    {
        suffix = ' AM'
    }
    if (m < 10)
    {
        m = '0' + m;
    }
    document.getElementById('display-time').innerHTML = window.h + ":" + m + suffix;
}

function displayDate() 
{
   let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
    "October", "November", "December"];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let today = new Date();
    let day = today.getDay();
    let date = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    document.getElementById('display-date').innerHTML = days[day] + ' ' + date + ' ' + months[month] + ' ' + year;
}

