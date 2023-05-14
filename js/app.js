const formChanceLocation = document.querySelector('[data-js="change-location"]')
const cityName = document.querySelector('[data-js="city-name"]')
const cityWeather = document.querySelector('[data-js="city-weather"]')
const cityTemperature = document.querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const timeImage = document.querySelector('[data-js="time"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')

const handleFetchWeatherData = async cityName => {
  const [{ LocalizedName, Key }] = await getCityData(cityName)
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await getWeatherData(Key)

  return { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon }
}

const inserTextContentIntoDOM = (element, textContent) => element.textContent = textContent

const insertWeatherIconIntoDOM = (timeIconContainer, weatherIcon) =>
  timeIconContainer.innerHTML = `<img src="../src/icons/${weatherIcon}.svg" />`

formChanceLocation.addEventListener('submit', async ev => {
  ev.preventDefault()

  const inputValue = ev.target.city.value.trim()

  const { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon } = await
    handleFetchWeatherData(inputValue)

  const isHiddenCard = cityCard.classList.contains('d-none')
  const showCard = cityCard.classList.remove('d-none')

  isHiddenCard ? showCard : ''

  IsDayTime
    ? timeImage.src = '../src/day.svg'
    : timeImage.src = '../src/night.svg'

  insertWeatherIconIntoDOM(timeIconContainer, WeatherIcon)
  inserTextContentIntoDOM(cityName, LocalizedName)
  inserTextContentIntoDOM(cityWeather, WeatherText)
  inserTextContentIntoDOM(cityTemperature, Temperature.Metric.Value)

  ev.target.reset()
})
