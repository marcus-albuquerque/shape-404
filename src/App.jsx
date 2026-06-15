import { useState, useMemo } from 'react'
import { exercises } from './data/exercises'
import { useFavorites } from './hooks/useFavorites'
import { Header } from './components/Header'
import { FilterBar } from './components/FilterBar'
import { SearchBar } from './components/SearchBar'
import { ExerciseCard } from './components/ExerciseCard'
import { motion, AnimatePresence } from 'framer-motion'
import { useWorkout } from './hooks/useWorkout'
import { Timer } from './components/Timer'
import { SetCounter } from './components/SetCounter'
import { Play, CheckCircle, XCircle } from 'lucide-react'
import { WorkoutSelector } from './components/WorkoutSelector'
import { ActiveWorkout } from './components/ActiveWorkout'
import { AudioActivator } from './components/AudioActivator'

function App() {
  const [activeCategory, setActiveCategory] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const { activeWorkout, startWorkout, addSet, completeExercise, finishWorkout, cancelWorkout } = useWorkout()
  const [showWorkoutSelector, setShowWorkoutSelector] = useState(false)

  // Filtrar exercícios
  const filteredExercises = useMemo(() => {
    let filtered = exercises

    // Filtrar por categoria
    if (activeCategory !== 'todos') {
      filtered = filtered.filter(ex => ex.category === activeCategory)
    }

    // Filtrar por favoritos
    if (showFavoritesOnly) {
      filtered = filtered.filter(ex => favorites.includes(ex.id))
    }

    // Filtrar por busca
    if (searchTerm) {
      filtered = filtered.filter(ex => 
        ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [activeCategory, searchTerm, showFavoritesOnly, favorites])

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', minHeight: '100vh' }}>
      <Header 
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
      />
      
      <FilterBar 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div style={{ padding: '0 0 40px 0' }}>
        {filteredExercises.length === 0 ? (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', color: '#888', padding: '40px' }}
          >
            Nenhum exercício encontrado 😕
          </motion.p>
        ) : (
          <AnimatePresence>
            {filteredExercises.map(exercise => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                isFavorite={isFavorite(exercise.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
      {/* Botão de iniciar treino */}
{!activeWorkout && (
  <button
    onClick={() => setShowWorkoutSelector(true)}
    style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '60px',
      height: '60px',
      borderRadius: '30px',
      background: '#e94560',
      border: 'none',
      color: '#fff',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(233,69,96,0.4)',
      zIndex: 100
    }}
  >
    <Play size={24} />
  </button>
)}

{/* Modal de seleção */}
{showWorkoutSelector && (
  <WorkoutSelector
    exercises={exercises}
    favorites={favorites}  // <-- ADICIONE ESTA LINHA
    onStart={startWorkout}
    onClose={() => setShowWorkoutSelector(false)}
  />
)}

{/* Treino ativo */}
{activeWorkout && (
  <ActiveWorkout
    workout={activeWorkout}
    onAddSet={addSet}
    onCompleteExercise={completeExercise}
    onFinish={finishWorkout}
    onCancel={cancelWorkout}
  />
)}
{/* Ativador de áudio - aparece no início */}
<AudioActivator />
    </div>
  )
}

export default App