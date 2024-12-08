import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/UserContext";

// Luodaan "root"-elementti, joka on juurielementti (div#root) HTML-tiedostossa.
const root = ReactDOM.createRoot(document.getElementById("root"));

// React-sovelluksen renderöinti. UserProvider-komponentti mahdollistaa käyttäjätietojen jakamisen koko sovelluksessa.
root.render(
  <UserProvider>
    <App />{" "}
    {/* Sovelluksen pääkomponentti, joka sisältää kaikki alikomponentit */}
  </UserProvider>,
);

// Tämä funktio mittaa sovelluksen suorituskykyä ja voi lähettää sen ulkoisiin analytiikkatyökaluihin.
// Jos et tarvitse tätä, voit jättää tämän pois tai määrittää omaa mittausta.
reportWebVitals();
