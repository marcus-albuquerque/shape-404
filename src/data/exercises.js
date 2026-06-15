export const exercises = [
  {
    id: 1,
    name: 'Supino Reto',
    category: 'peito',
    muscles: ['Peitoral maior', 'Tríceps', 'Deltoide anterior'],
    equipment: 'Barra + banco',
    difficulty: 'Intermediário',
    description: 'Deite no banco com os pés no chão. Segure a barra com as mãos um pouco mais abertas que a largura dos ombros. Desça a barra até tocar o peito e suba com força.',
    tips: ['Mantenha as escápulas encolhidas', 'Não tire as costas do banco', 'Expire ao subir'],
    videoUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg'
  },
  {
    id: 2,
    name: 'Crucifixo',
    category: 'peito',
    muscles: ['Peitoral maior'],
    equipment: 'Halteres + banco',
    difficulty: 'Iniciante',
    description: 'Deitado no banco com halteres, braços abertos com leve flexão. Mantenha os cotovelos levemente flexionados e junte os halteres em cima do peito.',
    tips: ['Controle na descida', 'Não estique demais os braços'],
    videoUrl: 'https://www.youtube.com/embed/CCJ7O6FqU_g'
  },
  {
    id: 3,
    name: 'Puxada Frontal',
    category: 'costas',
    muscles: ['Latíssimo do dorso', 'Trapézio', 'Bíceps'],
    equipment: 'Polia + barra',
    difficulty: 'Iniciante',
    description: 'Sentado no banco, segure a barra com pegada aberta. Puxe até a altura do peito, contraindo as costas. Suba devagar e controlado.',
    tips: ['Mantenha as costas retas', 'Não balance o tronco', 'Solte devagar'],
    videoUrl: 'https://www.youtube.com/embed/CAwf7a6_2LI'
  },
  {
    id: 4,
    name: 'Remada Curvada',
    category: 'costas',
    muscles: ['Latíssimo', 'Trapézio', 'Romboides'],
    equipment: 'Barra',
    difficulty: 'Intermediário',
    description: 'Com a barra nas mãos, incline o tronco cerca de 45 graus. Puxe a barra em direção ao abdômen, mantendo as costas retas.',
    tips: ['Mantenha a coluna reta', 'Evite usar impulso', 'Contração no final'],
    videoUrl: 'https://www.youtube.com/embed/9v7Iq8ItC_U'
  },
  {
    id: 5,
    name: 'Agachamento Livre',
    category: 'pernas',
    muscles: ['Quadríceps', 'Glúteos', 'Posterior da coxa'],
    equipment: 'Barra + suporte',
    difficulty: 'Intermediário',
    description: 'Com a barra apoiada no trapézio, desça como se fosse sentar. Mantenha a coluna reta e os pés apoiados no chão.',
    tips: ['Desça até 90 graus', 'Joelhos alinhados com os pés', 'Olhar para frente'],
    videoUrl: 'https://www.youtube.com/embed/r4MzxtBKyqE'
  },
  {
    id: 6,
    name: 'Leg Press 45°',
    category: 'pernas',
    muscles: ['Quadríceps', 'Glúteos', 'Posterior'],
    equipment: 'Máquina Leg Press',
    difficulty: 'Iniciante',
    description: 'Sentado na máquina, empurre a plataforma com os pés afastados na largura dos ombros. Desça até o ângulo de 90 graus.',
    tips: ['Não trave os joelhos', 'Mantenha a lombar no banco'],
    videoUrl: 'https://www.youtube.com/embed/IZxyjW7UJN0'
  },
  {
    id: 7,
    name: 'Desenvolvimento com Halteres',
    category: 'ombros',
    muscles: ['Deltoide anterior', 'Deltoide lateral', 'Trapézio'],
    equipment: 'Halteres + banco',
    difficulty: 'Iniciante',
    description: 'Sentado, com halteres ao lado dos ombros. Eleve os braços até estender completamente acima da cabeça.',
    tips: ['Mantenha a coluna reta', 'Desça controlado'],
    videoUrl: 'https://www.youtube.com/embed/qthDV9y6tMU'
  },
  {
    id: 8,
    name: 'Elevação Lateral',
    category: 'ombros',
    muscles: ['Deltoide lateral'],
    equipment: 'Halteres',
    difficulty: 'Iniciante',
    description: 'Em pé, com halteres nas mãos. Eleve os braços lateralmente até a altura dos ombros, mantendo leve flexão.',
    tips: ['Use carga leve', 'Controle na descida', 'Não use impulso'],
    videoUrl: 'https://www.youtube.com/embed/3VcKaXpzqH4'
  }
]

export const categories = [
  { id: 'todos', name: 'Todos', icon: 'all' },
  { id: 'peito', name: 'Peito', icon: 'chest' },
  { id: 'costas', name: 'Costas', icon: 'back' },
  { id: 'pernas', name: 'Pernas', icon: 'legs' },
  { id: 'ombros', name: 'Ombros', icon: 'shoulders' }
]