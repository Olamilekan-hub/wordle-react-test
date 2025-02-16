import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className={`w-1/3 p-6 overflow-auto rounded-lg shadow-lg max-h-[90%] border ${
        isDarkMode 
          ? 'bg-[#262B3C] text-white border-gray-700' 
          : 'bg-white text-black border-black'
      }`}>
        <h2 className="mb-6 text-3xl font-bold text-center">How to Play</h2>
        <p className="mb-2 text-lg font-regular">Guess the hidden word in 5 attempts.</p>
        <p className="mb-2 text-lg font-regular">Each attempts must be a valid 5-letter.</p>
        <p className="mb-2 text-lg font-regular">After each attempt the color of the letter changes to show how close you are to guessing the word.</p>
        <p className="mb-2 text-lg font-bold">Example</p>
        <div className='p-5'>
          <div className='flex gap-4 mb-2 flex-cols'>
            <div className="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-green-600 rounded-md"><span>A</span></div>
            <div className={`flex items-center justify-center w-12 h-12 text-2xl font-bold border rounded-md ${
              isDarkMode ? 'border-gray-500 text-white' : 'border-black text-black'
            }`}><span>P</span></div>
            <div className={`flex items-center justify-center w-12 h-12 text-2xl font-bold border rounded-md ${
              isDarkMode ? 'border-gray-500 text-white' : 'border-black text-black'
            }`}><span>P</span></div>
            <div className={`flex items-center justify-center w-12 h-12 text-2xl font-bold border rounded-md ${
              isDarkMode ? 'border-gray-500 text-white' : 'border-black text-black'
            }`}><span>L</span></div>
            <div className={`flex items-center justify-center w-12 h-12 text-2xl font-bold border rounded-md ${
              isDarkMode ? 'border-gray-500 text-white' : 'border-black text-black'
            }`}><span>E</span></div>
          </div>
          <p className="mb-2 text-lg font-regular">The letter <span className='font-bold'>G</span> in the word and in the correct position.</p>
        </div>
        <div className='p-5'>
          <div className='flex gap-4 mb-2 flex-cols'>
            <div className={`flex items-center justify-center w-12 h-12 text-2xl font-bold border rounded-md ${
              isDarkMode ? 'border-gray-500 text-white' : 'border-black text-black'
            }`}><span>F</span></div>
            <div className="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-yellow-600 rounded-md"><span>O</span></div>
            <div className={`flex items-center justify-center w-12 h-12 text-2xl font-bold border rounded-md ${
              isDarkMode ? 'border-gray-500 text-white' : 'border-black text-black'
            }`}><span>C</span></div>
            <div className={`flex items-center justify-center w-12 h-12 text-2xl font-bold border rounded-md ${
              isDarkMode ? 'border-gray-500 text-white' : 'border-black text-black'
            }`}><span>U</span></div>
            <div className={`flex items-center justify-center w-12 h-12 text-2xl font-bold border rounded-md ${
              isDarkMode ? 'border-gray-500 text-white' : 'border-black text-black'
            }`}><span>S</span></div>
          </div>
          <p className="mb-2 text-lg font-regular">The letter <span className='font-bold'>O</span> in the word but not in the correct position.</p>
        </div>
        <div className='p-5'>
          <div className='flex gap-4 mb-2 flex-cols'>
            <div className={`flex items-center justify-center w-12 h-12 text-2xl font-bold border rounded-md ${
              isDarkMode ? 'border-gray-500 text-white' : 'border-black text-black'
            }`}><span>M</span></div>
            <div className={`flex items-center justify-center w-12 h-12 text-2xl font-bold border rounded-md ${
              isDarkMode ? 'border-gray-500 text-white' : 'border-black text-black'
            }`}><span>A</span></div>
            <div className={`flex items-center justify-center w-12 h-12 text-2xl font-bold border rounded-md ${
              isDarkMode ? 'border-gray-500 text-white' : 'border-black text-black'
            }`}><span>N</span></div>
            <div className="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-gray-600 rounded-md"><span>G</span></div>
            <div className={`flex items-center justify-center w-12 h-12 text-2xl font-bold border rounded-md ${
              isDarkMode ? 'border-gray-500 text-white' : 'border-black text-black'
            }`}><span>O</span></div>
          </div>
          <p className="mb-2 text-lg font-regular">The letter <span className='font-bold'>G</span> is not in the word.</p>
          <p className="mb-2 text-lg font-regular">There may be repeated letters. The hints are independent for each letter.</p>
          <p className="mb-2 text-lg text-center font-regular">A new word each five minutes.</p>
        </div>
        <div className='flex justify-center'>
          <button
            className={`px-20 py-2 text-2xl text-white rounded-md ${
              isDarkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-600 hover:bg-green-700'
            }`}
            onClick={onClose}
          >
            PLAY
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal