import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({search, handleSearchChange}) => {
  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange}/>
    </div>
  )
}

const CountryList = ({countriesToShow, searchChange}) => {
  if (countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map(country => <li key={country}>{country} <form onSubmit={searchChange}><input type='hidden' value={country}></input><button type='submit'>view</button></form></li>)}
      </div>
    )
  }
  if (countriesToShow.length === 0) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
}

const Country = ({matches}) => {
  if (matches.length === 1) {
    const country = matches[0]
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h4>languages:</h4>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        <br></br>
        <img src={country.flags['png']} alt='flag'></img>
      </div>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const searchChange = (event) => {
    event.preventDefault()
    setSearch(event.target[0].value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const matches = countries.filter(
    country => country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  const countriesToShow = (matches.length < 11)
    ? matches.map(country => country.name.common)
    : []

  return (
    <div>
      <Filter search={search} handleSearchChange={handleSearchChange}/>
      <CountryList countriesToShow={countriesToShow} searchChange={searchChange} />
      <Country matches={matches} />
    </div>
  )
}

export default App;
