const weatherForm  = document.querySelector('#weatherForm');
const search       = document.querySelector('input');
const messageOne   = document.querySelector('#message-1');
const messageTwo   = document.querySelector('#message-2');
const forecastImg  = document.querySelector('#forecastImg');

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    
    messageOne.textContent    = 'Loading...';
    messageTwo.textContent    = '';
    forecastImg.src           = '';
    forecastImg.style.display = 'none';

 
    const location = search.value;

    fetch('/weather?city=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;                
            } else {
                messageOne.textContent = data.location;
                
                messageTwo.textContent += 'Localtime: ' + data.forcast.localtime + '; ';
                messageTwo.textContent += 'Temperature: ' + data.forcast.temperature + '; ';
                messageTwo.textContent += 'Weather: ' + data.forcast.desc + '; ';
                messageTwo.textContent += 'humidity: ' + data.forcast.humidity+ '; ';
                messageTwo.textContent += 'Feels like: ' + data.forcast.feelslike;

                forecastImg.style.display = 'block';
                forecastImg.src = data.forcast.weather_icon;
            }
        })
    })
})