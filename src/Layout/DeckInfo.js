import React from "react";
import {Link} from "react-router-dom"

export default function Deckinfo({id, name, description, handleDeleteDeck, cards}){

return (<div className="card my-1" key={id} >
  <div className="card-body" >
  <div className='deck-card-header header' >
    <h5 className="card-title" >{name}</h5>
    <p className='card-subtitle text-muted'>{cards.length} cards</p>
    </div>
    <p className="card-text">{description}</p>
    <div className="buttons">
    <Link to={`/decks/${id}`} type="button" className="btn btn-secondary space">
        <i className="bi bi-eye"></i> View
        </Link>
    <Link  to={`/decks/${id}/study`} className="btn btn-primary space"><i className="bi bi-journal-bookmark-fill"></i>    Study</Link> 
    <button type="button" className="btn btn-danger right" onClick={() => handleDeleteDeck(id)} ><i className='bi bi-trash'></i>
</button>
</div>
  </div>
</div>)}