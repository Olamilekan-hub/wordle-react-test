import { observer } from 'mobx-react-lite'

interface QwertyProps {
  store: {
    exactGuesses: string[]
    inexactGuesses: string[]
    allGuesses: string
    handleKeyup: (e: { key: string }) => void
  }
}

export default observer(function Qwerty({ store }: QwertyProps) {
  const qwerty = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
  
  const handleClick = (char: string) => {
    // Simulate a keyup event with the clicked character
    store.handleKeyup({ key: char })
  }
  
  // Special buttons for Enter and Backspace
  const renderSpecialButtons = () => (
    <div className="flex justify-center mt-1">
      <div 
        className="rounded-md m-px flex h-10 px-2 items-center justify-center uppercase bg-[#D3D6DA] cursor-pointer"
        onClick={() => handleClick('Enter')}
      >
        Enter
      </div>
      <div 
        className="rounded-md m-px flex h-10 px-2 items-center justify-center uppercase bg-[#D3D6DA] cursor-pointer ml-2"
        onClick={() => handleClick('Backspace')}
      >
        ←
      </div>
    </div>
  )
  
  return (
    <div>
      {qwerty.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {row.split('').map((char) => {
            const bgColor = store?.exactGuesses?.includes(char)
              ? 'bg-green-400'
              : store?.inexactGuesses?.includes(char)
              ? 'bg-yellow-400'
              : store?.allGuesses?.includes(char)
              ? 'bg-gray-400'
              : 'bg-[#D3D6DA]'
            return (
              <div
                key={char}
                className={`rounded-md m-px flex h-10 w-10 items-center justify-center uppercase ${bgColor} cursor-pointer`}
                onClick={() => handleClick(char)}
              >
                {char}
              </div>
            )
          })}
        </div>
      ))}
      {renderSpecialButtons()}
    </div>
  )
})