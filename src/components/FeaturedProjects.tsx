import { Project, featuredProjects } from '../data/projects.ts'
import ProjectCard from './ProjectCard'

interface FeaturedProjectsProps {
    onProjectClick: (project: Project) => void
}

export default function FeaturedProjects({ onProjectClick }: FeaturedProjectsProps) {
    const [hero, ...supporting] = featuredProjects

    return (
        <section id="projects" className="pt-12 pb-0 px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-12">
                    Featured Projects
                </h2>

                {/* Hero Card - Full Width with accent border */}
                <div className="mb-6 border-l-4 border-accent rounded-lg">
                    <ProjectCard
                        key={hero.id}
                        project={hero}
                        onExpand={() => onProjectClick(hero)}
                    />
                </div>

                {/* Supporting Cards - Side by Side on desktop, stacked on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {supporting.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onExpand={() => onProjectClick(project)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
