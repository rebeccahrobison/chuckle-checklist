export const Jokes = ({ deleteJoke, setAndFetchJokes, createEditedJoke, editJoke, joke }) => {
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
}