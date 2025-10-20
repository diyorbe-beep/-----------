import React from 'react'

const Reviews = () => {
  const reviews = [
    {
      text: "Doktor juda e'tiborli, hammasini tushuntirib berdi.",
      author: "Dilorom A."
    },
    {
      text: "Navbat tez, davolash samarali bo'ldi. Tavsiya qilaman!",
      author: "Behruz K."
    },
    {
      text: "Bolamni tekshirtirdik, juda mamnunmiz.",
      author: "Saida R."
    }
  ]

  return (
    <section id="reviews" className="card" style={{ marginTop: '18px' }}>
      <h2>Bemorlar fikri</h2>
      <div className="grid-3">
        {reviews.map((review, index) => (
          <div key={index} className="card">
            <p>
              "{review.text}"
              <br />
              <span className="muted">— {review.author}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Reviews

