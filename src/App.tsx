import { useState } from 'react'
import Hero from './components/Hero'
import Experience from './components/Experience'
import FeaturedProjects from './components/FeaturedProjects'
import AllProjects from './components/AllProjects'
import SystemsThinking from './components/SystemsThinking'
import About from './components/About'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import ProjectDetailModal from './components/ProjectDetailModal'
import { Project } from './data/projects'

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Experience />
      <FeaturedProjects onProjectClick={setSelectedProject} />
      <AllProjects onProjectClick={setSelectedProject} />
      <SystemsThinking />
      <About />
      <Contact />
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}

export default App
