import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ChevronDown, ChevronUp } from 'lucide-react'

export function ExerciseCard({ exercise, isFavorite, onToggleFavorite }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      style={{
        background: '#1e1e2e',
        borderRadius: '20px',
        padding: '18px',
        margin: '10px 20px',
        cursor: 'pointer'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: '#e94560', marginBottom: '5px' }}>{exercise.name}</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              background: '#2a2a3e',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px'
            }}>
              {exercise.difficulty}
            </span>
            <span style={{
              background: '#2a2a3e',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px'
            }}>
              {exercise.equipment}
            </span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(exercise.id)
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Heart 
              size={24} 
              color={isFavorite ? '#e94560' : '#888'}
              fill={isFavorite ? '#e94560' : 'none'}
            />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              setExpanded(!expanded)
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#888'
            }}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginTop: '15px', overflow: 'hidden' }}
          >
            <p style={{ marginBottom: '10px', lineHeight: 1.5 }}>{exercise.description}</p>
            
            <div style={{ marginBottom: '10px' }}>
              <strong>Músculos envolvidos:</strong>
              <ul style={{ marginTop: '5px', marginLeft: '20px' }}>
                {exercise.muscles.map(m => <li key={m}>{m}</li>)}
              </ul>
            </div>
            
            <div>
              <strong>Dicas:</strong>
              <ul style={{ marginTop: '5px', marginLeft: '20px' }}>
                {exercise.tips.map(tip => <li key={tip}>{tip}</li>)}
              </ul>
            </div>

            {exercise.videoUrl && (
              <div style={{ marginTop: '15px' }}>
                <a 
                  href={exercise.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#e94560',
                    textDecoration: 'none',
                    display: 'inline-block',
                    padding: '8px 16px',
                    background: '#2a2a3e',
                    borderRadius: '20px',
                    fontSize: '14px'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  📺 Ver vídeo demonstrativo
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}