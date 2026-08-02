import { site } from '../data/site'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.wordmark}>{site.name}</span>
        </div>
        <div className={styles.right}>
          <a href={site.emailHref} className={styles.link}>
            {site.email}
          </a>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {site.instagram.display}
          </a>
          <span className={styles.location}>{site.location}</span>
        </div>
      </div>
    </footer>
  )
}
