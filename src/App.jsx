import react from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Counter from "./components/LuckyDraw"
import Dashboard from './components/DashBoard';
import EventForm from './components/EventForm';
 

function App() {
 

  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/counter' element={<Counter />} /> */}
          <Route path='/' element={<Dashboard />} />
          <Route path='/event-form' element={<EventForm />} /> 
        </Routes>
      </Router>
    </>
  )
}

export default App
