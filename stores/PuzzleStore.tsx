import words from '../words.json'

interface PuzzleStoreType {
  word: string
  guesses: string[]
  currentGuess: number
  won: boolean
  lost: boolean
  allGuesses: string
  exactGuesses: string[]
  inexactGuesses: string[]
  init: () => void
  resetGame: () => void
  submitGuess: () => void
  handleKeyup: (e: { key: string }) => void
}

const PuzzleStore: PuzzleStoreType = {
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

export default PuzzleStore