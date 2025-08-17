import { useState, useEffect } from "react";
import "./styles.css";

function App() {
  //state
  const [listeC, setListeC] = useState([]);
  const [TexteSubmitListe, setTexteSubmitListe] = useState("");
  //comportemens

  
  useEffect(() => {
    const CollectListeC = async () => {
      const response = await fetch(
        "https://tantrax.duckdns.org/apiapp/actions/ListeC/viewListe.php"
      );
      const data = await response.json();
      console.log(data.liste);
      setListeC(data.liste);
    };
    CollectListeC();
  }, []);

  const envoyer = async (id,nom) => {
    try {
      const res = await fetch("https://tantrax.duckdns.org/apiapp/actions/ListeC/AddListe.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // on envoie du JSON
        },
        body: JSON.stringify({ id, nom }),
      });

      const data = await res.json();
      console.log(data)
    } catch (err) {
      console.error("Erreur :", err);
    }
  };

  const suprimer = async (id) => {
    try {
      const res = await fetch("https://tantrax.duckdns.org/apiapp/actions/ListeC/DeleteListe.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // on envoie du JSON
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      console.log(data)
    } catch (err) {
      console.error("Erreur :", err);
    }
  };
  const supr = (id) => {
    const copieListeC = listeC.slice();
    const nouveauListeC = copieListeC.filter((element) => element.id !== id);
    setListeC(nouveauListeC);
  };

  const transformListC = (liste) => {
    return (
      <li key={liste.id}>
        {liste.nom}{" "}
        <button
          onClick={() => {
            suprimer(liste.id);
            supr(liste.id);
          }}
        >
          X
        </button>
      </li>
    );
  };

  const add = (event) => {
    event.preventDefault();
    const CopyListeC = [...listeC];
    const id = new Date().getTime();
    const nom = TexteSubmitListe;
    envoyer(id,nom);
    CopyListeC.push({ id: id, nom: nom });
    setListeC(CopyListeC);
    setTexteSubmitListe("");
  };

  const ChangeSubmitValue = (change) => {
    setTexteSubmitListe(change.target.value);
  };

  //affichage
  return (
    <div>
      <h1>liste de course</h1>
      <ul>{listeC.map(transformListC)}</ul>
      <form action="add" onSubmit={add}>
        <input
          type="text"
          value={TexteSubmitListe}
          onChange={ChangeSubmitValue}
        />
        <button>add</button>
      </form>
    </div>
  );
}

export default App;
