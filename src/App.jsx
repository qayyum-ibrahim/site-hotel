import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Rooms from './pages/Rooms.jsx'
import RoomDetail from './pages/RoomDetail.jsx'
import Facilities from './pages/Facilities.jsx'
import Dining from './pages/Dining.jsx'
import Offers from './pages/Offers.jsx'
import Book from './pages/Book.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
