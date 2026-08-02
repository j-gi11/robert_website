import { placeholderFill } from '../theme'
import styles from './Placeholder.module.css'

interface PlaceholderProps {
  color?: string
  caption?: string
  width?: string | number
  height?: string | number
}

export default function Placeholder({ color, caption, width = '100%', height = 'auto' }: PlaceholderProps) {
  const fill = placeholderFill(color)

  return (
    <div
      className={styles.placeholder}
      style={{
        background: fill,
        width,
        height,
        aspectRatio: height === 'auto' ? 1 : undefined,
      }}
      aria-hidden="true"
    >
      {caption && <span className={styles.caption}>{caption}</span>}
    </div>
  )
}
