import { linkedinLink, emailLink } from '../data/links'
import { FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Contact() {
    return (
        <section id="contact" className="py-12 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Let's Connect</h2>
                <p className="text-lg text-text-secondary mb-8">
                    Interested in working together? Let's talk about how I can contribute to your team.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6">
                    <a
                        href={emailLink}
                        className="flex items-center gap-3 px-6 py-4 bg-accent text-background rounded-lg hover:bg-accent-hover transition-colors font-medium"
                    >
                        <FaEnvelope size={24} />
                        <span>paramtully.dev@gmail.com</span>
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
                </div>
            </div>
        </section>
    )
}
