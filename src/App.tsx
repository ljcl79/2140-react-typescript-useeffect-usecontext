import './App.css'
import { FiltrosProvider } from './context/Filtros/FiltrosProvider'
import { TareasProvider } from './context/Tarea/TareaProvider'

import Home from './views/Home'

function App() {

  return (
    <>
      <TareasProvider>
        <FiltrosProvider>
          <Home>

          </Home>
        </FiltrosProvider>
      </TareasProvider>

    </>
  )
}

export default App
