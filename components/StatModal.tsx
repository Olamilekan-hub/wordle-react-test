import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  stats: {
    gamesPlayed: number
    wins: number
    losses: number
  }
  formatTime: (seconds: number) => string
  timeRemaining: number
  onPlayAgain: () => void
  isDarkMode: boolean
}

const StatModal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  stats, 
  formatTime, 
  timeRemaining,
  onPlayAgain,
  isDarkMode
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className={`w-[90%] md:w-1/3 p-6 overflow-auto rounded-lg shadow-lg max-h-[90%] border ${
        isDarkMode 
          ? 'bg-[#262B3C] text-white border-gray-700' 
          : 'bg-white text-black border-black'
      }`}>
        <h2 className="mb-6 text-3xl font-bold text-center">STATISTICS</h2>
        <div className='flex flex-col items-center gap-5 my-10'>
          <p className='text-xl font-bold'>Games Played: {stats.gamesPlayed}</p>
          <div className='flex items-center justify-between w-full px-24 my-5 text-xl font-medium'>
            <p>Wins: {stats.wins}</p>
            <p>Losses: {stats.losses}</p>
          </div>
          <p className="mt-3 text-lg font-semibold">Next Word In: {formatTime(timeRemaining)}</p>
        </div>
        <div className='flex justify-center gap-4'>
          <button
            className={`px-10 py-2 text-xl text-white rounded-md ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-800' : 'bg-gray-600 hover:bg-gray-700'
            }`}
            onClick={onClose}
          >
            CLOSE
          </button>
          <button
            className={`px-10 py-2 text-xl text-white rounded-md ${
              isDarkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'
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

export default StatModal