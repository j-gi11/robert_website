import { image, ImageFolder } from '../data/images'
import Placeholder from './Placeholder'

interface ImageProps {
  folder: ImageFolder
  slug: string
  alt: string
  color?: string
  width?: string | number
  height?: string | number
  className?: string
}

export default function Image({ folder, slug, alt, color, width, height, className }: ImageProps) {
  const src = image(folder, slug)

  if (!src) {
    return <Placeholder color={color} width={width} height={height} />
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={height === 'auto' ? { aspectRatio: '1' } : undefined}
    />
  )
}
