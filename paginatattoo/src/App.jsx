import './App.css'
import { Routes, Route } from 'react-router-dom'
import Nav from './component/Nav'
import Gallery from './component/Gallery'
import Admin from './component/Admin'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </>
  )
}

export default App
