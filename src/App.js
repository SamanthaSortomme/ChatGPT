import { useState, useEffect} from "react"

const App = () => {
  const [ value, setValue] = useState(null)
  const [ message, setMessage] = useState(null)
  const [ previousChats, setPreviousChats] = useState([])
  const [ currentTitle, setCurrentTitle] = useState([null])

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

  const handleClick = (uniqueTitles) => {
    setCurrentTitle(uniqueTitles)
  }

      const getMessages = async () => {
        const options = {
          method: "POST",
          body : JSON.stringify({
                message: value
                // message: "Hello how are you?"
        }),
        headers: {
          "content-Type": "application/json"
        }
      }
        try {
          const response = await fetch('https://localhost:8000/completions', options)
          const data = await response.json()
          console.log(data)
          setMessage(data.choices[0].message)
        } catch (error) {
          console.error(error)
        }
    }

    useEffect(() => {
      console.log(currentTitle, value, message)
      if (!currentTitle && value && message) {
        setCurrentTitle(value)
      }
      if (currentTitle && value && message){
        setPreviousChats(previousChats => (
          [...prevChats,
            {
                title: currentTitle,
                role: "user",
                content: value
            },
            {
              title: currentTitle,
              role: message.rol,
              content: message.content
            }
          ]
        ))
      }
    }, [message, currentTitle])
    // console.log(message)
    // console.log(value)
    console.log(previousChats)
    const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
    const uniqueTitles = array.from(new set(previousChats.map(previousChat => previousChat.title)))
    console.log(uniqueTitles)

  return (
    <div className="App">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitles, index) => <li key={index} onClick={() => handleClick}>{uniqueTitles}</li>)}
        </ul>
        <nav>
          <p> The Real Book Club</p>
        </nav>
         </section>
      <section className="main">
        {!!currentTitle && <h1>T.R.B.C. GPT</h1>}
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => <li key ={index}>
            <p className="role">{chatMessage.role}</p>
            <p>{chatMessage.content}</p>
          </li>)}

        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <div id="submit" onClick={getMessages}>➢</div>
          </div>
          <p className="info">
            Stolen text from website, I did not copy it
            help us improve
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;


//start at 115 for project 2