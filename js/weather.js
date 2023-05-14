const apiKey = 'VuEzaTzNISy125Dv2RS3cd9wdzWsrvtu'
const baseUrl = 'http://dataservice.accuweather.com/'

const getCityUrl = cityName => `${baseUrl}locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`

const getWeatherUrl = cityKey => `${baseUrl}currentconditions/v1/${cityKey}?apikey=${apiKey}&language=pt`

const fetchData = async url => {
  try {
    const response = await fetch(url)
  
    if (!response.ok) {
      throw new Error('Não foi possível obter os dados')
    }
  
    return response.json()
  } catch ({ name, message }) {
    alert(`${name}: ${message}`)
  }
}

const getCityData = cityName => {
  const cityUrl = getCityUrl(cityName)
  return fetchData(cityUrl)
}

const getWeatherData = async cityKey => {
  const weatherUrl = getWeatherUrl(cityKey)
  return fetchData(weatherUrl)
}