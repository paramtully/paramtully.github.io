import { Project } from '../data/projects'
import { allProjects } from '../data/projects'
import ProjectCard from './ProjectCard'

interface AllProjectsProps {
  onProjectClick: (project: Project) => void
}

export default function AllProjects({ onProjectClick }: AllProjectsProps) {
  if (allProjects.length === 0) return null

  const projectsByCategory = {
    systems: allProjects.filter((p) => p.category === 'systems'),
    'cloud-infra': allProjects.filter((p) => p.category === 'cloud-infra'),
    data: allProjects.filter((p) => p.category === 'data'),
  }

  return (
    <section id="all-projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-12">
          All Projects
        </h2>
        <div className="space-y-16">
          {projectsByCategory.systems.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-text-primary mb-6">Systems</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsByCategory.systems.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onExpand={() => onProjectClick(project)}
                  />
                ))}
              </div>
            </div>
          )}
          {projectsByCategory['cloud-infra'].length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-text-primary mb-6">Cloud / Infra</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsByCategory['cloud-infra'].map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onExpand={() => onProjectClick(project)}
                  />
                ))}
              </div>
            </div>
          )}
          {projectsByCategory.data.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-text-primary mb-6">Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsByCategory.data.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onExpand={() => onProjectClick(project)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
