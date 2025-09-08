import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import styles from "./class-dashboard.module.css"

export default function ClassDashboard() {
  const [now, setNow] = useState(new Date())
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const classes = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    title: "KNITTING CLASS",
    img: "/knitting-yarn-skeins.png",
  }))

  const notices = [
    "Today's class is rescheduled at 5:00 pm.",
    "Submit your assignment by Friday.",
    "Guest lecture next Monday at 10:30 am.",
    "Workshop registrations close tomorrow.",
  ]

  const dateStr = now.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })

  const dateShort = now.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" }).toLowerCase()
  const timeShort = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar} aria-label="Sidebar navigation">
        <img src="/saksham logo.png" alt="Saksham Logo" className={styles.brand} />
        <nav className={styles.nav}>
          <Link to="/class-dashboard" className={`${styles.navBtn} ${location.pathname === "/class-dashboard" ? styles.active : ""}`}>
            Dashboard
          </Link>
          <Link
            to="/my-videos"
            className={`${styles.navBtn} ${location.pathname.startsWith("/my-videos") ? styles.active : ""}`}
          >
            My Videos
          </Link>
          <Link
            to="/schedule"
            className={`${styles.navBtn} ${location.pathname.startsWith("/schedule") ? styles.active : ""}`}
          >
            Schedule
          </Link>
          <Link
            to="/chatbox"
            className={`${styles.navBtn} ${location.pathname.startsWith("/chatbox") ? styles.active : ""}`}
          >
            ChatBox
          </Link>
          <Link
            to="/finances"
            className={`${styles.navBtn} ${location.pathname.startsWith("/finances") ? styles.active : ""}`}
          >
            Finances
          </Link>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header} role="banner" aria-label="Page header">
          {/* <div className={styles.brandRow}>
            <span className={styles.siteBrand}>saksham</span>
          </div> */}

          <div className={styles.headingRow}>
            <h1 className={styles.pageTitle}>Dashboard</h1>

          <div className={styles.actionsRight}>
              <div className={styles.dashboardSwitcher}>
                <label htmlFor="dashboard-select" className={styles.dashboardSwitcherLabel}>
                  Select Dashboard:
                </label>
                <select
                  id="dashboard-select"
                  className={styles.dashboardSwitcherSelect}
                  value={location.pathname === '/teacher-dashboard' ? 'teacher' : 'learner'}
                  onChange={(e) => {
                    if (e.target.value === 'teacher') {
                      navigate('/teacher-dashboard');
                    } else {
                      navigate('/student-dashboard');
                    }
                  }}
                >
                <option value="learner">Learner Dashboard</option>
                <option value="teacher">Teacher Dashboard</option>
              </select>
              </div>
              <button className={styles.iconBtn} aria-label="Cart">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6h15l-1.5 8.5H8L6 6Z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                  <circle cx="18" cy="20" r="1.5" fill="currentColor" />
                  <path d="M6 6 5 3H2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <Link to="/profile" className={styles.avatarLink}>
                <div className={styles.avatarCircle} aria-label="User profile">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </Link>
            </div>
          </div>

          <div className={styles.subHeader}>
            <div className={styles.searchWrap}>
              <svg
                className={styles.inlineIcon}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="m21 21-3.5-3.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <input
                className={styles.searchInput}
                type="search"
                placeholder="Search your class"
                aria-label="Search your class"
              />
            </div>

            <div className={styles.datePill} aria-label="Date and time">
              <svg
                className={styles.inlineIcon}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span>{dateShort}</span>
              <svg
                className={styles.inlineIcon}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span>{timeShort}</span>
            </div>
          </div>
        </header>

        <section className={styles.contentGrid}>
          <section className={styles.section} aria-labelledby="my-classes">
            <div className={styles.sectionHead}>
              <h2 id="my-classes">My Classes</h2>
            </div>

            <div className={styles.classesGrid}>
              {classes.map((c) => (
                <article className={styles.classCard} key={c.id}>
                  <img
                    src={c.img || "/placeholder.svg"}
                    alt="Knitting yarn for class thumbnail"
                    className={styles.classImg}
                  />
                  <div className={styles.classBody}>
                    <h3 className={styles.classTitle}>{c.title}</h3>
                    <button className={styles.viewBtn} type="button">
                      View
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className={`${styles.noticeBoard} ${styles.section}`} aria-label="Notice board">
            <div className={styles.sectionHead}>
              <h2>NOTICE BOARD</h2>
              <button className={styles.addBtn} type="button" aria-label="Add notice">
                add +
              </button>
            </div>

            <ul className={styles.noticeList}>
              {notices.map((n, i) => (
                <li className={styles.noticeItem} key={i}>
                  <span className={styles.noticeText}>{n}</span>
                  <button className={styles.editBtn} type="button" aria-label={`Edit notice ${i + 1}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="m3 17.25 9.5-9.5 3.25 3.25-9.5 9.5L3 21l.75-3.75Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path d="M14.5 7 17 4.5 19.5 7 17 9.5 14.5 7Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <button className={styles.fab} type="button" aria-label="Add new class">
        +
        </button>
      </main>
    </div>
  )
}