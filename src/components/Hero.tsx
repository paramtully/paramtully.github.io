import { githubLink, linkedinLink, resumeLink } from '../data/links'
import { FaGithub, FaLinkedin, FaFilePdf } from 'react-icons/fa'

export default function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6">
          Param Tully
        </h1>
        <h2 className="text-2xl md:text-4xl text-text-secondary mb-8">
          Backend & Distributed Systems Engineer
        </h2>
        <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
          Building reliable, fault-tolerant cloud systems
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-surface border border-border rounded-lg text-text-primary hover:border-accent hover:text-accent transition-colors"
          >
            <FaGithub />
            GitHub
          </a>
          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-surface border border-border rounded-lg text-text-primary hover:border-accent hover:text-accent transition-colors"
          >
            <FaFilePdf />
            Resume
          </a>
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-surface border border-border rounded-lg text-text-primary hover:border-accent hover:text-accent transition-colors"
          >
            <FaLinkedin />
            LinkedIn
          </a>
          <button
            onClick={scrollToProjects}
            className="px-6 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Jump to Projects
          </button>
        </div>
      </div>
    </section>
  )
}
