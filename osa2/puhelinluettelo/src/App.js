import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const Filter = ({search, handleSearchChange}) => {
  return (
    <div>
      filter shown with <input value={search} onChange={handleSearchChange}/>
    </div>
  )
}

const PersonForm = ({addName, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({personsToShow, deleteName}) => {
  return (
    <div>
      {personsToShow.map(person => <li key={person.name}>{person.name} {person.number} <form onSubmit={deleteName}><input type='hidden' value={person.id}></input><input type='hidden' value={person.name}></input><button type='submit'>delete</button></form></li>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      setNewName('')
      setNewNumber('')
      return (
        alert(`${newName} is already added to phonebook`)
      )
    }
    const personObject = {name: newName, number: newNumber}
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(
          `Added ${response.name}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 4000)
      })
      .catch(error => {
        setNotificationMessage(
          `${error}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 4000)
      })
  }

  const deleteName = (event) => {
    event.preventDefault()
    const index = persons.indexOf(event.target[0].value)
    if (window.confirm(`Delete ${event.target[1].value}?`)) {
      personService
        .deletePerson(event.target[0].value)
        .then(response => {
          const newPersons = [...persons]
          newPersons.splice(index, 1)
          setPersons(newPersons)
          setNotificationMessage(
            `Deleted ${event.target[1].value}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 4000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const personsToShow = (search === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter search={search} handleSearchChange={handleSearchChange}/>
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deleteName={deleteName}/>
    </div>
  )
}

export default App