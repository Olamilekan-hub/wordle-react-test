import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
}

const ExpiryModal: React.FC<ModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className={`w-[90%] md:w-1/3 p-6 overflow-auto rounded-lg shadow-lg max-h-[90%] border ${
        isDarkMode 
          ? 'bg-[#262B3C] text-white border-gray-700' 
          : 'bg-white text-black border-black'
      }`}>
        <h2 className="mb-6 text-3xl font-bold text-center">Time's Up!</h2>
        <p className="mt-3 mb-6 text-lg font-semibold text-center">A new word has been generated. Keep playing!</p>
        <div className='flex justify-center'>
          <button
            className={`px-20 py-2 text-2xl text-white rounded-md ${
              isDarkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-600 hover:bg-green-700'
            }`}
            onClick={onClose}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExpiryModal