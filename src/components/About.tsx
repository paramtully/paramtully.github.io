export default function About() {
    return (
        <section id="about" className="py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">About</h2>
                <div className="border-l-2 border-border-hover pl-6 text-lg text-text-secondary leading-normal">
                    <p className="mb-4">
                        I'm a new graduate software engineer from UBC focused on building reliable backend systems, cloud infrastructure, and production-ready applications.
                        I'm particularly interested in distributed systems, data pipelines, and platform tooling that support real products at scale.
                    </p>
                    <p className="mb-4">
                        I've built and shipped production systems across unfamiliar domains by learning quickly and applying new technologies in real environments.
                        I'm motivated by designing systems that are reliable, observable, and cost-aware, and I enjoy solving problems that require strong systems thinking and thoughtful tradeoff decisions.
                    </p>
                    <p>
                        Outside of engineering, I enjoy strength training, team sports like basketball and volleyball, and building side projects to experiment with new systems and tools.
                    </p>
                </div>
            </div>
        </section>
    )
}
