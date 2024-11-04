import { useState } from 'react'
import './index.css'
import IncidentReport from './IncidentReport'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <IncidentReport />
      </div>
    </>
  )
}

export default App
