import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  const [guess, setGuess] = useState(0); // Initialiser à 0 pour avoir "0" par défaut
  const [message, setMessage] = useState('');
  const [numberToGuess, setNumberToGuess] = useState(randomNumber);
  const [timeLeft, setTimeLeft] = useState(30); // Timer initialisé à 30 secondes
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // État pour démarrer le jeu

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();

    if (guess === '') {
      setMessage('Veuillez entrer un nombre.');
      return;
    }

    const guessNumber = parseInt(guess, 10);

    if (guessNumber < numberToGuess) {
      setMessage('Plus grand');
    } else if (guessNumber > numberToGuess) {
      setMessage('Plus petit');
    } else {
      setMessage('Bravo ! Tu as deviné le nombre !');
      setNumberToGuess(Math.floor(Math.random() * 100) + 1); // Génère un nouveau nombre
      setTimeLeft(30); // Réinitialise le timer à 30 secondes
      setGameOver(true); // Le jeu est terminé après avoir deviné
    }

    // Ne pas réinitialiser `guess` ici pour garder la valeur dans le champ.
  };

  // Fonction pour mettre à jour la supposition de l'utilisateur
  const handleChange = (event) => {
    setGuess(event.target.value);
  };

  // Effet pour gérer le timer, seulement quand le jeu commence
  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); // Décrémente chaque seconde
      return () => clearTimeout(timerId); // Nettoie le timeout pour éviter des conflits
    } else if (timeLeft === 0) {
      setMessage("Temps écoulé ! Vous avez perdu.");
      setGameOver(true);
    }
  }, [timeLeft, gameOver, gameStarted]);

  // Fonction pour démarrer le jeu
  const startGame = () => {
    setGameStarted(true); // Le jeu commence
    setTimeLeft(30); // Réinitialiser le timer à 30 secondes
    setGameOver(false); // Reset l'état de fin de jeu
    setMessage(''); // Reset le message
  };

  return (
    <div className="App">
      <h1 className="animated-title">Guess the Number</h1>
      <p>Devine un nombre entre 1 et 100 :</p>

      {!gameStarted ? (
        <button onClick={startGame}>Démarrer le jeu</button> // Bouton pour démarrer
      ) : !gameOver ? (
        <form onSubmit={handleSubmit}>
          <input 
            type="number" 
            value={guess} // Garde la valeur dans l'input après soumission
            onChange={handleChange} 
            placeholder="Entrer un nombre" 
            disabled={gameOver} // Désactive l'input si le jeu est terminé
          />
          <button type="submit" disabled={gameOver}>Deviner</button> {/* Bouton pour deviner */}
        </form>
      ) : (
        <button onClick={startGame}>Rejouer</button> // Bouton pour rejouer si game over
      )}

      <p>{message}</p>
      {gameStarted && <p>Temps restant : {timeLeft} secondes</p>} {/* Afficher le timer uniquement quand le jeu a commencé */}
    </div>
  );
}

export default App;
