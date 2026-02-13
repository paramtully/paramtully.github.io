import { Project } from '../data/projects.ts'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

interface ProjectCardProps {
    project: Project
    onExpand: () => void
}

export default function ProjectCard({ project, onExpand }: ProjectCardProps) {
    return (
        <div className="bg-surface border border-border rounded-lg p-6 hover:border-accent hover:bg-surface-elevated hover-lift transition-all fade-in">
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-semibold text-text-primary">{project.title}</h3>
                <div className="flex gap-2">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-secondary hover:text-text-primary hover:scale-110 transition-all"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="View on GitHub"
                        >
                            <FaGithub size={20} />
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
                            <FaExternalLinkAlt size={20} />
                        </a>
                    )}
                </div>
            </div>
            <p className="text-text-secondary mb-4">{project.description}</p>
            <p className="text-sm text-accent mb-4 italic font-medium">{project.hardProblem}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {project.techTags.slice(0, 6).map((tag, idx) => (
                    <span
                        key={idx}
                        className="px-3 py-1 bg-background border border-border rounded text-sm text-text-secondary"
                    >
                        {tag}
                    </span>
                ))}
                {project.techTags.length > 6 && (
                    <span className="px-3 py-1 bg-background border border-border rounded text-sm text-text-secondary">
                        +{project.techTags.length - 6} more
                    </span>
                )}
            </div>
            <button
                onClick={onExpand}
                className="w-full py-2 text-accent hover:text-text-primary hover:underline transition-all text-sm font-medium"
            >
                Learn more →
            </button>
        </div>
    )
}
