import React from 'react'
import Game from '../../components/Game/Game'
import { GameSocketProvider } from '../../services/Game/SocketContext'

function GamePage() {
  return (
    <GameSocketProvider>
      <Game />
    </GameSocketProvider>
  )
}

export default GamePage