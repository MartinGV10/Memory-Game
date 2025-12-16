import { useEffect, useState } from 'react'
import './App.css'
import Pokemon from './Pokemon'

function App() {
  const [score, setScore] = useState(0)
  const [high, setHigh] = useState(2)
  const [view, setView] = useState(false)

  const handleHigh = () => {
    if (score >= high) {
      setHigh(high + 1)
    }
  }

  const handleScore = (newScore) => {
    setScore(newScore == 0 ? 0 : score + 1)
    if (newScore != 0) {
      handleHigh()
    }

    if (newScore == 0) {
      setView(true)
      return
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setView(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [view])



  return (
    <>
      <div className="top">
        <h1 className="title">Memory Game</h1>
        <h3 className="sub">Get points by clicking on an image but don't click on the same one more than once!</h3>
      </div>

      <Pokemon handleScore={handleScore} score={score}/>

      <div className="pts">
        <p className="score">Score: {score}</p>
        <p className="score">High Score: {high}</p>
      </div>

      {view && <p className={`alert ${view ? "show" : ""}`}>You already clicked that one!</p>}

    </>
  )
}

export default App
