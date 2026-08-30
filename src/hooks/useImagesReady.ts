import { useEffect, useState } from 'react'

/**
 * Safety valve — if some image never fires load/error (flaky connection,
 * ad blocker, whatever), reveal the page anyway rather than hang forever.
 */
const FALLBACK_MS = 6000

/**
 * True once every URL has loaded (or failed) into the browser cache, so a
 * page can preload its photos and reveal itself only once they'll paint
 * instantly — no pop-in as each `<img>` finishes over the network.
 */
export function useImagesReady(urls: string[]): boolean {
  const key = urls.join('|')
  const [ready, setReady] = useState(urls.length === 0)

  useEffect(() => {
    if (urls.length === 0) {
      setReady(true)
      return
    }

    setReady(false)
    let cancelled = false
    let remaining = urls.length

    const settle = () => {
      remaining -= 1
      if (remaining <= 0 && !cancelled) setReady(true)
    }

    const images = urls.map((url) => {
      const img = new Image()
      img.onload = settle
      img.onerror = settle
      img.src = url
      return img
    })

    const timeoutId = window.setTimeout(() => {
      if (!cancelled) setReady(true)
    }, FALLBACK_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
      images.forEach((img) => {
        img.onload = null
        img.onerror = null
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return ready
}
