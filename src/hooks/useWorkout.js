import { useState, useEffect } from 'react'

export function useWorkout() {
  const [activeWorkout, setActiveWorkout] = useState(null)
  const [workoutHistory, setWorkoutHistory] = useState([])

  // Carregar treino ativo do localStorage
  useEffect(() => {
    const savedWorkout = localStorage.getItem('activeWorkout')
    if (savedWorkout) {
      setActiveWorkout(JSON.parse(savedWorkout))
    }

    const savedHistory = localStorage.getItem('workoutHistory')
    if (savedHistory) {
      setWorkoutHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Salvar treino ativo
  useEffect(() => {
    if (activeWorkout) {
      localStorage.setItem('activeWorkout', JSON.stringify(activeWorkout))
    } else {
      localStorage.removeItem('activeWorkout')
    }
  }, [activeWorkout])

  // Iniciar novo treino
  const startWorkout = (exercises) => {
    const newWorkout = {
      id: Date.now(),
      startTime: new Date().toISOString(),
      exercises: exercises.map(ex => ({
        id: ex.id,
        name: ex.name,
        sets: [],
        currentSet: 0,
        completed: false
      }))
    }
    setActiveWorkout(newWorkout)
    return newWorkout
  }

  // Adicionar série
  const addSet = (exerciseId, reps, weight = 0) => {
    if (!activeWorkout) return

    const updatedExercises = activeWorkout.exercises.map(ex => {
      if (ex.id === exerciseId) {
        const newSet = {
          setNumber: ex.sets.length + 1,
          reps: reps,
          weight: weight,
          completedAt: new Date().toISOString()
        }
        return {
          ...ex,
          sets: [...ex.sets, newSet],
          currentSet: ex.sets.length + 1
        }
      }
      return ex
    })

    setActiveWorkout({
      ...activeWorkout,
      exercises: updatedExercises
    })
  }

  // Completar exercício
  const completeExercise = (exerciseId) => {
    const updatedExercises = activeWorkout.exercises.map(ex => {
      if (ex.id === exerciseId) {
        return { ...ex, completed: true }
      }
      return ex
    })

    setActiveWorkout({
      ...activeWorkout,
      exercises: updatedExercises
    })
  }

  // Finalizar treino
  const finishWorkout = () => {
    if (activeWorkout) {
      const completedWorkout = {
        ...activeWorkout,
        endTime: new Date().toISOString(),
        totalExercises: activeWorkout.exercises.filter(ex => ex.completed).length,
        totalSets: activeWorkout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0)
      }
      
      const newHistory = [completedWorkout, ...workoutHistory].slice(0, 20)
      setWorkoutHistory(newHistory)
      localStorage.setItem('workoutHistory', JSON.stringify(newHistory))
      setActiveWorkout(null)
    }
  }

  // Cancelar treino
  const cancelWorkout = () => {
    setActiveWorkout(null)
  }

  return {
    activeWorkout,
    workoutHistory,
    startWorkout,
    addSet,
    completeExercise,
    finishWorkout,
    cancelWorkout
  }
}