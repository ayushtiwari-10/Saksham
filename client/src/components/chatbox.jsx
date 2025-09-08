import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import styles from "./class-dashboard.module.css"

export default function Chatbox() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const dateShort = now.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" }).toLowerCase()
  const timeShort = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })

  const people = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: "name haha",
    sub: "something and something",
  }))

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <img src="/saksham logo.png" alt="Saksham Logo" className={styles.brand} />
        <nav className={styles.nav}>
          <Link to="/" className={styles.navBtn}>
            Dashboard
          </Link>
          <Link to="/my-videos" className={styles.navBtn}>
            My Videos
          </Link>
          <Link to="/schedule" className={styles.navBtn}>
            Schedule
          </Link>
          <Link to="/chatbox" className={`${styles.navBtn} ${styles.active}`} aria-current="page">
            ChatBox
          </Link>
          <Link to="/finances" className={styles.navBtn}>
            Finances
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          {/* <div className={styles.brandRow}>
            <span className={styles.siteBrand}>saksham</span>
          </div> */}

          <div className={styles.headingRow}>
            <h1 className={styles.pageTitle}>Chatbox</h1>
            <div className={styles.actionsRight}>
              <button className={styles.iconBtn} aria-label="Cart">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6h15l-1.5 8.5H8L6 6Z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                  <circle cx="18" cy="20" r="1.5" fill="currentColor" />
                  <path d="M6 6 5 3H2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <div className={styles.avatarCircle} aria-hidden="true" />
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
              <input className={styles.searchInput} type="search" placeholder="Search your class" />
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

        {/* Chat layout */}
        <div className={styles.chatLayout}>
          <aside className={styles.peoplePanel}>
            <div className={styles.peopleSearch}>
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
              <input className={styles.peopleInput} placeholder="Search your people" />
            </div>

            <ul className={styles.peopleList}>
              {people.map((p) => (
                <li key={p.id} className={styles.peopleItem}>
                  <div className={styles.personAvatar} aria-hidden />
                  <div className={styles.personCopy}>
                    <div className={styles.personName}>{p.name}</div>
                    <div className={styles.personSub}>{p.sub}</div>
                  </div>
                  <span className={styles.infoDot} aria-hidden />
                </li>
              ))}
            </ul>
          </aside>

          <section className={styles.chatPane} aria-label="Chat area">
            <div className={styles.chatToolbar}>
              <div className={styles.personAvatar} aria-hidden />
              <div className={styles.toolbarSpacer} />
              <button className={styles.chatIcon} aria-label="Call">
                📞
              </button>
              <button className={styles.chatIcon} aria-label="Video">
                🎥
              </button>
              <button className={styles.chatIcon} aria-label="More">
                ⋮
              </button>
            </div>

            <div className={styles.chatBody} />

            <div className={styles.chatComposer}>
              <div className={styles.composerField}>
                <input placeholder="Type message here" />
                <div className={styles.composerIcons}>
                  <button aria-label="Emoji">😊</button>
                  <button aria-label="Mic">🎤</button>
                  <button aria-label="Send">➡️</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}