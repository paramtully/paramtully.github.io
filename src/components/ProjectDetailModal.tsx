import { useEffect, ReactNode } from 'react'
import { Project } from '../data/projects.ts'
import { FaTimes, FaGithub, FaExternalLinkAlt, FaFire, FaLightbulb, FaCog, FaShieldAlt, FaTachometerAlt, FaTrophy, FaRocket, FaGraduationCap, FaCheck, FaChevronDown } from 'react-icons/fa'
import ScreenshotGallery from './ScreenshotGallery'

interface ProjectDetailModalProps {
    project: Project
    onClose: () => void
}

function Section({ title, icon, defaultOpen = false, children }: { title: string; icon: ReactNode; defaultOpen?: boolean; children: ReactNode }) {
    return (
        <details open={defaultOpen} className="group border border-border rounded-lg bg-background/40 open:bg-background/60 transition-colors">
            <summary className="flex items-center gap-3 cursor-pointer list-none px-5 py-4 select-none hover:text-accent">
                <span className="text-accent flex-shrink-0">{icon}</span>
                <h3 className="text-lg font-semibold text-text-primary flex-1 group-hover:text-accent transition-colors">{title}</h3>
                <FaChevronDown className="text-text-secondary transition-transform group-open:rotate-180 flex-shrink-0" />
            </summary>
            <div className="px-5 pb-5 pt-1 text-text-secondary leading-relaxed space-y-4">
                {children}
            </div>
        </details>
    )
}

function DetailRows({ items }: { items: { heading: string; context: string }[] }) {
    return (
        <div className="space-y-3">
            {items.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row overflow-hidden rounded-lg border border-border">
                    <div className="bg-accent/25 px-4 py-3 flex items-center sm:w-[220px] flex-shrink-0">
                        <h4 className="font-semibold text-text-primary text-sm leading-tight">{item.heading}</h4>
                    </div>
                    <div className="bg-accent/5 px-4 py-3 flex-1">
                        <p className="text-text-secondary leading-relaxed text-sm">{item.context}</p>
                    </div>
                </div>
            ))}
        </div>
    )
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
                {/* Sticky header */}
                <div className="sticky top-0 bg-surface border-b border-border p-6 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">{project.title}</h2>
                        {project.status && (
                            <span className="hidden sm:inline px-2.5 py-1 rounded-full text-xs font-medium bg-accent/15 border border-accent/40 text-accent">
                                {project.status}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-text-secondary hover:text-accent transition-colors flex-shrink-0"
                        aria-label="Close"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                {/* At a glance: tags, one-liner, highlights, links */}
                <div className="p-6 pb-4 border-b border-border space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {project.techTags.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <p className="text-lg text-text-secondary leading-relaxed">{project.description}</p>

                    {project.highlights && project.highlights.length > 0 && (
                        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                            {project.highlights.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-sm text-text-primary">
                                    <FaCheck className="text-accent flex-shrink-0 mt-1" size={12} />
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="flex gap-3 flex-wrap pt-1">
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
                                <FaExternalLinkAlt /> Live Site
                            </a>
                        )}
                    </div>
                </div>

                <div className="p-6 space-y-5">
                    {/* Screenshots */}
                    {project.screenshots && project.screenshots.length > 0 && (
                        <ScreenshotGallery screenshots={project.screenshots} />
                    )}

                    {/* The hook: always visible */}
                    <div className="bg-gradient-to-r from-accent/10 to-transparent border-l-4 border-accent p-4 rounded-r-lg">
                        <div className="flex items-start gap-3">
                            <FaFire className="text-accent flex-shrink-0 mt-1" size={20} />
                            <div>
                                <h3 className="text-lg font-semibold text-text-primary mb-2">The Hard Problem</h3>
                                <p className="text-text-secondary leading-relaxed">{project.hardProblem}</p>
                            </div>
                        </div>
                    </div>

                    {/* Everything else is collapsible so it can be skimmed */}
                    <Section title="Overview" icon={<FaLightbulb />} defaultOpen>
                        <p>{project.overview}</p>
                        {project.architecture && <p>{project.architecture}</p>}
                    </Section>

                    <Section title="Why It Was Hard" icon={<FaFire />}>
                        <p className="text-sm">{project.problemContext}</p>
                        <DetailRows items={project.whyItWasHard} />
                    </Section>

                    <Section title="Key Decisions and Tradeoffs" icon={<FaCog />}>
                        <DetailRows items={project.keyDecisions} />
                    </Section>

                    <Section title="Reliability and Performance" icon={<FaShieldAlt />}>
                        <div>
                            <div className="flex items-center gap-2 mb-1 text-text-primary font-semibold text-sm">
                                <FaShieldAlt className="text-accent" size={14} /> Reliability
                            </div>
                            <p>{project.reliability}</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1 text-text-primary font-semibold text-sm">
                                <FaTachometerAlt className="text-accent" size={14} /> Performance
                            </div>
                            <p>{project.performance}</p>
                        </div>
                    </Section>

                    <Section title="Results and Impact" icon={<FaTrophy />} defaultOpen>
                        <p>{project.results}</p>
                    </Section>

                    {project.futureImprovements && (
                        <Section title="What's Next" icon={<FaRocket />}>
                            <p>{project.futureImprovements}</p>
                        </Section>
                    )}

                    <Section title="Lessons Learned" icon={<FaGraduationCap />}>
                        <p>{project.lessons}</p>
                    </Section>
                </div>
            </div>
        </div>
    )
}
