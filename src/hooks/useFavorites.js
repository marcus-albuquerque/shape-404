import { useState, useEffect } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState([])

  // Carregar favoritos do localStorage ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem('favorites')
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (exerciseId) => {
    setFavorites(prev => 
      prev.includes(exerciseId)
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    )
  }

  const isFavorite = (exerciseId) => favorites.includes(exerciseId)

  return { favorites, toggleFavorite, isFavorite }
}