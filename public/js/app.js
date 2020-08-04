
const form = document.querySelector('form');

const search = document.querySelector('input');

const [error, weather] = document.querySelectorAll('p');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    fetch(`/weather?address=${location}`).then((response) => {
        error.textContent = "Loading...";
        weather.textContent = "";

        response.json().then((data) => {
            if (data.error) {
                error.textContent = data.error;
                weather.textContent = "";
            } else {
                weather.textContent = data.forecast;
                error.textContent = data.location;
            }
        });
    });
});


