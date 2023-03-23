import React from 'react'
import Game from '../../components/Game/Game'
import GameScreen from '../../components/Game/GameScreen'
import { GameSocketProvider } from '../../services/Game/SocketContext'

function GamePage() {
  return (
    <GameSocketProvider>
      <GameScreen />
    </GameSocketProvider>
  )
}

export default GamePage