import { githubLink, linkedinLink, resumeLink } from '../data/links'
import { FaGithub, FaLinkedin, FaFilePdf } from 'react-icons/fa'

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-12">Contact</h2>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 bg-surface border border-border rounded-lg text-text-primary hover:border-accent hover:text-accent hover:bg-surface-elevated transition-all"
          >
            <FaGithub size={24} />
            <span>GitHub</span>
          </a>
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 bg-surface border border-border rounded-lg text-text-primary hover:border-accent hover:text-accent hover:bg-surface-elevated transition-all"
          >
            <FaLinkedin size={24} />
            <span>LinkedIn</span>
          </a>
          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 bg-surface border border-border rounded-lg text-text-primary hover:border-accent hover:text-accent hover:bg-surface-elevated transition-all"
          >
            <FaFilePdf size={24} />
            <span>Resume PDF</span>
          </a>
        </div>
      </div>
    </section>
  )
}
