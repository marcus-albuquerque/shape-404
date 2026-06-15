import { Search } from 'lucide-react'

export function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div style={{ padding: '0 20px 20px 20px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#2a2a3e',
        borderRadius: '30px',
        padding: '10px 20px',
        gap: '10px'
      }}>
        <Search size={20} color="#888" />
        <input
          type="text"
          placeholder="Pesquisar exercício..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '16px',
            width: '100%',
            outline: 'none'
          }}
        />
      </div>
    </div>
  )
}