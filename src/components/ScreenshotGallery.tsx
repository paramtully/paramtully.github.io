import { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'

interface ScreenshotGalleryProps {
    screenshots: string[]
}

export default function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [expandedImage, setExpandedImage] = useState<string | null>(null)

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % screenshots.length)
    }

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // If image is expanded, ESC closes it
            if (expandedImage && e.key === 'Escape') {
                setExpandedImage(null)
                return
            }

            // Otherwise, handle navigation
            if (e.key === 'ArrowLeft') {
                setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
            } else if (e.key === 'ArrowRight') {
                setCurrentIndex((prev) => (prev + 1) % screenshots.length)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [screenshots.length, expandedImage])

    if (screenshots.length === 0) return null

    return (
        <div className="relative w-full mb-8">
            {/* Main image display */}
            <div className="relative aspect-video bg-surface border border-border rounded-lg overflow-hidden group">
                <img
                    src={screenshots[currentIndex]}
                    alt={`Screenshot ${currentIndex + 1}`}
                    className="w-full h-full object-contain cursor-zoom-in transition-opacity group-hover:opacity-95"
                    onClick={() => setExpandedImage(screenshots[currentIndex])}
                />
                {screenshots.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-surface hover:border-accent border border-border rounded-full p-2 text-text-primary hover:text-accent transition-all"
                            aria-label="Previous image"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-surface hover:border-accent border border-border rounded-full p-2 text-text-primary hover:text-accent transition-all"
                            aria-label="Next image"
                        >
                            <FaChevronRight />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnail strip and counter */}
            {screenshots.length > 1 && (
                <div className="mt-4">
                    {/* Thumbnails */}
                    <div className="flex justify-center gap-2 overflow-x-auto pb-2 horizontal-scroll">
                        {screenshots.map((screenshot, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`flex-shrink-0 w-24 h-16 rounded border-2 overflow-hidden transition-all ${idx === currentIndex
                                    ? 'border-accent scale-105 shadow-lg'
                                    : 'border-border opacity-60 hover:opacity-100 hover:border-text-secondary'
                                    }`}
                                aria-label={`Go to screenshot ${idx + 1}`}
                            >
                                <img
                                    src={screenshot}
                                    alt={`Thumbnail ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Counter */}
                    <div className="flex justify-center mt-3">
                        <span className="text-sm text-text-secondary">
                            {currentIndex + 1} / {screenshots.length}
                        </span>
                    </div>
                </div>
            )}

            {/* Expanded image overlay */}
            {expandedImage && (
                <div
                    className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setExpandedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-text-secondary hover:text-accent transition-colors"
                        onClick={() => setExpandedImage(null)}
                        aria-label="Close expanded view"
                    >
                        <FaTimes size={32} />
                    </button>
                    <img
                        src={expandedImage}
                        alt="Expanded screenshot"
                        className="max-w-full max-h-full object-contain cursor-zoom-out"
                        onClick={() => setExpandedImage(null)}
                    />
                </div>
            )}
        </div>
    )
}
