const Country = ({country, weather}) => {
    if (country === null || weather === null) {
        return null
    }
    return(
        <>
        <h1>{country.name.common}</h1>
        <p>
            Capital: {country.capital} <br/>
            Area: {country.area} <br/><br/>
            Languages:
        </p>
        <ul>
            {Object.values(country.languages).map((lang,index) =>
                <li key={index}>{lang}</li>
            )}
        </ul>
        <img src = {country.flags.png}></img>
        <h2>{weather.weather[0].main}</h2>
        <p>Temperature: {(weather.main.temp -273).toFixed(2)} C</p>
        </>
    )
}
export default Country

