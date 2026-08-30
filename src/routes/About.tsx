import InstagramIcon from '@mui/icons-material/Instagram'
import { site } from '../data/site'
import { imageUrls } from '../data/images'
import Image from '../components/Image'
import BookingForm from '../components/BookingForm'
import PageImageGate from '../components/PageImageGate'
import styles from './About.module.css'

const ABOUT_IMAGES = imageUrls('about')

export default function About() {
  return (
    <PageImageGate images={ABOUT_IMAGES}>
    <main className={styles.about}>
      <div className={styles.topHalf}>
        <div className={styles.container}>
          <div className={styles.portrait}>
            <Image folder="about" slug="portrait" alt="Robert Ross Harburda" height="100%" />
          </div>

          <div className={styles.copy}>
            <span className={styles.eyebrow}>ABOUT</span>
            <h1 className={styles.heading}>{site.shortName}</h1>

            <p className={styles.paragraph}>
              Robert Ross Recording is a one man army run by (me!) Robert Ross Harburda, but I
              prefer to be called by my middle name Ross. Currently, I am working out of NYC, at
              the world famous jazz club Birdland.
            </p>

            <p className={styles.paragraph}>
              Whether it's classical orchestras, big band jazz, all the way to your local DIY house
              shows my expertise can help all production sizes and budgets. With studio recording
              and production, I specialize with jazz, RnB, indie, &amp; pop music. As an artist,
              you can hear me play guitar, piano, bass, and trumpet over a variety of genres.
            </p>

            <p className={styles.paragraph}>
              I've done it all and would love to support your artistic projects. If you would like
              to enlist my services please contact me using the form below and I look forward to
              discussing your ambitions!
            </p>

            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={styles.instagramButton}>
              <InstagramIcon fontSize="inherit" />
              <span>{site.instagram.display}</span>
            </a>
          </div>
        </div>
      </div>

      <BookingForm />
    </main>
    </PageImageGate>
  )
}
