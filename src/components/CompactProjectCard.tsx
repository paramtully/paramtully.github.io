import { Project } from '../data/projects.ts'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

interface CompactProjectCardProps {
    project: Project
    onExpand: () => void
}

export default function CompactProjectCard({ project, onExpand }: CompactProjectCardProps) {
    return (
        <div 
            onClick={onExpand}
            className="bg-surface border border-border rounded-lg p-4 hover:border-accent hover:bg-surface-elevated hover-lift transition-all fade-in cursor-pointer w-[280px] md:w-[320px] flex-shrink-0"
        >
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-text-primary pr-2">{project.title}</h3>
                <div className="flex gap-2 flex-shrink-0">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-secondary hover:text-text-primary hover:scale-110 transition-all"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="View on GitHub"
                        >
                            <FaGithub size={18} />
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-secondary hover:text-accent transition-colors"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="View live site"
                        >
                            <FaExternalLinkAlt size={18} />
                        </a>
                    )}
                </div>
            </div>
            <p className="text-sm text-text-secondary mb-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2">
                {project.techTags.slice(0, 4).map((tag, idx) => (
                    <span
                        key={idx}
                        className="px-2 py-1 bg-background border border-border rounded text-xs text-text-secondary"
                    >
                        {tag}
                    </span>
                ))}
                {project.techTags.length > 4 && (
                    <span className="px-2 py-1 bg-background border border-border rounded text-xs text-text-secondary">
                        +{project.techTags.length - 4} more
                    </span>
                )}
            </div>
        </div>
    )
}
