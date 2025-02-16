import React from 'react'

interface ResultModalProps {
  isOpen: boolean
  onClose: () => void
  onShowStats: () => void
  onPlayAgain: () => void
  won: boolean
  word: string
  isDarkMode: boolean
}

const ResultModal: React.FC<ResultModalProps> = ({ 
  isOpen, 
  onClose,
  onShowStats,
  onPlayAgain, 
  won,
  word,
  isDarkMode
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className={`w-1/3 p-6 overflow-auto rounded-lg shadow-lg max-h-[90%] border ${
        isDarkMode 
          ? 'bg-[#262B3C] text-white border-gray-700' 
          : 'bg-white text-black border-black'
      }`}>
        <h2 className="mb-6 text-3xl font-bold text-center">
          {won ? 'Congratulations!' : 'Better luck next time!'}
        </h2>
        
        <div className='flex flex-col items-center gap-5 my-10'>
          <p className='text-xl font-bold'>
            {won ? 'You won the game!' : 'You lost this round.'}
          </p>
          
          <div className='flex flex-col items-center justify-center my-5 text-center'>
            <p className='mb-2 text-lg font-medium'>The secret word was:</p>
            <p className='text-4xl font-bold tracking-wider uppercase'>{word}</p>
          </div>
        </div>
        
        <div className='flex justify-center gap-4'>
          <button
            className={`px-8 py-2 text-lg text-white rounded-md ${
              isDarkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={onShowStats}
          >
            VIEW STATS
          </button>
          <button
            className={`px-8 py-2 text-lg text-white rounded-md ${
              isDarkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-600 hover:bg-green-700'
            }`}
            onClick={() => {
              onPlayAgain()
              onClose()
            }}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultModal