import { Focus, Project, getAdditionalForFocus } from '../data/projects.ts'
import CompactProjectCard from './CompactProjectCard'

interface AdditionalProjectsProps {
    focus: Focus
    onProjectClick: (project: Project) => void
}

export default function AdditionalProjects({ focus, onProjectClick }: AdditionalProjectsProps) {
    const visible = getAdditionalForFocus(focus)

    if (visible.length === 0) return null

    return (
        <section id="additional-projects" className="pt-0 pb-12 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-sm font-medium text-text-secondary mb-4 tracking-wide uppercase">
                    Additional projects
                </h3>
                <div className="horizontal-scroll-container">
                    <div className="horizontal-scroll">
                        {visible.map((project) => (
                            <CompactProjectCard
                                key={project.id}
                                project={project}
                                onExpand={() => onProjectClick(project)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
