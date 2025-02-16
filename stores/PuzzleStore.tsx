// import words from '../words.json';

// export default {
//   // Game state variables
//   word: '', // The current word to guess
//   guesses: [], // Stores user guesses (max 5)
//   currentGuess: 0, // Current guess index
//   timer: null, // Timer reference for word expiration
//   showModal: false, // Controls word expiration overlay modal
//   statsModal: false, // Controls game statistics modal

//   // Game statistics tracking
//   stats: {
//     gamesPlayed: 0, // Total games played
//     wins: 0, // Total wins
//     losses: 0, // Total losses
//   },

//   // Check if the player has won (last guess matches the word)
//   get won() {
//     return this.guesses[this.currentGuess - 1] === this.word;
//   },

//   // Check if the player has lost (max guesses reached)
//   get lost() {
//     return this.currentGuess === 5;
//   },

//   // Get all guessed letters so far (flattening guesses)
//   get allGuesses() {
//     return this.guesses.slice(0, this.currentGuess).join('').split('');
//   },

//   // Get letters that are correctly guessed in the exact position
//   get exactGuesses() {
//     return this.word.split('').filter((letter, i) => {
//       return this.guesses
//         .slice(0, this.currentGuess) // Check all past guesses
//         .map((word) => word[i]) // Get letter at index i
//         .includes(letter); // If letter exists in that position
//     });
//   },

//   // Get letters that are guessed but in the wrong position
//   get inexactGuesses() {
//     return this.word.split('').filter((letter) => this.allGuesses.includes(letter));
//   },

//   // Initialize the game
//   init() {
//     this.resetGame(); // Reset the game state
//   },

//   // Resets the game state and selects a new word
//   resetGame() {
//     this.word = words[Math.floor(Math.random() * words.length)]; // Pick a random word
//     this.guesses = new Array(5).fill(''); // Reset guesses
//     this.currentGuess = 0; // Reset guess index
//     this.startTimer(); // Start the 5-minute timer
//   },

//   // Starts a countdown timer (5 minutes)
//   startTimer() {
//     if (this.timer) clearTimeout(this.timer); // Clear previous timer

//     this.timer = setTimeout(() => {
//       this.showModal = true; // Show overlay modal when time runs out
//       this.resetGame(); // Reset the game when time is up
//     }, 5 * 60 * 1000); // 5 minutes in milliseconds
//   },

//   // Submits the current guess and checks win/loss conditions
//   submitGuess() {
//     const currentWord = this.guesses[this.currentGuess];

//     if (words.includes(currentWord)) { // Check if the word exists in dictionary
//       this.currentGuess++; // Move to the next guess

//       if (this.won) {
//         // If the user wins, update statistics
//         this.stats.gamesPlayed++;
//         this.stats.wins++;
//         this.showStatsModal(); // Show game statistics modal
//         this.resetGame(); // Start a new round
//       } else if (this.lost) {
//         // If the user loses, update statistics
//         this.stats.gamesPlayed++;
//         this.stats.losses++;
//         this.showStatsModal(); // Show game statistics modal
//         this.resetGame(); // Start a new round
//       }
//     }
//   },

//   // Handles keyboard inputs
//   handleKeyup(e) {
//     if (this.won || this.lost) return; // Ignore input if game is over

//     if (e.key === 'Enter') return this.submitGuess(); // Submit guess on Enter key

//     if (e.key === 'Backspace') {
//       // Remove last letter if Backspace is pressed
//       this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(0, -1);
//       return;
//     }

//     // Accept only alphabetic characters and ensure word is max 5 letters
//     if (this.guesses[this.currentGuess].length < 5 && e.key.match(/^[A-z]$/)) {
//       this.guesses[this.currentGuess] += e.key.toLowerCase(); // Append new letter
//     }
//   },

//   // Shows the game statistics modal
//   showStatsModal() {
//     this.statsModal = true; // Display the stats modal
//   },
// };

import words from '../words.json'

export default {
  word: '',
  guesses: [],
  currentGuess: 0,
  
  get won() {
    return this.guesses[this.currentGuess - 1] === this.word
  },
  
  get lost() {
    return this.currentGuess === 5
  },
  
  get allGuesses() {
    return this.guesses.slice(0, this.currentGuess).join('')
  },
  
  get exactGuesses() {
    return this.guesses
      .slice(0, this.currentGuess)
      .join('')
      .split('')
      .filter((char, i) => this.word.includes(char) && this.word[i % 5] === char)
  },
  
  get inexactGuesses() {
    return this.guesses
      .slice(0, this.currentGuess)
      .join('')
      .split('')
      .filter(
        (char, i) => 
          this.word.includes(char) && 
          this.word[i % 5] !== char && 
          !this.exactGuesses.includes(char)
      )
  },
  
  init() {
    this.resetGame()
  },
  
  resetGame() {
    this.word = words[Math.floor(Math.random() * words.length)]
    this.guesses = new Array(5).fill('')
    this.currentGuess = 0
    console.log("New word:", this.word) // For testing
  },
  
  submitGuess() {
    if (this.guesses[this.currentGuess].length === 5 && 
        words.includes(this.guesses[this.currentGuess])) {
      this.currentGuess++
    }
  },
  
  handleKeyup(e) {
    if (this.won || this.lost) return

    if (e.key === 'Enter') return this.submitGuess()
    if (e.key === 'Backspace') {
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(0, -1)
      return
    }
    if (this.guesses[this.currentGuess].length < 5 && e.key.match(/^[A-z]$/)) {
      this.guesses[this.currentGuess] += e.key.toLowerCase()
    }
  },
}