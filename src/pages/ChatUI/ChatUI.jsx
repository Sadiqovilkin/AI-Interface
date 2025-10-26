import React, { useState, useRef, useEffect } from 'react'
import "./ChatUI.scss"

const ChatUI = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Salam,", isBot: true, isTitle: true },
    { id: 2, text: "Necə köməklik edə bilərəm?", isBot: true, isSubtitle: true }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // const quickActions = [
  //   { id: 1, text: "HR təlimatları", icon: "↗" },
  //   { id: 2, text: "Struktur info", icon: "↗" },
  //   { id: 3, text: "Daxili prosedurlar", icon: "↗" }
  // ]

  const botResponses = [
    "Bu mövzuda sizə kömək edə bilərəm. Daha ətraflı məlumat üçün hansı sahə ilə maraqlanırsınız?",
    "Çox yaxşı sual! Bu barədə məlumat verə bilərəm. Əlavə suallarınız varmı?",
    "Anladım. Bu məsələyə dair təfərrüatlı cavab verə bilərəm.",
    "Mənim məlumat bazamda bu mövzu haqqında məlumat var. Daha spesifik bir şey soruşmaq istəyirsinizmi?",
    "Əla! Bu sahədə sizə kömək edə bilərəm. Hansı konkret məsələ ilə bağlı kömək lazımdır?"
  ]

  const handleQuickAction = (actionText) => {
    // Add user message
    const userMessage = { 
      id: Date.now(), 
      text: actionText, 
      isBot: false, 
      isQuickAction: true 
    }
    
    setMessages(prev => [...prev, userMessage])
    
    // Auto response after delay
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
        const botMessage = { 
          id: Date.now() + 1, 
          text: randomResponse, 
          isBot: true 
        }
        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
      }, 1500)
    }, 500)
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return

    // Add user message
    const userMessage = { 
      id: Date.now(), 
      text: inputValue, 
      isBot: false 
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    
    // Auto response after delay
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
        const botMessage = { 
          id: Date.now() + 1, 
          text: randomResponse, 
          isBot: true 
        }
        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
      }, 1500)
    }, 500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Add file message
    const fileMessage = { 
      id: Date.now(), 
      text: `📎 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`, 
      isBot: false,
      isFile: true
    }
    
    setMessages(prev => [...prev, fileMessage])
    
    // Auto response after delay
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        const fileResponses = [
          `"${file.name}" faylı qəbul edildi. Bu fayl haqqında nə soruşmaq istəyirsiniz?`,
          `Fayl yükləndi: ${file.name}. Bu fayl üzərində hansı əməliyyatı yerinə yetirmək istəyirsiniz?`,
          `"${file.name}" faylı uğurla yükləndi. Faylın məzmunu haqqında məlumat almaq istəyirsinizmi?`,
          `Fayl qəbul olundu. ${file.name} faylı üçün hansı xidməti istəyirsiniz?`
        ]
        const randomResponse = fileResponses[Math.floor(Math.random() * fileResponses.length)]
        const botMessage = { 
          id: Date.now() + 1, 
          text: randomResponse, 
          isBot: true 
        }
        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
      }, 1500)
    }, 500)

    // Reset file input
    e.target.value = ''
  }

  return (
    <section id='ChatBot'>
      <div className="container">
        <div className="messageLists">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.isBot ? 'bot-message' : 'user-message'} ${message.isTitle ? 'title-message' : ''} ${message.isSubtitle ? 'subtitle-message' : ''} ${message.isQuickAction ? 'quick-action-message' : ''}`}>
              {message.text}
            </div>
          ))}
          
          {/* Quick action buttons - only show if no user messages yet
          {messages.filter(m => !m.isBot).length === 0 && (
            <div className="quick-actions">
              {quickActions.map((action) => (
                <button 
                  key={action.id}
                  className="quick-action-btn"
                  onClick={() => handleQuickAction(action.text)}
                >
                  {action.text}
                  <span className="action-icon">{action.icon}</span>
                </button>
              ))}
            </div>
          )} */}
          
          {isTyping && (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chatBotInputs">
          <input 
            type="text" 
            placeholder='Mesaj' 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="file-btn"
            onClick={handleFileSelect}
            type="button"
            title="Fayl əlavə et"
          >
            📎
          </button>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="*/*"
          />
          <button onClick={handleSendMessage}>
            ↑
          </button>
        </div>
      </div>
    </section>
  )
}

export default ChatUI


