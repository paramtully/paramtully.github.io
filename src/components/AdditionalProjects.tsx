import { Project, allProjects } from '../data/projects.ts'
import CompactProjectCard from './CompactProjectCard'

interface AdditionalProjectsProps {
    onProjectClick: (project: Project) => void
}

export default function AdditionalProjects({ onProjectClick }: AdditionalProjectsProps) {
    if (allProjects.length === 0) return null

    return (
        <section id="additional-projects" className="pt-0 pb-20 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="horizontal-scroll-container">
                    <div className="horizontal-scroll">
                        {allProjects.map((project) => (
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
