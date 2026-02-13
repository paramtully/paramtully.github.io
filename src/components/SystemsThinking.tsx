export default function SystemsThinking() {
    const principles = [
        {
            title: 'Design for failure first',
            description:
                'Systems will fail. Design with failure as the default assumption, not an edge case.',
            applied: 'Built ingestion interfaces with fallback vendor implementations and retry classification.',
        },
        {
            title: 'Cost is a feature',
            description:
                'Every architectural decision has cost implications. Make cost tradeoffs explicit and intentional.',
            applied: 'Split Lambda ingestion pipeline to avoid NAT Gateway costs in VPC architecture.',
        },
        {
            title: 'Idempotent systems',
            description:
                'Operations should be safe to retry. Idempotency enables fault tolerance and simplifies error handling.',
            applied: 'Designed DTO ingestion layer to support replayable listing imports.',
        },
        {
            title: 'Observability first',
            description:
                'You cannot fix what you cannot see. Instrumentation, logging, and metrics are not optional.',
            applied: 'Structured logs + failure classification for third-party API ingestion reliability.',
        },
    ]

    return (
        <section id="systems-thinking" className="py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-12">
                    Systems Thinking
                </h2>
                <p className="text-lg text-text-secondary mb-12 max-w-2xl">
                    Engineering philosophy for building production systems
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {principles.map((principle, idx) => (
                        <div key={idx} className="bg-surface border border-border rounded-lg p-6 hover:border-border-hover hover:bg-surface-elevated transition-all">
                            <h3 className="text-xl font-semibold text-text-primary mb-3">
                                {principle.title}
                            </h3>
                            <p className="text-text-secondary leading-relaxed mb-4">{principle.description}</p>
                            <div className="border-l-2 border-border-hover pl-3 mt-4">
                                <p className="text-sm text-text-primary leading-relaxed italic">
                                    {principle.applied}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
