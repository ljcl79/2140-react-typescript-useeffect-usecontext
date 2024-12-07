import './App.css'
import { TareasProvider } from './context/TareaContex'

import Home from './views/Home'

function App() {

  return (
    <>
      <TareasProvider>
        <Home>

        </Home>
      </TareasProvider>

    </>
  )
}

export default App
