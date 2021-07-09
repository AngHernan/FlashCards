import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory} from "react-router-dom";
import { readDeck,  deleteDeck, deleteCard} from "../utils/api";
import NotFound from "./NotFound";
import CardInfo from "./CardInfo";


export default function Deck(){
    const[deck, setDeck] = useState({});
    const[cards, setCards] = useState([]);
    const {deckId} = useParams();
    const history = useHistory();

    async function loadDeck(){
        try {
            const currentDeck = await readDeck(deckId)
            setDeck(currentDeck);
            setCards(currentDeck.cards)
        } catch (error) {
            setDeck({});
        }
    }    

useEffect(() => {

    loadDeck()
    }, []);

    async function cardDeletionHandler(cardId){
        if(window.confirm("Delete this card? \n\n You will not be able to recover it."))  {
        await deleteCard(cardId)
        loadDeck();
    }
}

    async function handleDeleteDeck(deckid){
        if(window.confirm("Delete this deck? \n\n You will not be able to recover it."))
            {
                await deleteDeck(deckid);
                history.push("/");
              }
    }

const cardView = cards.map((card) => CardInfo({...card, cardDeletionHandler}));

if(deck==={}) {return <NotFound/> }
else{ 
return (<>
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
        </ol> 
    </nav>
    <div>
        <h5>{deck.name}</h5>
        <p>{deck.description}</p>
        <div className="buttons">
        <Link to={`/decks/${deckId}/edit`} type="button" className="buttonSpacing buttonSpacing-1 btn btn-secondary"><i class="bi bi-pencil"></i>  Edit</Link>
        <Link  to={`/decks/${deckId}/study`} className="btn btn-primary space"><i className="bi bi-journal-bookmark-fill"></i>    Study</Link> 
        <Link to={`/decks/${deckId}/cards/new`} type="button" className="buttonSpacing btn btn-primary"><i class="bi bi-plus"></i> Add Card</Link>
        <button type="button" className="btn btn-danger right" onClick={() => handleDeleteDeck(deck.id)} ><i className='bi bi-trash'></i></button>
    </div>
    <div><h1 className="cardTitle">Cards</h1></div>
       <div class="container">{cardView}</div> 
    </div>
    </>)
    }
}