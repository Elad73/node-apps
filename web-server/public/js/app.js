console.log('Client side javascript code loaded');

fetch('http://localhost:3000/weather?city=!').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data.location);
            console.log(data.forcast);
        }
    })
})
