import { useState } from 'react'
import { CheckCircle, Circle, Clock } from 'lucide-react'
import { Timer } from './Timer'

export function SetCounter({ exercise, onAddSet, onComplete, isCompleted }) {
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')
  const [showTimer, setShowTimer] = useState(false)
  const [waitingForNextSet, setWaitingForNextSet] = useState(false)

  const handleAddSet = () => {
    if (reps && reps > 0) {
      onAddSet(exercise.id, parseInt(reps), parseFloat(weight) || 0)
      setReps('')
      setWeight('')
      setWaitingForNextSet(true)
      setShowTimer(true)
    }
  }

  const handleTimerComplete = () => {
    setWaitingForNextSet(false)
    setShowTimer(false)
  }

  const handleComplete = () => {
    onComplete(exercise.id)
  }

  return (
    <div style={{ marginTop: '15px' }}>
      {/* Séries já realizadas */}
      {exercise.sets && exercise.sets.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <strong>Séries realizadas:</strong>
          {exercise.sets.map((set, idx) => (
            <div key={idx} style={{
              background: '#2a2a3e',
              padding: '8px',
              borderRadius: '10px',
              marginTop: '5px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>Série {set.setNumber}</span>
              <span>{set.reps} reps</span>
              {set.weight > 0 && <span>{set.weight} kg</span>}
              <CheckCircle size={16} color="#4caf50" />
            </div>
          ))}
        </div>
      )}

      {/* Próxima série (se não completou o exercício) */}
      {!isCompleted && !waitingForNextSet && (
        <div style={{
          background: '#2a2a3e',
          padding: '15px',
          borderRadius: '15px',
          marginTop: '10px'
        }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>Próxima série: {exercise.sets.length + 1}</strong>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="number"
              placeholder="Repetições"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                background: '#1e1e2e',
                color: '#fff'
              }}
            />
            <input
              type="number"
              placeholder="Peso (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                background: '#1e1e2e',
                color: '#fff'
              }}
            />
          </div>
          
          <button
            onClick={handleAddSet}
            disabled={!reps}
            style={{
              width: '100%',
              padding: '10px',
              background: reps ? '#e94560' : '#555',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              cursor: reps ? 'pointer' : 'not-allowed',
              marginBottom: '10px'
            }}
          >
            Registrar série {exercise.sets.length + 1}
          </button>
        </div>
      )}

      {/* Timer de descanso */}
      {showTimer && waitingForNextSet && (
        <div style={{ marginTop: '10px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px',
            color: '#e94560'
          }}>
            <Clock size={18} />
            <strong>Tempo de descanso</strong>
          </div>
          <Timer onComplete={handleTimerComplete} />
        </div>
      )}

      {/* Botão de completar exercício */}
      {!isCompleted && exercise.sets.length > 0 && !waitingForNextSet && (
        <button
          onClick={handleComplete}
          style={{
            width: '100%',
            padding: '10px',
            background: '#4caf50',
            border: 'none',
            borderRadius: '10px',
            color: '#fff',
            cursor: 'pointer',
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle size={18} />
          Finalizar exercício
        </button>
      )}

      {isCompleted && (
        <div style={{
          background: '#4caf50',
          padding: '10px',
          borderRadius: '10px',
          textAlign: 'center',
          marginTop: '10px'
        }}>
          ✅ Exercício concluído!
        </div>
      )}
    </div>
  )
}