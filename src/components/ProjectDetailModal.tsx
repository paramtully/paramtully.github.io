import { useEffect } from 'react'
import { Project } from '../data/projects'
import { FaTimes } from 'react-icons/fa'
import ScreenshotGallery from './ScreenshotGallery'

interface ProjectDetailModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-surface border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-surface border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-text-primary">{project.title}</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close modal"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <div className="p-6 space-y-8">
          {project.screenshots && project.screenshots.length > 0 && (
            <ScreenshotGallery screenshots={project.screenshots} />
          )}

          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">Overview</h3>
            <p className="text-text-secondary leading-relaxed">{project.overview}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">Problem Context</h3>
            <p className="text-text-secondary leading-relaxed">{project.problemContext}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">Why It Was Hard</h3>
            <p className="text-text-secondary leading-relaxed">{project.whyItWasHard}</p>
          </div>

          {project.architecture && (
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Architecture</h3>
              <p className="text-text-secondary leading-relaxed">{project.architecture}</p>
            </div>
          )}

          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Key Decisions + Tradeoffs
            </h3>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              {project.keyDecisions.map((decision, idx) => (
                <li key={idx}>{decision}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Reliability / Failure Handling
            </h3>
            <p className="text-text-secondary leading-relaxed">{project.reliability}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">Performance / Scale</h3>
            <p className="text-text-secondary leading-relaxed">{project.performance}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">Results / Metrics</h3>
            <p className="text-text-secondary leading-relaxed">{project.results}</p>
          </div>

          {project.futureImprovements && (
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Future Improvements
              </h3>
              <p className="text-text-secondary leading-relaxed">{project.futureImprovements}</p>
            </div>
          )}

          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">Lessons Learned</h3>
            <p className="text-text-secondary leading-relaxed">{project.lessons}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
