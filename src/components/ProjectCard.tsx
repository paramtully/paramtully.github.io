import { useState } from 'react'
import { Project } from '../data/projects.ts'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

interface ProjectCardProps {
    project: Project
    onExpand: () => void
}

export default function ProjectCard({ project, onExpand }: ProjectCardProps) {
    const [imgError, setImgError] = useState(false)
    const preview = project.screenshots && project.screenshots.length > 0 ? project.screenshots[0] : null
    const showImage = preview && !imgError
    const monogram = project.title
        .split(' ')
        .filter((w) => /[A-Za-z]/.test(w[0] ?? ''))
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join('')

    return (
        <div
            onClick={onExpand}
            className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-accent hover:bg-surface-elevated hover-lift transition-all fade-in cursor-pointer flex flex-col h-full"
        >
            {/* Preview */}
            <div className="relative aspect-[16/9] bg-background overflow-hidden border-b border-border">
                {showImage ? (
                    <img
                        src={preview}
                        alt={`${project.title} preview`}
                        className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform"
                        loading="lazy"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 via-surface to-background">
                        <span className="text-5xl font-bold text-accent/60 tracking-wide">
                            {monogram}
                        </span>
                    </div>
                )}
                {project.status && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-background/85 border border-accent/40 text-accent backdrop-blur-sm">
                        {project.status}
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-text-primary leading-tight">{project.title}</h3>
                    <div className="flex gap-2 flex-shrink-0 mt-1">
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
                                <FaExternalLinkAlt size={16} />
                            </a>
                        )}
                    </div>
                </div>

                <p className="text-sm text-text-secondary mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {project.techTags.slice(0, 5).map((tag, idx) => (
                        <span
                            key={idx}
                            className="px-2.5 py-1 bg-background border border-border rounded text-xs text-text-secondary"
                        >
                            {tag}
                        </span>
                    ))}
                    {project.techTags.length > 5 && (
                        <span className="px-2.5 py-1 bg-background border border-border rounded text-xs text-text-secondary">
                            +{project.techTags.length - 5}
                        </span>
                    )}
                </div>

                <span className="text-sm text-accent font-medium group-hover:underline">
                    View details &rarr;
                </span>
            </div>
        </div>
    )
}
