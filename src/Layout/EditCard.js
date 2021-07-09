import React, { useState, useEffect } from "react";
import {Link, useHistory, useParams} from "react-router-dom"
import { updateCard, readDeck, readCard } from "../utils/api/index";

export default function EditDeck(){
    const {deckId, cardId} = useParams();
    
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
 
    async function loadDeck(){
        try {
            const currentDeck = await readDeck(deckId)
            setDeck(currentDeck);
        } catch (error) {
            setDeck({});
        }
    }    

    async function loadCard(){
        try {
            const currentCard = await readCard(cardId)
            setCard(currentCard);
        } catch (error) {
            setCard({});
        }
    }   

    useEffect(() => {

    loadDeck()
    loadCard()
    }, []);

    const handleChange = (event) => {
    const { name, value } = event.target;
    setCard({...card, [name]: value})
   }

   const handleSubmit = (event) => {
    const abortController = new AbortController();
    event.preventDefault();
    async function callEditCard() {
        try {
          await updateCard(card, abortController.signal);
          history.push(`/decks/${deck.id}`);
        } catch (err) {
          if (err.name === "AbortError") {
            console.info("aborted");
          } else {
            throw err;
          }
        }
      }
      callEditCard();
  
      return () => {
        abortController.abort();
      };
    }
   

    return (<>
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>Deck: {deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
        </ol> 
    </nav>
    <div className="mb-3">
  <label for="front" className="form-label">Front</label>
  <textarea
    type="text" 
    className="form-control" 
    name="front"
    id="front" 
    
    value={card?.front}
    onChange={handleChange}
    rows="2">
    </textarea>
</div>
<div class="mb-3">
  <label for="back" className="form-label">Back</label>
  <textarea 
    className="form-control" 
    name="back"
    id="back"  
    
    value={card?.back} 
    onChange={handleChange}
    rows="3"></textarea>

  <Link to={`/decks/${deckId}`} type="button" className="buttonSpace btn btn-secondary">Cancel</Link>
  <button type="button" onClick={handleSubmit} className="buttonSpace btn btn-primary">Submit</button>
</div>
    </>)
}
