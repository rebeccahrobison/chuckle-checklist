export const AddJoke = ({ userJoke, setUserJoke, postNewJoke, setAndFetchJokes  }) => {
    return (
        <div className="joke-add-form">
            <input 
            className="joke-input"
            type="text"
            placeholder="New One Liner"
            value={userJoke}
            onChange={(event) => {
                setUserJoke(event.target.value)
                console.log(userJoke)
            }}
            />
            <button 
                className="joke-input-submit"
                onClick={() => {
                    postNewJoke(userJoke)
                    console.log(userJoke)
                    setUserJoke("")
                    setAndFetchJokes()
                }}>
                Submit Joke
            </button>
        </div>
    )
}

