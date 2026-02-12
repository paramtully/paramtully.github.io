import { useState } from 'react'
import Hero from './components/Hero'
import Experience from './components/Experience'
import FeaturedProjects from './components/FeaturedProjects'
import AdditionalProjects from './components/AdditionalProjects'
import SystemsThinking from './components/SystemsThinking'
import About from './components/About'
import Education from './components/Education'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import ProjectDetailModal from './components/ProjectDetailModal'
import { Project } from './data/projects.ts'

function App() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <Hero />
            <About />
            <Education />
            <Experience />
            <FeaturedProjects onProjectClick={setSelectedProject} />
            <AdditionalProjects onProjectClick={setSelectedProject} />
            <SystemsThinking />
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
