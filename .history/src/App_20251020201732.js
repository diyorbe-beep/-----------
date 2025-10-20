import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import OnlineConsult from './components/OnlineConsult'
import Reviews from './components/Reviews'
import Appointment from './components/Appointment'
import Payment from './components/Payment'
import Admin from './components/Admin/Admin'
import Footer from './components/Footer'
import { SERVICES } from './config/constants'
import { getServicesPrices } from './utils/storage'

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

