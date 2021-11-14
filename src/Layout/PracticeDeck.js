import { load } from "dotenv/types";
import React, { useEffect, useState} from "react";
import { throwError } from "rxjs";
import { listDecks } from "../utils/api";



export default function PracticeDeck(){
    const [decks, setDecks] = useState([]);

    function loadDecks(){
        try {
            const currentDecks = loadDecks();
            setDecks(currentDecks);
        } catch (error) {
            setDecks([]);
        }
    }

useEffect(() => {
    loadDecks()
}, []);
}


export default function PracticeDeck(){
    useEffect((decks) => {
        setDecks([]);
       const abortController = new AbortController();
    
       async function loadDecks(){
        await listDecks(abortController.signal)
            .then((response) => response.json())
            .then(setDecks)
            .catch((error) => {
        if (error.name === "AbortError") {
        // Ignore `AbortError`
        console.log("Aborted");
        } else {
        throw error;
        }
    })
    }
    loadDecks();

    return () => {
        console.log("abort")
        abortController.abort();
    };
    }, []);
}