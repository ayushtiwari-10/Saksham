import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import styles from "./class-dashboard.module.css"

export default function MyVideos() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const dateShort = now.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" }).toLowerCase()
  const timeShort = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })

  const videos = Array.from({ length: 9 }).map((_, i) => ({
    id: i + 1,
    title: "Knitting",
    img: "/knitting-yarn-skeins.png",
    progress: 20 + ((i * 9) % 60), // 20–79%
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
          <Link to="/my-videos" className={`${styles.navBtn} ${styles.active}`} aria-current="page">
            My Videos
          </Link>
          <Link to="/schedule" className={styles.navBtn}>
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

      {/* Main */}
      <main className={styles.main}>
        {/* Header (same structure as dashboard) */}
        <header className={styles.header} role="banner" aria-label="Page header">
          {/* <div className={styles.brandRow}>
            <span className={styles.siteBrand}>saksham</span>
          </div> */}

          <div className={styles.headingRow}>
            <h1 className={styles.pageTitle}>My Videos</h1>
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

        {/* Tabs */}
        <div className={styles.tabs}>
          <button className={`${styles.tabBtn} ${styles.tabActive}`}>Library</button>
          <button className={styles.tabBtn} aria-disabled>
            Create
          </button>
        </div>

        {/* Video grid */}
        <div className={styles.videoGrid}>
          {videos.map((v) => (
            <article key={v.id} className={styles.videoCard}>
              <img src={v.img || "/placeholder.svg"} alt="Course thumbnail" className={styles.classImg} />
              <div className={styles.videoBody}>
                <div className={styles.videoMeta}>
                  <span className={styles.videoTitle}>{v.title}</span>
                  <span className={styles.videoPct}>{v.progress}%</span>
                </div>
                <div className={styles.progressTrack} aria-label={`Progress ${v.progress}%`}>
                  <div className={styles.progressBar} style={{ width: `${v.progress}%` }} />
                </div>
                <button className={styles.viewBtn}>Continue</button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}