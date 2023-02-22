// FOR NOW CHATVIEW is a PAGE

import React from 'react'
import { Websocket } from '../../components/Websocket/Websocket'
import ChatViewLayout from '../../layouts/ChatViewLayout/ChatViewLayout'
import { WebsocketContext, WebsocketProvider, socket } from '../../services/WebSocket/WebsocketContext'

function ChatView() {
  return (
    <WebsocketProvider value={socket}>
      <Websocket/>
    </WebsocketProvider>
    // <ChatViewLayout />
  )
}

export default ChatView