import react from 'react'
import './App.css'
import { Routes, Route} from 'react-router-dom';
import Counter from "./components/LuckyDraw"
import Dashboard from './components/DashBoard';
import EventForm from './components/EventForm';
import Navbar from './components/Navbar';
import Home from './page/Home';
import About from './page/About';
import Contact from './page/Contact';
import Footer from './components/Footer';
import VotingPage from './Voting/VotingPage';
 

function App() {
 

  return (
    <> 
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/counter' element={<Counter />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/event-form' element={<EventForm />} /> 
          <Route path='voting-system' element={<VotingPage />} />
        </Routes>
        <Footer/>
    </>
  )
}

export default App
