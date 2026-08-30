import { ReactNode } from 'react'
import { useImagesReady } from '../hooks/useImagesReady'
import styles from './PageImageGate.module.css'

interface PageImageGateProps {
  /** Every image URL this page needs on screen before it reveals itself. */
  images: string[]
  children: ReactNode
}

/**
 * Keeps the page mounted throughout — its own effects (IntersectionObserver,
 * timers, ref callbacks) need to attach to real elements right away — and
 * just holds it invisible until every photo has preloaded, then fades it in.
 * That avoids the pop-in without breaking any behaviour that depends on the
 * content actually being in the DOM from the start.
 */
export default function PageImageGate({ images, children }: PageImageGateProps) {
  const ready = useImagesReady(images)

  return (
    <div className={ready ? styles.revealed : styles.hidden} aria-hidden={!ready}>
      {children}
    </div>
  )
}
