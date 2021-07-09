import React from "react";
import {Link} from "react-router-dom"

export default function CardInfo({id, front, back, deckId, cardDeletionHandler}){
    return (<>
            <div className="card my-1">
                <div className ="card-body">
                <div className='card-content' style={{display:'flex'}}>
          <p className='col-md-6' style={{flex:1}}>{front}</p>
          <p className='col-md-6' style={{flex:1}}>{back}</p>
                </div>
                </div>
                <div className="buttons-1">
                    <Link to={`/decks/${deckId}/cards/${id}/edit`} type="button" className="buttonSpacing buttonSpacing-1 btn btn-secondary"><i class="bi bi-pencil"></i>  Edit</Link>
                    <button type="button" className="btn btn-danger right" onClick={() => cardDeletionHandler(id)} ><i className='bi bi-trash'></i></button>
               
            </div>
            </div>
            </>)
}