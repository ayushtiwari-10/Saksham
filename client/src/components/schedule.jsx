import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import styles from "./class-dashboard.module.css"

export default function Schedule() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const dateShort = now.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" }).toLowerCase()
  const timeShort = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu"]
  const events = [
    { id: 1, dayIndex: 0, start: 2, end: 4, title: "Morning Stand-up" },
    { id: 2, dayIndex: 1, start: 4, end: 6, title: "Financial Audit" },
    { id: 3, dayIndex: 2, start: 3, end: 5, title: "Coffee Chat" },
    { id: 4, dayIndex: 3, start: 6, end: 8, title: "Design Review" },
    { id: 5, dayIndex: 4, start: 5, end: 7, title: "Client Workshop" },
  ]

  const monthDays = [
    "",
    "",
    "",
    "",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ]

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <img src="/saksham logo.png" alt="Saksham Logo" className={styles.brand} />
        <nav className={styles.nav}>
          <Link to="/" className={styles.navBtn}>
            Dashboard
          </Link>
          <Link to="/my-videos" className={styles.navBtn}>
            My Videos
          </Link>
          <Link to="/schedule" className={`${styles.navBtn} ${styles.active}`} aria-current="page">
            Schedule
          </Link>
          <Link to="/chatbox" className={styles.navBtn}>
            ChatBox
          </Link>
          <Link to="/finances" className={styles.navBtn}>
            Finances
          </Link>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          {/* <div className={styles.brandRow}>
            <span className={styles.siteBrand}>saksham</span>
          </div> */}

          <div className={styles.headingRow}>
            <h1 className={styles.pageTitle}>Schedule</h1>
            <div className={styles.actionsRight}>
              <button className={styles.iconBtn} aria-label="Cart">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6h15l-1.5 8.5H8L6 6Z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                  <circle cx="18" cy="20" r="1.5" fill="currentColor" />
                  <path d="M6 6 5 3H2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <div className={styles.avatarCircle} />
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

            <div className={styles.datePill}>
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

        <section className={styles.scheduleLayout}>
          <aside className={styles.monthCard} aria-label="Mini month calendar">
            <div className={styles.monthHead}>
              <button className={styles.monthNav} aria-label="Previous month">
                ‹
              </button>
              <div className={styles.monthTitle}>October 2021</div>
              <button className={styles.monthNav} aria-label="Next month">
                ›
              </button>
            </div>

            <div className={styles.weekDaysRow}>
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <div key={d} className={styles.weekDay}>
                  {d}
                </div>
              ))}
            </div>

            <div className={styles.monthGrid}>
              {monthDays.map((n, i) => {
                const isSelected = n === 17
                return (
                  <div key={i} className={`${styles.dayCell} ${isSelected ? styles.daySelected : ""}`}>
                    {n || ""}
                  </div>
                )
              })}
            </div>

            <div className={styles.sideCards}>
              <button className={styles.sideCardBtn}>Todays Tasks/Classes</button>
              <button className={styles.sideCardBtnSecondary}>Edit your Calendar</button>
            </div>
          </aside>

          <div className={styles.scheduleMain}>
            <div className={styles.schedControls}>
              <div className={styles.controlLeft}>
                <button className={styles.todayBtn}>Today</button>
              </div>
              <div className={styles.segmented}>
                <button className={`${styles.segBtn} ${styles.segActive}`}>Day</button>
                <button className={styles.segBtn}>Week</button>
                <button className={styles.segBtn}>Month</button>
                <button className={styles.segBtn}>Year</button>
              </div>
            </div>

            <div className={styles.weekGrid} role="table" aria-label="Week view">
              <div className={`${styles.timeCol} ${styles.headerCell}`}></div>
              {weekDays.map((d) => (
                <div key={d} className={`${styles.headerCell} ${styles.dayHeader}`}>
                  {d}
                </div>
              ))}

              {Array.from({ length: 9 }).map((_, r) => (
                <div key={`t-${r}`} className={styles.timeLabel} style={{ gridRow: r + 2 }}>
                  {8 + r}:00
                </div>
              ))}

              {events.map((ev) => (
                <div
                  key={ev.id}
                  className={styles.eventCard}
                  style={{
                    gridColumn: ev.dayIndex + 2,
                    gridRow: `${ev.start + 1} / ${ev.end + 1}`,
                  }}
                >
                  {ev.title}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}