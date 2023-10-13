import './App.css'
import Cell from './components/Cell'
import Board from './components/Board'

function App() {
  return (
    <Board rows={9} cols={9} bombs={10} />
  )
}

export default App
