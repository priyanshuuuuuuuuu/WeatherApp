console.log("This is the JavaScript");

const container = document.querySelector('.container');
const search = document.querySelector('.searchBox button');
const weatherBox = document.querySelector('.weather_box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not_found');
const cityHide = document.querySelector('.city_hide');

search.addEventListener('click', () => {
    const APIKey = 'fabebf2402c5cd7786f81a4e8029df1b';
    const city = document.querySelector('.searchBox input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                error404.classList.add('active');
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                return;
            }

            const image = document.querySelector('.weather_box img');
            const temperature = document.querySelector('.weather_box .temprature');
            const description = document.querySelector('.weather_box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent !== city) {
                cityHide.textContent = city;

                container.style.height = '575px';
                error404.classList.remove('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');

                // Adjust this timing if needed
                setTimeout(() => {
                    container.classList.add('active');
                }, 1000); // Reduce to 1000ms or less

                const weatherCondition = json.weather[0].main;
                console.log('Weather Condition:', weatherCondition);

                switch (weatherCondition) {
                    case 'Clear':
                        image.src = 'images/clear.png';
                        document.body.style.backgroundImage = "url('images/sun.png')";
                        console.log("background image changed");
                        break;
                    case 'Rain':
                        image.src = 'images/rain.png';
                        document.body.style.backgroundImage = "url('images/rainy.jpg')";
                        console.log("background image changed");
                        break;
                    case 'Clouds':
                        image.src = 'images/clouds.png';
                        document.body.style.backgroundImage = "url('images/cloudy.jpg')";
                        break;
                    case 'Thunderstorm':
                        image.src = 'images/storm.png';
                        document.body.style.backgroundImage ="url('images/thunder.jpg')";
                        break;
                    case 'Snow':
                        image.src = 'images/snow.png';
                        document.body.style.backgroundImage = "url('images/snow.jpg')";
                        break;
                    
                    case 'Haze':
                        document.body.style.backgroundImage = "url('images/haze.jpg')";
                        break;

                    case 'Mist':
                        document.body.style.backgroundImage = "url('images/mist.jpg')";
                        break;
                    default:
                        image.src = 'images/clear.png';
                        break;
                }

                temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
                description.innerHTML = json.weather[0].description;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${Math.round(json.wind.speed)} km/h`;

                weatherBox.style.display = '';
                weatherDetails.style.display = '';

                const infoWeather = document.querySelector('.info-weather');
                const infoHumidity = document.querySelector('.info-humidity');
                const infoWind = document.querySelector('.info-wind');

                const elCloneInfoWeather = infoWeather.cloneNode(true);
                const elCloneInfoHumidity = infoHumidity.cloneNode(true);
                const elCloneInfoWind = infoWind.cloneNode(true);

                elCloneInfoWeather.id = 'clone-info-weather';
                elCloneInfoWeather.classList.add('active-clone');

                elCloneInfoHumidity.id = 'clone-info-humidity';
                elCloneInfoHumidity.classList.add('active-clone');

                elCloneInfoWind.id = 'clone-info-wind';
                elCloneInfoWind.classList.add('active-clone');

                setTimeout(() => {
                    infoWeather.insertAdjacentElement('afterend', elCloneInfoWeather);
                    infoHumidity.insertAdjacentElement('afterend', elCloneInfoHumidity);
                    infoWind.insertAdjacentElement('afterend', elCloneInfoWind);
                }, 500); // Reduce to 500ms or less

                setTimeout(() => {
                    document.querySelectorAll('.active-clone').forEach(el => el.remove());
                }, 1500); // Reduce to 1500ms or less
            }
        });

        

        
});


