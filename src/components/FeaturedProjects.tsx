import { Project } from '../data/projects'
import { featuredProjects } from '../data/projects'
import ProjectCard from './ProjectCard'

interface FeaturedProjectsProps {
  onProjectClick: (project: Project) => void
}

export default function FeaturedProjects({ onProjectClick }: FeaturedProjectsProps) {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-12">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
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
