import React, {useState} from "react"

export default function FlashCard ({deck, cardId, handleNext}){
    const [front, setFront] = useState(true)
    const {cards} = deck;
    
    

    function handleFlip(){
        front === true? setFront(false): setFront(true);
    }

     const nextButton =<button type="button" onClick={() => {setFront(true); handleNext()}} class="btn btn-primary">Next</button>;
                    
    const view = front? <p class="card-text">{cards[cardId].front}</p> : <p class="card-text">{cards[cardId].back}</p>
    return (<>
            <div className="card">
            <div className="card-body">
            <h5 className="card-title">Card {cardId + 1 } of {deck.cards.length}</h5>
                {view}
                <div>
                <button type="button" onClick={handleFlip} className="studyButtons btn btn-secondary">Flip</button>
                {!front? nextButton: null}
            </div>
            </div>
            </div>
            </>)
}