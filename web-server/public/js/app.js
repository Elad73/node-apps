console.log('Client side javascript code loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    
    const location = search.value;

    fetch('http://localhost:3000/weather?city=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data.location);
                console.log(data.forcast);
            }
        })
    })
})