import { useEffect } from 'react'
import { Project } from '../data/projects.ts'
import { FaTimes, FaGithub, FaExternalLinkAlt, FaFire, FaLightbulb, FaCog, FaShieldAlt, FaTachometerAlt, FaTrophy, FaRocket, FaGraduationCap } from 'react-icons/fa'
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
                <div className="sticky top-0 bg-surface border-b border-border p-6 flex items-center justify-between z-10">
                    <h2 className="text-3xl font-bold text-text-primary">{project.title}</h2>
                    <button
                        onClick={onClose}
                        className="text-text-secondary hover:text-accent transition-colors"
                        aria-label="Close modal"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                {/* Hero section with key metadata */}
                <div className="p-6 pb-4 border-b border-border space-y-4">
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.techTags.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* One-liner description */}
                    <p className="text-lg text-text-secondary leading-relaxed">{project.description}</p>

                    {/* Quick actions */}
                    <div className="flex gap-3 flex-wrap">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-surface-elevated border border-border rounded-lg hover:border-accent transition-all"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FaGithub /> View Code
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent rounded-lg hover:bg-accent/20 transition-all"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FaExternalLinkAlt /> Live Demo
                            </a>
                        )}
                    </div>
                </div>

                <div className="p-6 space-y-10">
                    {/* Screenshots */}
                    {project.screenshots && project.screenshots.length > 0 && (
                        <ScreenshotGallery screenshots={project.screenshots} />
                    )}

                    {/* GROUP 1: CONTEXT */}
                    <div className="space-y-6">
                        {/* Hard Problem Callout */}
                        <div className="bg-gradient-to-r from-accent/10 to-transparent border-l-4 border-accent p-4 rounded-r-lg">
                            <div className="flex items-start gap-3">
                                <FaFire className="text-accent flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h3 className="text-lg font-semibold text-text-primary mb-2">The Hard Problem</h3>
                                    <p className="text-text-secondary leading-relaxed">{project.hardProblem}</p>
                                </div>
                            </div>
                        </div>

                        {/* Overview */}
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <FaLightbulb className="text-accent flex-shrink-0" />
                                <h3 className="text-xl font-semibold text-text-primary">Overview</h3>
                            </div>
                            <p className="text-text-secondary leading-relaxed">{project.overview}</p>
                        </div>

                        {/* Problem Context */}
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <FaLightbulb className="text-accent flex-shrink-0" />
                                <h3 className="text-xl font-semibold text-text-primary">Problem Context</h3>
                            </div>
                            <p className="text-text-secondary leading-relaxed">{project.problemContext}</p>
                        </div>

                        {/* Why It Was Hard */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <FaFire className="text-accent flex-shrink-0" />
                                <h3 className="text-xl font-semibold text-text-primary">Why It Was Hard</h3>
                            </div>
                            <div className="space-y-3">
                                {project.whyItWasHard.map((challenge, idx) => (
                                    <div key={idx} className="flex overflow-hidden rounded-lg border border-border">
                                        <div className="bg-accent/30 px-4 py-3 flex items-center w-[240px] flex-shrink-0">
                                            <h4 className="font-semibold text-text-primary text-sm leading-tight">{challenge.heading}</h4>
                                        </div>
                                        <div className="bg-accent/10 px-4 py-3 flex-1">
                                            <p className="text-text-secondary leading-relaxed text-sm">{challenge.context}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <hr className="border-border" />

                    {/* GROUP 2: TECHNICAL EXECUTION */}
                    <div className="space-y-6">
                        {/* Architecture */}
                        {project.architecture && (
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <FaCog className="text-accent flex-shrink-0" />
                                    <h3 className="text-xl font-semibold text-text-primary">Architecture</h3>
                                </div>
                                <p className="text-text-secondary leading-relaxed">{project.architecture}</p>
                            </div>
                        )}

                        {/* Key Decisions */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <FaCog className="text-accent flex-shrink-0" />
                                <h3 className="text-xl font-semibold text-text-primary">Key Decisions + Tradeoffs</h3>
                            </div>
                            <div className="space-y-3">
                                {project.keyDecisions.map((decision, idx) => (
                                    <div key={idx} className="flex overflow-hidden rounded-lg border border-border">
                                        <div className="bg-accent/30 px-4 py-3 flex items-center gap-3 w-[240px] flex-shrink-0">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/40 text-text-primary text-xs font-bold flex items-center justify-center">
                                                {idx + 1}
                                            </span>
                                            <h4 className="font-semibold text-text-primary text-sm leading-tight">{decision.heading}</h4>
                                        </div>
                                        <div className="bg-accent/10 px-4 py-3 flex-1">
                                            <p className="text-text-secondary leading-relaxed text-sm">{decision.context}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <hr className="border-border" />

                    {/* GROUP 3: SYSTEM QUALITIES */}
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Reliability */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <FaShieldAlt className="text-accent flex-shrink-0" />
                                    <h3 className="text-xl font-semibold text-text-primary">Reliability</h3>
                                </div>
                                <p className="text-text-secondary leading-relaxed">{project.reliability}</p>
                            </div>

                            {/* Performance */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <FaTachometerAlt className="text-accent flex-shrink-0" />
                                    <h3 className="text-xl font-semibold text-text-primary">Performance</h3>
                                </div>
                                <p className="text-text-secondary leading-relaxed">{project.performance}</p>
                            </div>
                        </div>
                    </div>

                    <hr className="border-border" />

                    {/* GROUP 4: OUTCOMES & LEARNING */}
                    <div className="space-y-6">
                        {/* Results */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <FaTrophy className="text-accent flex-shrink-0" />
                                <h3 className="text-xl font-semibold text-text-primary">Results / Impact</h3>
                            </div>
                            <p className="text-text-secondary leading-relaxed">{project.results}</p>
                        </div>

                        {/* Future Improvements */}
                        {project.futureImprovements && (
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <FaRocket className="text-accent flex-shrink-0" />
                                    <h3 className="text-xl font-semibold text-text-primary">Future Improvements</h3>
                                </div>
                                <p className="text-text-secondary leading-relaxed">{project.futureImprovements}</p>
                            </div>
                        )}

                        {/* Lessons Learned */}
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <FaGraduationCap className="text-accent flex-shrink-0" />
                                <h3 className="text-xl font-semibold text-text-primary">Lessons Learned</h3>
                            </div>
                            <p className="text-text-secondary leading-relaxed">{project.lessons}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
