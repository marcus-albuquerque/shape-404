import { Volume2 } from 'lucide-react'
import { useState } from 'react'

export function AudioActivator({ onActivated }) {
  const [activated, setActivated] = useState(false)

  const activateAudio = () => {
    // Criar e tocar um som silencioso para ativar o contexto
    const context = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    gain.gain.value = 0.001 // Quase mudo
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.1)
    
    setActivated(true)
    if (onActivated) onActivated()
  }

  if (activated) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '100px',
      left: '20px',
      right: '20px',
      background: '#e94560',
      borderRadius: '30px',
      padding: '12px 20px',
      textAlign: 'center',
      zIndex: 200,
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }} onClick={activateAudio}>
      <Volume2 size={20} style={{ display: 'inline', marginRight: '8px' }} />
      Toque aqui para ativar o som do alarme 🔔
    </div>
  )
}