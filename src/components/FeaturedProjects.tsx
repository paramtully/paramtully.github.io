import { Focus, Project, getFeaturedForFocus } from '../data/projects.ts'
import ProjectCard from './ProjectCard'
import ProjectFilter from './ProjectFilter'

interface FeaturedProjectsProps {
    focus: Focus
    onFocusChange: (focus: Focus) => void
    onProjectClick: (project: Project) => void
}

export default function FeaturedProjects({ focus, onFocusChange, onProjectClick }: FeaturedProjectsProps) {
    const visible = getFeaturedForFocus(focus)

    return (
        <section id="projects" className="pt-12 pb-0 px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                    Featured Projects
                </h2>

                <ProjectFilter active={focus} onChange={onFocusChange} />

                {visible.length > 0 && (
                    <div
                        className={`grid grid-cols-1 gap-6 mb-6 ${
                            visible.length === 3
                                ? 'md:grid-cols-3'
                                : 'md:grid-cols-2'
                        }`}
                    >
                        {visible.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onExpand={() => onProjectClick(project)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
