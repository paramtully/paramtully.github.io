export default function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">About</h2>
        <div className="text-lg text-text-secondary leading-relaxed space-y-4">
          <p>
            I'm a backend and distributed systems engineer focused on building reliable,
            fault-tolerant cloud infrastructure. I'm passionate about designing systems that scale,
            understanding the tradeoffs between consistency and availability, and making cost-aware
            architectural decisions.
          </p>
          <p>
            My interests include distributed consensus algorithms, event-driven architectures, data
            pipeline design, and infrastructure as code. I believe in building systems that fail
            gracefully, instrumenting everything, and making explicit tradeoffs rather than
            accepting defaults.
          </p>
        </div>
      </div>
    </section>
  )
}
