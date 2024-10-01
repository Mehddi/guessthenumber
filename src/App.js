import React, { useState } from 'react';

function App() {
  // État pour stocker le nombre aléatoire
  const [randomNumber, setRandomNumber] = useState(null);

  // Fonction pour générer un nombre aléatoire entre 1 et 100
  const generateRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(randomNum);
  };

  return (
    <div className="App">
      <h1>Random Number Generator</h1>
      <p>Click the button to generate a random number between 1 and 100:</p>
      <button onClick={generateRandomNumber}>Generate Number</button>
      {randomNumber && <p>Random Number: {randomNumber}</p>}
    </div>
  );
}

export default App;
