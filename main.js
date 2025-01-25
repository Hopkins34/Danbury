function adjustMainHeight() {

  const header = document.querySelector('.Header');
  const hero = document.querySelector('.Hero');
  const footer = document.querySelector('.Footer');
  const content = document.querySelector('.Content')

  const headerHeight = header.offsetHeight;
  const footerHeight = footer.offsetHeight;

  content.style.height = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;

}

window.addEventListener('load', adjustMainHeight);
window.addEventListener('resize', adjustMainHeight);



const API_KEY = 'e2308f5229f24692928155828252401';
const LOCATION = 'Lakeside-Marblehead, OH, USA';
const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(LOCATION)}&aqi=no`;

async function getWeather() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Weather data not available.');
    const data = await response.json();

    document.querySelector('.Weather').innerHTML = `
      <div class="Weather">
        <ul class="Weather__ul">
          <li class="Weather__li">Temperature: ${data.current.temp_f}°F (${data.current.temp_c}°C)</li>
          <li class="Weather__li">Condition: ${data.current.condition.text}</li>
          <li class="Weather__li">Wind: ${data.current.wind_mph} mph (${data.current.wind_kph} kph${data.current.wind_dir}</li>
          <li class="Weather__li">Humidity: ${data.current.humidity}%</li>
          <li class="Weather__li">UV Index: ${data.current.uv}</li>
          <li class="Weather__li">Visibility: ${data.current.vis_miles} miles (${data.current.vis_km} km)</li>
        </ul>
      </div>
    `;
  } catch (error) {
    document.querySelector('.Weather').textContent = error.message;
  }
}

getWeather();
