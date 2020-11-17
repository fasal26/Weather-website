window.addEventListener('load', () => {
  let lat;
  let long;
  let temperatureDegree = document.querySelector('.temperature-degree');
  let temperatureDescription = document.querySelector('.temperature-description');
  let locationTimezone = document.querySelector('.location-timezone');
  let cloudIcons = document.querySelector('.icons');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;

console.log(position);
      // const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7971beb4f701e45d88abf80bbcf031fc`;

          fetch(api)
          .then((response) => {
              return response.json();
            })
          .then(data => {
            console.log(data);
            const {name} = data;
            const {temp} = data.main;
            const {id, description} = data.weather[0];
            temperatureDegree.textContent = Math.floor(temp-273);
            locationTimezone.textContent = name;
            temperatureDescription.textContent = description;

            if(id < 250){
               cloudIcons.src = "./images/thunderstorm.svg";
            }else if (id < 350) {
              cloudIcons.src = "./images/cloudy.svg";
            }else if (id < 550) {
              cloudIcons.src = "./images/rain.svg";
            }else if (id < 650) {
              cloudIcons.src = "./images/snow.svg";
            }else if (id < 800) {
              cloudIcons.src = "./images/foggy.svg";
            }else if (id === 800 || id > 800){
              cloudIcons.src = "./images/cloud-clear.svg";
            }
          })
    });

}
})
