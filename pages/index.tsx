import { observer, useLocalObservable } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import Guess from '../components/Guess'
import Qwerty from '../components/Qwerty'
import PuzzleStore from '../stores/PuzzleStore'
import Modal from '../components/Modal'
import StatModal from '../components/StatModal'
import ExpiryModal from '../components/ExpiryModal'
import ResultModal from '../components/ResultModal'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { IoStatsChartOutline } from "react-icons/io5";

interface Stats {
  gamesPlayed: number
  wins: number
  losses: number
}

export default observer(function Home() {
  const store = useLocalObservable(() => PuzzleStore)
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showWordModal, setShowWordModal] = useState(false)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)
  const [stats, setStats] = useState<Stats>({
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
  })
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes in seconds
  const [gameEnded, setGameEnded] = useState(false)

  // Load stats from localStorage on first render
  useEffect(() => {
    const savedStats = JSON.parse(localStorage.getItem('wordleStats') || '{"gamesPlayed":0,"wins":0,"losses":0}')
    setStats(savedStats)
    
    // Initialize the game on first load
    store.init()
  }, [])

  // Handle game win/loss and update stats
  useEffect(() => {
    if (store.won || store.lost) {
      if (!gameEnded) {
        const newStats = {
          gamesPlayed: stats.gamesPlayed + 1,
          wins: store.won ? stats.wins + 1 : stats.wins,
          losses: store.lost ? stats.losses + 1 : stats.losses,
        }
        setStats(newStats)
        localStorage.setItem('wordleStats', JSON.stringify(newStats))
        setShowResultModal(true)
        setGameEnded(true)
      }
    }
  }, [store.won, store.lost, gameEnded, stats])

  // Setup keyboard event listener
  useEffect(() => {
    window.addEventListener('keyup', store.handleKeyup)
    return () => {
      window.removeEventListener('keyup', store.handleKeyup)
    }
  }, [])

  // Countdown timer effect
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (store.won || store.lost) return; // Don't count down if game is over
      
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - count as a loss if the game hasn't been won
          if (!store.won && !gameEnded) {
            const newStats = {
              gamesPlayed: stats.gamesPlayed + 1,
              wins: stats.wins,
              losses: stats.losses + 1,
            }
            setStats(newStats)
            localStorage.setItem('wordleStats', JSON.stringify(newStats))
            setGameEnded(true)
          }
          
          setShowWordModal(true)
          return 300; // Reset to 5 minutes
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [store.won, store.lost, gameEnded, stats]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode)
  }

  const handlePlayAgain = () => {
    store.resetGame()
    setTimeRemaining(300)
    setGameEnded(false)
    setShowStatsModal(false)
    setShowWordModal(false)
    setShowResultModal(false)
  }

  // Convert remaining time to minutes:seconds format
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className={`flex flex-col items-center justify-center w-screen h-screen transition delay-200 ${isDarkMode ? 'bg-[#262B3C]' : 'bg-[#F9F9F9]'}`}>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isDarkMode={isDarkMode} />
      <StatModal 
        isOpen={showStatsModal} 
        onClose={() => setShowStatsModal(false)} 
        stats={stats} 
        formatTime={formatTime} 
        timeRemaining={timeRemaining}
        onPlayAgain={handlePlayAgain}
        isDarkMode={isDarkMode}
      />
      <ExpiryModal 
        isOpen={showWordModal} 
        onClose={() => {
          setShowWordModal(false)
          handlePlayAgain()
        }}
        isDarkMode={isDarkMode}
      />
      <ResultModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        onShowStats={() => {
          setShowResultModal(false)
          setShowStatsModal(true)
        }}
        onPlayAgain={handlePlayAgain}
        won={store.won}
        word={store.word}
        isDarkMode={isDarkMode}
      />

      <div className={`flex items-center justify-between mb-8
          rounded-lg py-5 px-5 w-[90%] md:w-1/3 transition delay-200 ${isDarkMode ? 'bg-[#DADCE008]' : 'bg-[#f3f3f3]'}`}>
        <FaRegQuestionCircle className={`cursor-pointer w-6 h-6 transition delay-200 ${isDarkMode ? 'text-white' : 'text-black'}`} onClick={() => setIsModalOpen(true)} />
        <h1 className="text-4xl font-bold text-transparent uppercase bg-gradient-to-br from-blue-400 to-green-400 bg-clip-text">
          Wordle
        </h1>
        <div className="flex items-center justify-center gap-2">
          <IoStatsChartOutline className={`cursor-pointer w-6 h-6 transition delay-200 ${isDarkMode ? 'text-white' : 'text-black'}`} onClick={() => setShowStatsModal(true)} />
        <button onClick={toggleTheme} className={`px-5 py-1 rounded-lg text-md transition delay-200 ${isDarkMode ? 'bg-black text-white' : 'bg-[#f3f3f3] border border-black'}`}>
          {isDarkMode ? 'Light' : 'Dark'}
        </button>
        </div>
      </div>
      
      {store.guesses.map((_, i) => (
        <Guess
          key={i}
          word={store.word}
          guess={store.guesses[i]}
          isGuessed={i < store.currentGuess}
          isDarkMode={isDarkMode}
        />
      ))}
      
      {(store.won || store.lost) && (
        <div className="mt-4 text-center">
          <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {store.won ? 'You won!' : 'You lost!'}
          </h1>
          <button 
            onClick={handlePlayAgain}
            className="px-6 py-2 text-lg font-semibold text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
          >
            Play Again
          </button>
        </div>
      )}
      
      <div className="mt-4 text-center">
        <p className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Time remaining: {formatTime(timeRemaining)}
        </p>
      </div>
      
      <div className="rounded-md bg-[#DADCE04D]/50 p-4 mt-5">
        <Qwerty store={store} />
      </div>
    </div>
  )
})