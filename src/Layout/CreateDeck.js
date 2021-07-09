import React, { useState } from "react";
import {Link, useHistory} from "react-router-dom"
import { createDeck } from "../utils/api/index";

export function CreateDeck(){
    const [newDeck, setNewDeck] = useState({})
    const history = useHistory();
    const handleChange = (event) => {
    const { name, value } = event.target;
    setNewDeck({...newDeck, [name]: value})
   }
   const handleSubmit = (event) => {
    const abortController = new AbortController();
    event.preventDefault();
    async function callCreateDeck() {
        try {
          const deck = await createDeck(newDeck, abortController.signal);
          history.push(`/decks/${deck.id}`);
        } catch (err) {
          if (err.name === "AbortError") {
            console.info("aborted");
          } else {
            throw err;
          }
        }
      }
      callCreateDeck();
  
      return () => {
        abortController.abort();
      };
    }
   

    return (<>
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol> 
    </nav>
    <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Name</label>
  <input 
    type="text" 
    className="form-control" 
    name="name"
    id="name" 
    placeholder="Deck Name"
    value={newDeck?.name}
    onChange={handleChange}/>
</div>
<div class="mb-3">
  <label for="exampleFormControlTextarea1" className="form-label">Description</label>
  <textarea 
    className="form-control" 
    name="description"
    id="description"  
    placeholder="Brief description of deck"
    value={newDeck?.description} 
    onChange={handleChange}
    rows="3"></textarea>
  <Link to={'/'} type="button" className="buttonSpace btn btn-secondary">Cancel</Link>
  <button type="button" onClick={handleSubmit} className="buttonSpace btn btn-primary">Submit</button>
</div>
    </>)
}