import React, { Fragment } from "react";
import {  Route, Switch} from "react-router-dom";
import EditCard from "./EditCard.js"
import AddCard from "./AddCard"
import Deck from "./Deck"
import Study from "./Study"
import EditDeck from "./EditDeck"
import NotFound from "./NotFound";


export default function DeckRoutes() {

    return (
        <Fragment>
          <Switch>
          <Route exact path={`/decks/:deckId`} >
          <Deck/>
          </Route>
          <Route exact path={`/decks/:deckId/study`}>
          <Study/>
          </Route>
          <Route exact path={`/decks/:deckId/edit`}>
          <EditDeck/>
          </Route>
          <Route exact path={`/decks/:deckId/cards/new`}>
            <AddCard/>
          </Route>
          <Route exact path={`/decks/:deckId/cards/:cardId/edit`}> 
            <EditCard/>
          </Route>
          <Route NoMatch>
            <NotFound/>
          </Route>
          </Switch>
        </Fragment>
      );
};
