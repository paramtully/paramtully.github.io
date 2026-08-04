import { useEffect, useState } from 'react'
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
import { Focus, Project, focusOrder } from './data/projects.ts'

function readFocusFromUrl(): Focus {
    const param = new URLSearchParams(window.location.search).get('focus')
    // Legacy deep links from the previous four-filter design.
    if (param === 'data') return 'ml'
    if (param === 'infra' || param === 'all') return param === 'all' ? 'highlights' : 'swe'
    return focusOrder.includes(param as Focus) ? (param as Focus) : 'highlights'
}

function App() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [focus, setFocus] = useState<Focus>(readFocusFromUrl)

    // Shareable deep links for applications: ?focus=ml or ?focus=swe
    useEffect(() => {
        const url = new URL(window.location.href)
        if (focus === 'highlights') {
            url.searchParams.delete('focus')
        } else {
            url.searchParams.set('focus', focus)
        }
        window.history.replaceState({}, '', url)
    }, [focus])

    useEffect(() => {
        const syncFromUrl = () => setFocus(readFocusFromUrl())
        window.addEventListener('popstate', syncFromUrl)
        return () => window.removeEventListener('popstate', syncFromUrl)
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <Hero focus={focus} />
            <FeaturedProjects
                focus={focus}
                onFocusChange={setFocus}
                onProjectClick={setSelectedProject}
            />
            <AdditionalProjects focus={focus} onProjectClick={setSelectedProject} />
            <Experience />
            <About />
            <Education />
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
