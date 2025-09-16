import { useRef } from "react"
import "../styles/CoursesSection.css"

const CoursesSection = () => {
  const scrollRef = useRef(null)

  const courses = [
    { id: 1, title: "Knitting", image: "/knitting-yarn-balls-colorful.png", category: "Handicrafts" },
    { id: 2, title: "Cooking", image: "/cooking-kitchen-utensils.png", category: "Culinary" },
    { id: 3, title: "Embroidery", image: "/embroidery-thread-colorful.png", category: "Handicrafts" },
    { id: 4, title: "Gardening", image: "/gardening-plants-flowers.png", category: "Lifestyle" },
    { id: 5, title: "Painting", image: "/painting-art-brushes-colors.png", category: "Arts" },
  ]

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const newScroll =
        direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth
      scrollRef.current.scrollTo({ left: newScroll, behavior: "smooth" })
    }
  }

  return (
    <section id="top-courses" className="courses-section section">
      <div className="container">
        <h2 className="section-title">Browse Our Top Courses</h2>
        <p className="section-subtitle">
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el
          texto de relleno estándar de las industrias desde el año 1500, cuando un impresor
        </p>

        <div className="carousel-wrapper">
          <button className="nav prev" onClick={() => scroll("left")}>&#8249;</button>
          <div className="courses-scroll" ref={scrollRef}>
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-image">
                  <img src={course.image || "/placeholder.svg"} alt={course.title} />
                </div>
                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  <button className="btn course-btn">View</button>
                </div>
              </div>
            ))}
          </div>
          <button className="nav next" onClick={() => scroll("right")}>&#8250;</button>
        </div>

        <div className="courses-actions">
          <button className="btn view-all-btn">View All</button>
        </div>
      </div>
    </section>
  )
}

export default CoursesSection
