import { useState, useEffect } from 'react'
import {getAll, addContact} from './Communication'
import Form from './Form'
import './index.css'

const App = () => {
  const [phonebook, setPhonebook] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber,setNewNumber] = useState("")

  const trackName = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }
  const trackNumber = (event) =>{
    setNewNumber(event.target.value)
    console.log(newNumber)
  }
  const addcontact = () =>{
    const lmao = {
      name : newName,
      number: newNumber
    }
    addContact(lmao).then(response=>{
      console.log("BRUH" + response)
    })
  }

  useEffect(
    () => {
      getAll().then(response =>
      {
      setPhonebook(response)
    })
    }, []
  )

  return(
      <> 
      <Form trackName={trackName} trackNumber={trackNumber} addContact={addcontact}/>
      <ul>
        {phonebook.map(phone => {
          return(
            <li key = {phone.id}>{phone.name} : {phone.number}</li>
          )
        }
        )}
      </ul>
    </>
    )
}

export default App