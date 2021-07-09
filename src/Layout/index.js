import React, { Fragment } from "react";
import { Route, Switch} from "react-router-dom";
import Header from "./Header";
import DeckRoutes from "./DeckRoutes";
import Home from "./Home"
import NotFound from "./NotFound";
import { CreateDeck } from "./CreateDeck";

function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
      <Route exact path="/">
      <Home/>
      </Route>
      <Route exact path="/decks/new">
        <CreateDeck/>
      </Route>
      <Route path="/decks/:deckId">
        <DeckRoutes/>
      </Route>
      <Route NoMatch>
        <NotFound/>
      </Route>
      </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
