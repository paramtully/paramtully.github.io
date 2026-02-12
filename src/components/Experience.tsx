import { experiences } from '../data/experience'
import { format } from 'date-fns'

export default function Experience() {
    return (
        <section id="experience" className="py-12 px-6 bg-surface">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-12">
                    Professional Experience
                </h2>
                <div className="space-y-8">
                    {experiences.map((exp, idx) => (
                        <div key={idx} className="bg-background border border-border rounded-lg p-6 hover:border-border-hover transition-all fade-in">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div>
                                    <h3 className="text-2xl font-semibold text-text-primary">
                                        {exp.companyUrl ? (
                                            <a
                                                href={exp.companyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-text-primary hover:underline transition-all font-medium"
                                            >
                                                {exp.company}
                                            </a>
                                        ) : (
                                            exp.company
                                        )}
                                    </h3>
                                    <p className="text-lg text-text-secondary mt-1">{exp.position}</p>
                                </div>
                                <p className="text-text-secondary mt-2 md:mt-0">
                                    {format(exp.startDate, 'MMM yyyy')} - {format(exp.endDate, 'MMM yyyy')}
                                </p>
                            </div>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                {exp.impactBullets.map((bullet, bulletIdx) => (
                                    <li key={bulletIdx}>{bullet}</li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {exp.technologies.map((tech, techIdx) => (
                                    <span
                                        key={techIdx}
                                        className="px-3 py-1 bg-surface border border-border rounded text-sm text-text-secondary"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            {exp.projectUrl && (
                                <a
                                    href={exp.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-2 text-accent hover:text-text-primary hover:underline transition-all text-sm font-medium block text-center mt-4"
                                >
                                    View Project →
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
