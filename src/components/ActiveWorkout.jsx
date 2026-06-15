import { SetCounter } from './SetCounter'
import { XCircle, CheckCircle } from 'lucide-react'

export function ActiveWorkout({ workout, onAddSet, onCompleteExercise, onFinish, onCancel }) {
  const completedCount = workout.exercises.filter(ex => ex.completed).length
  const totalCount = workout.exercises.length

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#0f0f1a',
      zIndex: 1000,
      overflowY: 'auto',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          padding: '15px',
          background: '#1e1e2e',
          borderRadius: '15px'
        }}>
          <div>
            <h2>Treino em andamento</h2>
            <p>Progresso: {completedCount}/{totalCount}</p>
          </div>
          <button
            onClick={onCancel}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <XCircle size={28} color="#e94560" />
          </button>
        </div>

        {workout.exercises.map(exercise => (
          <div key={exercise.id} style={{
            background: '#1e1e2e',
            borderRadius: '15px',
            padding: '15px',
            marginBottom: '15px',
            opacity: exercise.completed ? 0.7 : 1
          }}>
            <h3 style={{ color: '#e94560', marginBottom: '10px' }}>
              {exercise.name}
              {exercise.completed && <CheckCircle size={18} color="#4caf50" style={{ marginLeft: '10px', display: 'inline' }} />}
            </h3>
            
            <SetCounter
              exercise={exercise}
              onAddSet={onAddSet}
              onComplete={onCompleteExercise}
              isCompleted={exercise.completed}
            />
          </div>
        ))}

        {completedCount === totalCount && totalCount > 0 && (
          <button
            onClick={onFinish}
            style={{
              width: '100%',
              padding: '15px',
              background: '#4caf50',
              border: 'none',
              borderRadius: '15px',
              color: '#fff',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Finalizar Treino 🎉
          </button>
        )}
      </div>
    </div>
  )
}