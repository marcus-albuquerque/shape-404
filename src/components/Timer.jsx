import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react'

export function Timer({ onComplete }) {
  const [time, setTime] = useState(60)
  const [isRunning, setIsRunning] = useState(false)
  const [initialTime, setInitialTime] = useState(60)
  const audioContextRef = useRef(null)
  const audioElementRef = useRef(null)
  const isPlayingRef = useRef(false)

  // Criar o elemento de áudio para o MP3
  useEffect(() => {
    // Caminho do seu arquivo MP3 (coloque na pasta public/)
    audioElementRef.current = new Audio('/sounds/fire_alarm.mp3')
    audioElementRef.current.preload = 'auto'
    
    // Recarregar o áudio para poder tocar múltiplas vezes
    const handleEnded = () => {
      audioElementRef.current.currentTime = 0
    }
    audioElementRef.current.addEventListener('ended', handleEnded)
    
    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.removeEventListener('ended', handleEnded)
        audioElementRef.current = null
      }
    }
  }, [])

  // Fallback: sirene sintetizada (caso o MP3 falhe)
  const playSynthesizedSiren = () => {
    if (isPlayingRef.current) return
    isPlayingRef.current = true

    const context = audioContextRef.current || new (window.AudioContext || window.webkitAudioContext)()
    audioContextRef.current = context
    
    // Reativar contexto se estiver suspenso
    if (context.state === 'suspended') {
      context.resume()
    }
    
    const now = context.currentTime
    const masterGain = context.createGain()
    masterGain.gain.value = 0.5
    masterGain.connect(context.destination)

    const playBeep = (frequency, duration, startTime, volume = 0.3) => {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      oscillator.type = 'sawtooth'
      oscillator.frequency.value = frequency
      gain.gain.value = volume
      oscillator.connect(gain)
      gain.connect(masterGain)
      oscillator.start(startTime)
      gain.gain.exponentialRampToValueAtTime(0.00001, startTime + duration)
      oscillator.stop(startTime + duration)
    }

    for (let i = 0; i < 6; i++) {
      const startOffset = now + (i * 0.5)
      const freq = i % 2 === 0 ? 880 : 1320
      playBeep(freq, 0.4, startOffset, 0.4)
    }
    playBeep(1000, 0.8, now + 3, 0.5)

    setTimeout(() => {
      masterGain.disconnect()
      isPlayingRef.current = false
    }, 4000)
  }

  // Tocar alarme: tenta MP3 primeiro, se falhar usa sirene sintetizada
  const playAlarm = () => {
    if (audioElementRef.current) {
      // Recarregar o áudio para garantir que vai tocar
      audioElementRef.current.load()
      
      const playPromise = audioElementRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('MP3 falhou, usando sirene sintetizada:', error)
          playSynthesizedSiren()
        })
      }
    } else {
      playSynthesizedSiren()
    }

    // Vibrar
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([500, 200, 500, 200, 500])
    }
  }

  useEffect(() => {
    if (time === 0 && isRunning) {
      setIsRunning(false)
      playAlarm()
      if (onComplete) onComplete()
    }
  }, [time, isRunning, onComplete])

  // Resto do código igual...
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const setCustomTime = (seconds) => {
    setTime(seconds)
    setInitialTime(seconds)
    setIsRunning(false)
  }

  const testAlarm = () => {
    playAlarm()
  }

  return (
    <div style={{
      background: '#1e1e2e',
      borderRadius: '20px',
      padding: '20px',
      textAlign: 'center',
      margin: '10px 0'
    }}>
      <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '15px', fontFamily: 'monospace' }}>
        {formatTime(time)}
      </div>
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '15px', flexWrap: 'wrap' }}>
        <button onClick={() => setCustomTime(30)} style={buttonStyle('#2a2a3e')}>30s</button>
        <button onClick={() => setCustomTime(60)} style={buttonStyle('#2a2a3e')}>60s</button>
        <button onClick={() => setCustomTime(90)} style={buttonStyle('#2a2a3e')}>90s</button>
        <button onClick={() => setCustomTime(120)} style={buttonStyle('#2a2a3e')}>120s</button>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '10px' }}>
        <button onClick={() => setIsRunning(!isRunning)} style={buttonStyle('#e94560')}>
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        
        <button onClick={() => { setTime(initialTime); setIsRunning(false) }} style={buttonStyle('#2a2a3e')}>
          <RotateCcw size={18} />
          Reset
        </button>

        <button onClick={testAlarm} style={buttonStyle('#e94560')} title="Testar alarme">
          <Volume2 size={18} />
        </button>
      </div>
    </div>
  )
}

const buttonStyle = (bg) => ({
  background: bg,
  border: 'none',
  padding: '12px 20px',
  borderRadius: '30px',
  color: '#fff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontWeight: 'bold'
})