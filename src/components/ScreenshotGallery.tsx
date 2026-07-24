import { useState, useEffect, type MouseEvent } from 'react'
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'

interface ScreenshotGalleryProps {
    screenshots: string[]
}

export default function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false)
    const [imageKey, setImageKey] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const goToIndex = (index: number) => {
        setIsLoading(true)
        setCurrentIndex(index)
        setImageKey((prev) => prev + 1)
    }

    const goToNext = (e?: MouseEvent) => {
        e?.stopPropagation()
        goToIndex((currentIndex + 1) % screenshots.length)
    }

    const goToPrevious = (e?: MouseEvent) => {
        e?.stopPropagation()
        goToIndex((currentIndex - 1 + screenshots.length) % screenshots.length)
    }

    const closeExpanded = () => {
        setIsExpanded(false)
        setIsLoading(false)
        setImageKey((prev) => prev + 1)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isExpanded && e.key === 'Escape') {
                closeExpanded()
                return
            }

            if (screenshots.length <= 1) return

            if (e.key === 'ArrowLeft') {
                e.preventDefault()
                goToIndex((currentIndex - 1 + screenshots.length) % screenshots.length)
            } else if (e.key === 'ArrowRight') {
                e.preventDefault()
                goToIndex((currentIndex + 1) % screenshots.length)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [screenshots.length, isExpanded, currentIndex])

    if (screenshots.length === 0) return null

    const hasMultiple = screenshots.length > 1

    return (
        <div className="relative w-full mb-8">
            {/* Main image display */}
            <div className="relative aspect-video bg-surface border border-border rounded-lg overflow-hidden group">
                <img
                    key={`main-${currentIndex}-${imageKey}`}
                    src={screenshots[currentIndex]}
                    alt={`Screenshot ${currentIndex + 1}`}
                    className="w-full h-full object-contain cursor-zoom-in group-hover:opacity-95"
                    onClick={() => setIsExpanded(true)}
                    loading="eager"
                    onLoad={() => setIsLoading(false)}
                    style={{ opacity: isLoading ? 0 : 1 }}
                />
                {hasMultiple && (
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
            {hasMultiple && (
                <div className="mt-4">
                    <div className="flex justify-center gap-2 overflow-x-auto pb-2 horizontal-scroll">
                        {screenshots.map((screenshot, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToIndex(idx)}
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

                    <div className="flex justify-center mt-3">
                        <span className="text-sm text-text-secondary">
                            {currentIndex + 1} / {screenshots.length}
                        </span>
                    </div>
                </div>
            )}

            {/* Expanded lightbox */}
            {isExpanded && (
                <div
                    className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
                    onClick={closeExpanded}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Screenshot ${currentIndex + 1} of ${screenshots.length}`}
                >
                    <button
                        className="absolute top-4 right-4 z-10 p-2 text-text-secondary hover:text-accent transition-colors"
                        onClick={(e) => {
                            e.stopPropagation()
                            closeExpanded()
                        }}
                        aria-label="Close expanded view"
                    >
                        <FaTimes size={28} />
                    </button>

                    {hasMultiple && (
                        <>
                            <button
                                onClick={goToPrevious}
                                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 bg-surface/90 hover:bg-surface border border-border hover:border-accent rounded-full p-3 text-text-primary hover:text-accent transition-all"
                                aria-label="Previous image"
                            >
                                <FaChevronLeft size={22} />
                            </button>
                            <button
                                onClick={goToNext}
                                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 bg-surface/90 hover:bg-surface border border-border hover:border-accent rounded-full p-3 text-text-primary hover:text-accent transition-all"
                                aria-label="Next image"
                            >
                                <FaChevronRight size={22} />
                            </button>
                        </>
                    )}

                    <img
                        key={`expanded-${currentIndex}-${imageKey}`}
                        src={screenshots[currentIndex]}
                        alt={`Expanded screenshot ${currentIndex + 1}`}
                        className="max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                        loading="eager"
                        onLoad={() => setIsLoading(false)}
                    />

                    {hasMultiple && (
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-surface/90 border border-border text-sm text-text-secondary tabular-nums">
                            {currentIndex + 1} / {screenshots.length}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
