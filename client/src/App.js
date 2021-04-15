import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Title from "./components/layout/Title";

import { Layout } from "antd";
import Main from "./components/pages/Main";
import AddPerson from "./components/forms/AddPerson";
import AddBoat from "./components/forms/AddBoat";

import "./App.css";
import People from "./components/lists/People";
import PersonDetail from "./components/pages/PersonDetail";

const { Content } = Layout;

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    {/* <Main /> */}
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/details" component={PersonDetail} exact />
    </Switch>
  </ApolloProvider>
);

export default App;
