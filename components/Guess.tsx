interface GuessProps {
  isGuessed: boolean
  guess: string
  word: string
  isDarkMode: boolean
}

export default function Guess({ isGuessed, guess, word, isDarkMode }: GuessProps) {
  return (
    <div className="grid grid-cols-5 gap-2 mb-2">
      {new Array(5).fill(0).map((_, i) => {
        const bgColor = !isGuessed
          ? isDarkMode ? 'bg-[#939B9F33]' : 'bg-[#939B9F4D] text-black'
          : guess[i] === word[i]
          ? 'bg-green-400'
          : word.includes(guess[i])
          ? 'bg-yellow-400'
          : 'bg-black'

        return (
          <div
            key={i}
            className={`flex h-16 w-16 items-center justify-center rounded-md font-bold uppercase text-white transition delay-200 ${bgColor}`}
          >
            {guess[i]}
          </div>
        )
      })}
    </div>
  )
}