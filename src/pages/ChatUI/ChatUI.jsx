import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./ChatUI.scss"
const ChatUI = () => {
  const [messages, setMessages] = useState([
    { id: 'a-1', role: 'assistant', content: 'Salam! DOCX faylını at, PPTX-ə çevirim (demo).' }
  ])
  const [input, setInput] = useState('')
  const [isBusy, setIsBusy] = useState(false)
  const bottomRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = useCallback(() => {
    const text = input.trim()
    if (!text || isBusy) return
    const userMsg = { id: `u-${Date.now()}` , role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
  }, [input, isBusy])

  const onDrop = useCallback(async (e) => {
    e.preventDefault()
    if (isBusy) return
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    if (!/\.docx$/i.test(file.name)) {
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: 'assistant', content: 'Yalnız .docx faylı qəbul olunur.' }
      ])
      return
    }
    setIsBusy(true)
    setMessages((prev) => [
      ...prev,
      { id: `sys-${Date.now()}`, role: 'assistant', content: 'Fayl qəbul olundu, konvertasiya hazırlanır (demo)...' }
    ])
    // Placeholder: burada real konvertasiyanı bağlaya bilərsiniz
    await new Promise((r) => setTimeout(r, 900))
    setMessages((prev) => [
      ...prev,
      { id: `a-${Date.now()}`, role: 'assistant', content: `${file.name} faylı üçün PPTX hazırdır (demo).` }
    ])
    setIsBusy(false)
  }, [isBusy])

  const prevent = useCallback((e) => e.preventDefault(), [])

  const onPick = useCallback(async (e) => {
    if (isBusy) return
    const file = e.target.files?.[0]
    if (!file) return
    if (!/\.docx$/i.test(file.name)) {
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: 'assistant', content: 'Yalnız .docx faylı qəbul olunur.' }
      ])
      e.target.value = ''
      return
    }
    setIsBusy(true)
    setMessages((prev) => [
      ...prev,
      { id: `sys-${Date.now()}`, role: 'assistant', content: `${file.name} qəbul olundu, konvertasiya hazırlanır (demo)...` }
    ])
    await new Promise((r) => setTimeout(r, 900))
    setMessages((prev) => [
      ...prev,
      { id: `a-${Date.now()}`, role: 'assistant', content: `${file.name} faylı üçün PPTX hazırdır (demo).` }
    ])
    setIsBusy(false)
    e.target.value = ''
  }, [isBusy])

  const openPicker = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <div className="chatgpt-shell">
      <div className="chatgpt-header">AI Interface</div>
      <div className="chatgpt-body">
        <div
          className="dropzone-embedded"
          onDrop={onDrop}
          onDragOver={prevent}
          onDragEnter={prevent}
          onDragLeave={prevent}
        >
          <div className="dz-title">DOCX → PPTX</div>
          <div className="dz-sub">DOCX faylını bura atın</div>
        </div>
        <div className="message-list">
          {messages.map((m) => (
            <div key={m.id} className={`message message--${m.role}`}>
              <div className="message-bubble">{m.content}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <form className="message-input" onSubmit={(e) => { e.preventDefault(); send() }}>
        <input
          type="text"
          placeholder="Mesaj yazın..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isBusy}
        />
        <button type="button" className="dz-clip" onClick={openPicker} aria-label="DOCX seç" disabled={isBusy}>
          <span className="dz-clip-icon">📎</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".docx"
          style={{ display: 'none' }}
          onChange={onPick}
        />
        <button type="submit" disabled={isBusy}>Göndər</button>
      </form>
    </div>
  )
}

export default ChatUI


