import { motion } from 'framer-motion'
import { categories } from '../data/exercises'

export function FilterBar({ activeCategory, setActiveCategory }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      style={{
        padding: '0 20px 20px 20px',
        overflowX: 'auto',
        display: 'flex',
        gap: '10px',
        scrollbarWidth: 'thin'
      }}
    >
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => setActiveCategory(cat.id)}
          style={{
            padding: '10px 20px',
            borderRadius: '30px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            background: activeCategory === cat.id ? '#e94560' : '#2a2a3e',
            color: '#fff',
            transition: 'all 0.2s',
            transform: activeCategory === cat.id ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          {cat.name}
        </button>
      ))}
    </motion.div>
  )
}