import { githubLink, linkedinLink, resumeLink, emailLink } from '../data/links'
import { FaGithub, FaLinkedin, FaFilePdf, FaEnvelope } from 'react-icons/fa'

export default function Hero() {
    return (
        <section id="hero" className="py-20 flex items-center justify-center px-6 pt-16">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6">
                    Param Tully
                </h1>
                <h2 className="text-2xl md:text-4xl text-text-secondary mb-6">
                    Software Engineer — Backend & Cloud
                </h2>
                <p className="text-sm md:text-base text-text-secondary mb-4">
                    Vancouver, BC (PST) • Open to remote & relocation
                </p>
                <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                    I design and build reliable backend systems and cloud infrastructure, with experience shipping production applications on AWS
                </p>
                <p className="text-base text-accent mb-12">
                    Open to full-time Software Engineer roles
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <a
                        href={emailLink}
                        className="flex items-center gap-2 px-6 py-3 bg-accent text-background rounded-lg hover:bg-accent-hover transition-colors font-medium"
                    >
                        <FaEnvelope />
                        Get in Touch
                    </a>
                    <a
                        href={resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-surface border border-border rounded-lg text-text-primary hover:border-accent hover:text-accent hover:bg-surface-elevated transition-all"
                    >
                        <FaFilePdf />
                        Resume
                    </a>
                    <a
                        href={linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-surface border border-border rounded-lg text-text-primary hover:border-accent hover:text-accent hover:bg-surface-elevated transition-all"
                    >
                        <FaLinkedin />
                        LinkedIn
                    </a>
                    <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-surface border border-border rounded-lg text-text-primary hover:border-accent hover:text-accent hover:bg-surface-elevated transition-all"
                    >
                        <FaGithub />
                        GitHub
                    </a>
                </div>
            </div>
        </section>
    )
}
