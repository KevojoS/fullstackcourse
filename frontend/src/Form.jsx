const Form = ({trackName,trackNumber,addContact}) => {
  return (
      <div>
        name: <input onChange={trackName} />
        number: <input onChange = {trackNumber}/>
        <button onClick={addContact}>add contact</button>
      </div>
  )
}

export default Form
