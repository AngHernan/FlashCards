import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom"
import { createCard, readDeck } from "../utils/api";

export default function AddCard(){
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    const {deckId} = useParams();
    
    async function loadDeck () {
        try {
            const currentDeck = await readDeck(deckId);
            setDeck(currentDeck)
        } catch (error) {
            setDeck({});
        }
    }

    useEffect(() => {
        loadDeck();
    }, [])

    const cancelForm = () => { 
        document.getElementById("front").value = '';
        document.getElementById("back").value = '';
      }
      

    const handleChange = (event) => {
        const {name, value } = event.target;
        setCard({...card, [name]: value})
    }
    const handleSubmit = (event) => {    
            const abortController = new AbortController();
            event.preventDefault();
            async function callAddCard(){
                try {
                    await createCard(deck.id, card, abortController.signal)
                   
                    
                }catch (error) {
                    if (error.name === "AbortError") {
                        console.info("aborted");
                      } else {
                        throw error;
                }
            }
        }
        callAddCard();
        cancelForm();
        return () => {
            abortController.abort();
          };
        }
    return (
            <>
            <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Card </li>
                    </ol> 
                </nav>
                <div className="mb-3">
            <label htmlFor="front" className="form-label">Front</label>
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
            <label htmlFor="back" className="form-label">Back</label>
            <textarea 
                className="form-control" 
                name="back"
                id="back"  
                
                value={card?.back} 
                onChange={handleChange}
                rows="3"></textarea>

            <Link to={`/decks/${deckId}`} type="button" className="buttonSpace btn btn-secondary">Cancel</Link>
            <button type="button" onClick={handleSubmit} className="buttonSpace btn btn-primary">Save</button>
            </div>
            </>
    )
}