"use client"

import { useState } from "react"
import "../styles/FAQSection.css"

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqs = [
    {
      id: 1,
      question: "How do I start teaching on the platform?",
      answer:
        "Simply sign up, complete your profile, and create your first course. Our team will review and approve your content within 24 hours.",
    },
    {
      id: 2,
      question: "What skills can I learn here?",
      answer:
        "We offer a wide range of skills including handicrafts, cooking, gardening, arts, technology, and many more practical skills for everyday life.",
    },
    {
      id: 3,
      question: "How does the barter system work?",
      answer:
        "You can exchange your skills with other users without money. For example, teach cooking in exchange for learning embroidery.",
    },
    {
      id: 4,
      question: "Is there any fee to join?",
      answer:
        "Basic membership is completely free. Premium features are available with affordable monthly plans starting from ₹99.",
    },
    {
      id: 5,
      question: "How do I get paid for teaching?",
      answer:
        "We offer multiple payment options including direct bank transfer, UPI, and digital wallets. Payments are processed weekly.",
    },
  ]

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <section id="faq" className="faq-section section">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>

        <div className="faq-list">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-item">
              <button className="faq-question" onClick={() => toggleFAQ(faq.id)}>
                <span>{faq.question}</span>
                <span className={`faq-arrow ${openFAQ === faq.id ? "open" : ""}`}>›</span>
              </button>
              {openFAQ === faq.id && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
