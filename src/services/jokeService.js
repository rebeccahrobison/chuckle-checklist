export const getJokes = () => {
    return fetch("http://localhost:8088/jokes").then((res) => res.json())
}

export const postNewJoke = (joke) => {
    const newJoke = { "text": joke, "told": false }
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newJoke)
    }

    return fetch("http://localhost:8088/jokes", postOptions)
}

export const editJoke = (joke) => {
    const putOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(joke)
    }

    return fetch(`http://localhost:8088/jokes/${joke.id}`, putOptions)
}

export const deleteJoke = (joke) => {
    return fetch(`http://localhost:8088/jokes/${joke.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}