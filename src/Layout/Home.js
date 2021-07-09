import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {listDecks, deleteDeck} from "../utils/api/index";
import Deckinfo from "./DeckInfo";

function Home(){
    const [decks, setDecks] = useState([]);
    useEffect((decks) => {
        setDecks([]);
        const abortController = new AbortController();

        async function loadDecks(){
            try {
                const decksFromApi = await listDecks(abortController.signal);
                setDecks(decksFromApi);
            
            }catch (error) {
            if (error.name === "AbortError") {
            // Ignore `AbortError`
            console.log("Aborted");
            } else {
            throw error;
            }
        }
    }

    loadDecks();

    return () => {
    console.log("abort");
    abortController.abort(); // Cancels any pending request or response
    };
    }, []);


  async function handleDeleteDeck(id){
        if(window.confirm("Delete this deck? \n\n You will not be able to recover it."))
            {
                await deleteDeck(id);
                setDecks(() => decks.filter((deck) => deck.id !== id));
              }
    }

  const deckQuickView = decks.map((deck) => Deckinfo({...deck, handleDeleteDeck}));

return (
    <>
      <div className='row'>
        <Link to='/decks/new' className='btn btn-secondary'>
          <i className='bi bi-plus-lg'></i> Create Deck
        </Link>
      </div>
      <div className='my-4'>{deckQuickView}</div>
    </>
  );
}

export default Home;