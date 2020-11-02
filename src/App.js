import React from "react";
import { Route } from "wouter";
// import logo from './logo.svg';
import "./App.css";
// import SearchResult from "./pages/SearchResult";
import Home from "./pages/Home";
// import Register from "./pages/Register";

import { UserContextProvider } from "./context/UserContext";

const App = () => {
  return (
    <>
      <UserContextProvider>
        <div className="App">
          <section className="App-content">
            {/* <Header/> */}
            

            {/* <Link to="/login">Login</Link> */}

            <Route component={Home} path="/" />
            {/* <Route component={Login} path="/login" /> */}
            {/* <Route component={Register} path="/register" /> */}
            {/* <Route component={SearchResult} path="/gif/:keyword" /> */}

            {/* <ul>
            {POPULAR_GIFS.map((gf) => (
              <li key={gf}>
                <Link to={`/gif/${gf}`}>Gifs de {gf}</Link>
              </li>
            ))}
          </ul> */}
          </section>
        </div>
      </UserContextProvider>
    </>
  );
};

export default App;
