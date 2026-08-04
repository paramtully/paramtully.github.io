import { Focus, focusLabels, focusOrder } from '../data/projects.ts'

interface ProjectFilterProps {
    active: Focus
    onChange: (focus: Focus) => void
}

export default function ProjectFilter({ active, onChange }: ProjectFilterProps) {
    return (
        <div className="mb-8">
            <div
                className="inline-flex p-1 rounded-lg border border-border bg-surface"
                role="group"
                aria-label="Project focus"
            >
                {focusOrder.map((focus) => {
                    const isActive = focus === active
                    return (
                        <button
                            key={focus}
                            type="button"
                            onClick={() => onChange(focus)}
                            aria-pressed={isActive}
                            className={`px-4 py-1.5 rounded-md text-sm transition-all ${
                                isActive
                                    ? 'bg-background text-text-primary font-medium shadow-sm border border-border'
                                    : 'text-text-secondary hover:text-text-primary border border-transparent'
                            }`}
                        >
                            {focusLabels[focus]}
                        </button>
                    )
                })}
            </div>
            <p className="mt-3 text-sm text-text-secondary">
                {active === 'highlights'
                    ? 'A short list of the strongest work. Switch focus for role-specific depth.'
                    : active === 'swe'
                      ? 'Software, systems, and infrastructure projects.'
                      : 'Machine learning, AI, and applied analytics projects.'}
            </p>
        </div>
    )
}
