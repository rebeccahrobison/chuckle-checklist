import "./App.css"
import stevePic from "./assets/steve.png"
import { useState, useEffect } from "react"
import { deleteJoke, editJoke, getJokes, postNewJoke } from "./services/jokeService"

export const App = () => {
  const [userJoke, setUserJoke] = useState([])
  const [allJokes, setAllJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])

  const setAndFetchJokes = async() => {
    try {
      const jokeArr = await getJokes()
      setAllJokes(jokeArr)
    } catch (error) {
      console.error("Error fetching jokes:", error)
    }
  }

  useEffect (() => {
    if(userJoke) {
      setUserJoke(userJoke)
    }
  }, [])

  useEffect (() => {
    getJokes().then((jokesArray) => {
      setAllJokes(jokesArray)
    })
  }, [])

  useEffect (() => {
    if(toldJokes) {
      const toldJokesList = allJokes.filter(joke => joke.told === true)
      setToldJokes(toldJokesList)
    }
    
  }, [allJokes])

  useEffect (() => {
    if(untoldJokes) {
      const untoldJokesList = allJokes.filter(joke => joke.told === false)
      setUntoldJokes(untoldJokesList)
    }
   
  }, [allJokes])

  const createEditedJoke = (joke) => {
    if (joke.told === false) {
      joke.told = true
    } else if (joke.told === true) {
      joke.told = false
    }
    return joke
  }


  return (
    <div className="app-container">
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
      </div>
      <div className="joke-add-form">
        <input 
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={userJoke}
          onChange={(event) => {
            setUserJoke(event.target.value)
          }}
        />
        <button 
          className="joke-input-submit"
          onClick={() => {
            postNewJoke(userJoke)
            setUserJoke("")
            setAndFetchJokes()
          }}>
            Submit Joke
        </button>
      </div>
      <div className="joke-lists-container">
          <div className="joke-list-container">
            <h2>Told<span className="told-count">{toldJokes.length}</span></h2>
            {toldJokes.map((joke) => {
              return (
                <li className="joke-list-item" key={joke.id}>
                  <p className="joke-list-item-text">{joke.text}</p>
                  <div className="joke-list-action-toggle">
                    <button
                      className="joke-list-action-delete"
                      onClick={() => {
                        deleteJoke(joke)
                        setAndFetchJokes()
                      }}><i style={{fontSize: "18px"}}>&#128465;</i>
                    </button>
                    <button 
                      className="joke-list-action-toggle"
                      onClick={() => {
                        createEditedJoke(joke)
                        editJoke(joke)
                        setAndFetchJokes()
                      }}><i style={{fontSize: "16px"}}>&#128529;</i>
                    </button>
                  </div>
                </li>
              )
            })}
          </div>
          <div className="joke-list-container">
            <h2>Untold<span className="untold-count">{untoldJokes.length}</span></h2>
            {untoldJokes.map((joke) => {
              return (
                <li className="joke-list-item" key={joke.id}>
                  <p className="joke-list-item-text">{joke.text}</p>
                  <div className="joke-list-action-toggle">
                    <button
                      className="joke-list-action-delete"
                      onClick={() => {
                        deleteJoke(joke)
                        setAndFetchJokes()
                      }}><i style={{fontSize: "18px"}}>&#128465;</i>
                    </button>
                    <button
                      className="joke-list-action-toggle"
                      onClick={() => {
                        createEditedJoke(joke)
                        editJoke(joke)
                        setAndFetchJokes()
                      }}><i style={{fontSize: "16px"}}>&#128516;</i>
                    </button>
                  </div>
                </li>
              )
            })}
          </div>
      </div>
    </div>
  )

}


// "id": 1,
// "text": "I went to buy some camo pants but couldn’t find any.",
// "told": false

{/* <button><i className="fa-regular fa-face-meh" /></button> */}