import { useState } from 'react'
import './App.css'
import Pokemon from './Pokemon'

function App() {
  return (
    <>
      <div className="top">
        <h1 className="title">Memory Game</h1>
        <h3 className="sub">Get points by clicking on an image but don't click on the same one more than once!</h3>
      </div>

      <Pokemon />

      <div className="pts">
        <p className="score">Score: </p>
        <p className="score">High Score: </p>
      </div>
    </>
  )
}

export default App
