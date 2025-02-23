import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Oiii</h1>
      <Button> Testando 1 2 3</Button>
    </>
  )
}

export default App
