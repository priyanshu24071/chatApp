import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'
import UsersList from '../components/UsersList'

export default function ChatPage({ userName, onChangeUser }) {
  const socket = useMemo(() => io('http://localhost:4000', { autoConnect: false }), [])
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([]) // bonus

  useEffect(() => {
    socket.connect()

    socket.on('connect', () => {
      socket.emit('join', userName)
    })

    socket.on('history', (history) => {
      setMessages(history || [])
    })

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg])
    })

    socket.on('users', (list) => setUsers(list || []))

    return () => {
      socket.disconnect()
    }
  }, [socket, userName])

  const sendMessage = (text) => {
    socket.emit('message', { userName, text })
  }

  return (
    <div style={{ maxWidth: 720, margin: '4vh auto', fontFamily: 'system-ui' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Single Room Chat</h2>
        <div>
          <span style={{ marginRight: 12 }}>Logged in as <b>{userName}</b></span>
          <button onClick={onChangeUser}>Change user</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 16, marginTop: 16 }}>
        <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, minHeight: 360 }}>
          <MessageList messages={messages} />
          <MessageInput onSend={sendMessage} />
        </div>
        <UsersList users={users} />
      </div>
    </div>
  )
}