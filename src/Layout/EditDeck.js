import React, { useState, useEffect } from "react";
import {Link, useHistory, useParams} from "react-router-dom"
import { updateDeck, readDeck } from "../utils/api/index";

export default function EditDeck(){
    const {deckId} = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
 
    async function loadDeck(){
        try {
            const currentDeck = await readDeck(deckId)
            setDeck(currentDeck);
        } catch (error) {
            setDeck({});
        }
    }    

    useEffect(() => {

    loadDeck()
    }, []);

    const handleChange = (event) => {
    const { name, value } = event.target;
    setDeck({...deck, [name]: value})
   }

   const handleSubmit = (event) => {
    const abortController = new AbortController();
    event.preventDefault();
    async function callEditDeck() {
        try {
          await updateDeck(deck, abortController.signal);
          history.push(`/decks/${deck.id}`);
        } catch (err) {
          if (err.name === "AbortError") {
            console.info("aborted");
          } else {
            throw err;
          }
        }
      }
      callEditDeck();
  
      return () => {
        abortController.abort();
      };
    }
   

    return (<>
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol> 
    </nav>
    <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Name</label>
  <input 
    type="text" 
    className="form-control" 
    name="name"
    id="name" 
    
    value={deck?.name}
    onChange={handleChange}/>
</div>
<div class="mb-3">
  <label for="exampleFormControlTextarea1" className="form-label">Description</label>
  <textarea 
    className="form-control" 
    name="description"
    id="description"  
    
    value={deck?.description} 
    onChange={handleChange}
    rows="3"></textarea>

  <Link to={`/decks/${deckId}`} type="button" className="buttonSpace btn btn-secondary">Cancel</Link>
  <button type="button" onClick={handleSubmit} className="buttonSpace btn btn-primary">Submit</button>
</div>
    </>)
}
