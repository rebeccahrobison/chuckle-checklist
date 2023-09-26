import "./App.css"
import stevePic from "./assets/steve.png"
import { useState, useEffect } from "react"
import { deleteJoke, editJoke, getJokes, postNewJoke } from "./services/jokeService"
import { AddJoke } from "./jokes/AddJoke"
import { Jokes } from "./jokes/Jokes"

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
  }, [userJoke])

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
        <AddJoke setUserJoke={setUserJoke} postNewJoke={postNewJoke} setAndFetchJokes={setAndFetchJokes} userJoke={userJoke}/>
      <div className="joke-lists-container">
          <div className="joke-list-container">
            <h2>Told<span className="told-count">{toldJokes.length}</span></h2>
            {toldJokes.map((joke) => {
              return (
                <Jokes 
                  deleteJoke={deleteJoke} 
                  setAndFetchJokes={setAndFetchJokes} 
                  createEditedJoke={createEditedJoke}
                  editJoke={editJoke}
                  joke={joke}
                />
              )
            })}
          </div>
          <div className="joke-list-container">
            <h2>Untold<span className="untold-count">{untoldJokes.length}</span></h2>
            {untoldJokes.map((joke) => {
              return (
                <Jokes 
                  deleteJoke={deleteJoke} 
                  setAndFetchJokes={setAndFetchJokes} 
                  createEditedJoke={createEditedJoke}
                  editJoke={editJoke}
                  joke={joke}
                />
              )
            })}
          </div>
      </div>
    </div>
  )
}