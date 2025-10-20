import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import OnlineConsult from './components/OnlineConsult.jsx'
import Reviews from './components/Reviews.jsx'
import Appointment from './components/Appointment.jsx'
import Payment from './components/Payment.jsx'
import Admin from './components/Admin/Admin.jsx'
import Footer from './components/Footer.jsx'
import { SERVICES } from './config/constants.js'
import { getServicesPrices } from './utils/storage.js'

function App() {
  useEffect(() => {
    // Load prices from localStorage on mount
    const savedPrices = getServicesPrices()
    if (savedPrices) {
      SERVICES.offline_primary.price = savedPrices.p1
      SERVICES.offline_follow.price = savedPrices.p2
      SERVICES.online_consult.price = savedPrices.p3
    }
  }, [])

  return (
    <div className="App">
      <Header />
      <main className="container">
        <Hero />
        <About />
        <Services />
        <OnlineConsult />
        <Reviews />
        <Appointment />
        <Payment />
        <Admin />
      </main>
      <Footer />
    </div>
  )
}

export default App
