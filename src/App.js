import { useState, useEffect} from "react"

const App = () => {
  const [ message, setMessage] = useState(null)
  const [ value, setValue] = useState('')
  const [ previousChats, setPreviousChats] = useState([])
  const [ currentTitle, setCurrentTitle] = useState(null)

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
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
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json()
      console.log(data)
      setMessage(data.choices[0].message)
    } catch (error) {
      console.error(error)
    }
  }

    //====================================================================
  useEffect(() => {
    console.log(currentTitle, value, message)
    if (!currentTitle && value && message) {
      setCurrentTitle(value)
    }
    if (currentTitle && value && message){
      setPreviousChats(prevChats => (
        [...prevChats,
          {
              title: currentTitle,
              role: "user",
              content: value
          },
          {
            title: currentTitle,
            role: message.role,
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
  const uniqueTitles = Array.from(new Set(previousChats.map((previousChat) => previousChat.title)))
  console.log(uniqueTitles)

  return (
    <div className="App">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}></li>)}
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
            Stolen text from website...
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;


//start at 115 for project 2