import { motion } from 'framer-motion'
import { Dumbbell, Heart, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Header({ showFavoritesOnly, setShowFavoritesOnly }) {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.body.style.background = '#0f0f1a'
      document.body.style.color = '#ffffff'
    } else {
      document.body.style.background = '#f5f5f5'
      document.body.style.color = '#1a1a2e'
    }
  }, [darkMode])

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="header"
      style={{
        padding: '20px',
        background: darkMode ? '#1a1a2e' : '#ffffff',
        borderRadius: '0 0 30px 30px',
        marginBottom: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Dumbbell size={32} color="#e94560" />
          <div>
            <h1 style={{ fontSize: '24px', margin: 0 }}>Meu Treino</h1>
            <p style={{ fontSize: '12px', opacity: 0.7, margin: 0 }}>Guia de exercícios</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '24px'
            }}
          >
            <Heart 
              size={24} 
              color={showFavoritesOnly ? '#e94560' : (darkMode ? '#fff' : '#666')}
              fill={showFavoritesOnly ? '#e94560' : 'none'}
            />
          </button>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {darkMode ? <Sun size={24} color="#fff" /> : <Moon size={24} color="#1a1a2e" />}
          </button>
        </div>
      </div>
    </motion.header>
  )
}