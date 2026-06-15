import { useState } from 'react'
import { X, Star } from 'lucide-react'

export function WorkoutSelector({ exercises, favorites, onStart, onClose }) {
  const [selectedExercises, setSelectedExercises] = useState([])

  // Filtrar apenas os exercícios favoritados
  const favoriteExercises = exercises.filter(ex => favorites.includes(ex.id))

  const toggleExercise = (exercise) => {
    setSelectedExercises(prev => 
      prev.find(e => e.id === exercise.id)
        ? prev.filter(e => e.id !== exercise.id)
        : [...prev, exercise]
    )
  }

  // Se não houver favoritos, mostra mensagem
  if (favoriteExercises.length === 0) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.95)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '400px',
          background: '#1e1e2e',
          borderRadius: '20px',
          padding: '30px',
          textAlign: 'center'
        }}>
          <Star size={48} color="#e94560" style={{ marginBottom: '20px' }} />
          <h2>Nenhum favorito ainda</h2>
          <p style={{ marginTop: '10px', marginBottom: '20px', opacity: 0.8 }}>
            Clique no coração ❤️ dos exercícios que você mais faz para adicioná-los aos favoritos.
          </p>
          <button
            onClick={onClose}
            style={{
              padding: '10px 30px',
              background: '#e94560',
              border: 'none',
              borderRadius: '30px',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Fechar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.95)',
      zIndex: 1000,
      overflowY: 'auto',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: '#1e1e2e',
        borderRadius: '20px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2>Selecione os exercícios</h2>
            <p style={{ fontSize: '14px', opacity: 0.7, marginTop: '5px' }}>
              💪 Mostrando apenas seus {favoriteExercises.length} exercícios favoritos
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} color="#fff" />
          </button>
        </div>

        {favoriteExercises.map(ex => (
          <div
            key={ex.id}
            onClick={() => toggleExercise(ex)}
            style={{
              padding: '15px',
              marginBottom: '10px',
              background: selectedExercises.find(e => e.id === ex.id) ? '#e94560' : '#2a2a3e',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <strong>{ex.name}</strong>
              <p style={{ fontSize: '12px', opacity: 0.8 }}>{ex.category}</p>
            </div>
            {selectedExercises.find(e => e.id === ex.id) && (
              <span style={{ fontSize: '20px' }}>✓</span>
            )}
          </div>
        ))}

        <button
          onClick={() => {
            onStart(selectedExercises)
            onClose()
          }}
          disabled={selectedExercises.length === 0}
          style={{
            width: '100%',
            padding: '15px',
            background: selectedExercises.length > 0 ? '#4caf50' : '#555',
            border: 'none',
            borderRadius: '10px',
            color: '#fff',
            cursor: selectedExercises.length > 0 ? 'pointer' : 'not-allowed',
            marginTop: '20px',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          Iniciar Treino ({selectedExercises.length} exercícios)
        </button>
      </div>
    </div>
  )
}