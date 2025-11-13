import react from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Counter from "./components/LuckyDraw"
import Dashboard from './components/DashBoard';
 

function App() {
 

  return (
    <>
      <Router>
        <Routes>
          <Route path='/counter' element={<Counter />} />
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
