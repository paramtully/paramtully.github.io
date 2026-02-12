import { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface ScreenshotGalleryProps {
  screenshots: string[]
}

export default function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % screenshots.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [screenshots.length])

  if (screenshots.length === 0) return null

  return (
    <div className="relative w-full mb-8">
      <div className="relative aspect-video bg-surface border border-border rounded-lg overflow-hidden">
        <img
          src={screenshots[currentIndex]}
          alt={`Screenshot ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />
        {screenshots.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border rounded-full p-2 text-text-primary transition-colors"
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border rounded-full p-2 text-text-primary transition-colors"
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>
      {screenshots.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {screenshots.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-accent' : 'bg-text-secondary'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
          <span className="ml-4 text-sm text-text-secondary">
            {currentIndex + 1} / {screenshots.length}
          </span>
        </div>
      )}
    </div>
  )
}
