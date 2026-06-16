import './App.css'
import { Routes, Route } from 'react-router-dom'
import Nav from './component/Nav'
import Admin from './component/Admin'
import Home from './component/Home'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </>
  )
}

export default App
