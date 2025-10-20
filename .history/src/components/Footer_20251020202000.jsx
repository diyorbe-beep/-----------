import React from 'react'
import { scrollToTop } from '../utils/helpers.js'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <section className="footer container">
      <div className="grid-2">
        <div>
          © {currentYear} Dr. Qalandarov Dilmurodjon Madaminovich. Barcha huquqlar himoyalangan.
          <br />
          <span className="muted">Sayt: Abdulloxon & "Bob" ishlab chiqdi.</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <a href="#top" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
            Yuqoriga ↑
          </a>
        </div>
      </div>
    </section>
  )
}

export default Footer

