import React,{useEffect, useState} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import { readDeck} from "../utils/api";
import FlashCard from "./FlashCard"

export default function Study(){
    
    const {deckId} = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [cardId, setCardId] = useState(0);

    useEffect(() => {
        setDeck([]);
        const abortController = new AbortController();

        async function loadDeck(){
            try {
                const deckFromApi = await readDeck(deckId);
                setDeck(deckFromApi);
            
            }catch (error) {
            if (error.name === "AbortError") {
            // Ignore `AbortError`
            console.log("Aborted");
            } else {
            throw error;
            }
        }
    }

    loadDeck();

    return () => {
    console.log("abort");
    abortController.abort(); // Cancels any pending request or response
    };
    }, [deckId]);

    function handleNext(){
        if (cardId === deck.cards.length - 1){
            if(window.confirm("Would you like to restart?")){
                setCardId(0)
            } else {
                history.push("/")
            }
        }else{
        setCardId(cardId + 1)
        }
    }

    const notEnough = <div>
                        <h2>Not Enough Cards.</h2>
                        <p>You need at least 3 cards to study.</p> 
                        <Link to={`/decks/${deckId}/cards/new`} type="button" className="buttonSpacing btn btn-primary"><i class="bi bi-plus"></i> Add Card</Link>
                        </div>
    const studyCards = deck?.cards?.length >= 3? <FlashCard deck={deck} cardId={cardId} handleNext={handleNext}/> : notEnough;


return (<>
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">study</li>
        </ol> 
    </nav>
    <div>
        <h2>Study: {deck.name}</h2>
        <div>{studyCards}</div>
    </div>
    </>)
}