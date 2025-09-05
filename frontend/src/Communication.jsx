import axios from "axios"

const baseUrl = "/api/phonebook"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => 
        response.data
    )
}

const addContact = newObject =>{
const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

export {getAll,addContact}
