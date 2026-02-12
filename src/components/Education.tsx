export default function Education() {
    const courses = [
        {
            code: "CPSC 416",
            title: "Distributed Systems",
            description: "Built fault-tolerant distributed systems with consensus protocols, replication strategies, and consistency models essential for designing reliable cloud infrastructure.",
            technologies: ["Go", "Docker", "RPC", "Distributed Consensus"]
        },
        {
            code: "CPSC 313",
            title: "Computer Hardware & Operating Systems",
            description: "Systems-level programming covering concurrency, memory management, and performance optimization foundational knowledge for infrastructure and systems work.",
            technologies: ["C", "Linux", "Assembly", "GDB"]
        },
        {
            code: "CPSC 320",
            title: "Intermediate Algorithm Design and Analysis",
            description: "Advanced algorithmic techniques including greedy algorithms, dynamic programming, and graph algorithms providing core problem-solving skills for technical interviews and system design.",
            technologies: ["C++", "Python", "Algorithm Design"]
        },
        {
            code: "CPSC 317",
            title: "Internet Computing",
            description: "Network protocols and distributed computing including TCP/IP, HTTP, DNS, and socket programming essential for building scalable networked applications and understanding system-level communication.",
            technologies: ["Java", "TCP/IP", "HTTP", "DNS", "Socket Programming"]
        },
        {
            code: "CPSC 436S",
            title: "Cybersecurity",
            description: "Hands-on security engineering including web/server hardening, vulnerability analysis, network security, and scripting critical for building secure production systems.",
            technologies: ["Python", "Bash", "Cryptography", "Wireshark", "SQL"]
        },
        {
            code: "CPSC 310",
            title: "Introduction to Software Engineering",
            description: "Software engineering best practices including design patterns, testing strategies, code review, and team collaboration workflows.",
            technologies: ["TypeScript", "Git", "Testing Frameworks", "CI"]
        },
        {
            code: "CPSC 340",
            title: "Machine Learning and Data Mining",
            description: "Applied machine learning with focus on model evaluation, feature engineering, and practical deployment relevant for ML infrastructure and MLOps roles.",
            technologies: ["Python", "scikit-learn", "pandas", "NumPy"]
        },
        {
            code: "CPSC 304",
            title: "Introduction to Relational Databases",
            description: "Database design, SQL optimization, and schema design for scalable data storage foundational for backend systems and data-driven applications.",
            technologies: ["SQL", "PostgreSQL", "Database Design"]
        }
    ]

    return (
        <section id="education" className="py-20 px-6 bg-surface">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">Education</h2>
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-text-primary">University of British Columbia</h3>
                    <p className="text-lg text-text-secondary mt-1">Bachelor of Science in Computer Science</p>
                    <p className="text-text-secondary">2021 - 2025</p>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-text-primary">Simon Fraser University</h3>
                    <p className="text-lg text-text-secondary mt-1">Biological Sciences — Coursework Completed</p>
                    <p className="text-text-secondary">2019 – 2021</p>
                    <div className="mt-2">
                        <p className="text-sm text-text-secondary">
                            <span className="font-medium">Honours:</span> Dean's Honour List, President's Honour Roll
                        </p>
                        <p className="text-sm text-text-secondary">
                            <span className="font-medium">Awards:</span> Undergraduate Open Scholarship
                        </p>
                    </div>
                </div>

                <h4 className="text-xl font-semibold text-text-primary mb-6">Relevant Coursework</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((course, idx) => (
                        <div
                            key={idx}
                            className="bg-background border border-border rounded-lg p-5 hover:border-border-hover transition-all"
                        >
                            <h5 className="text-lg font-semibold text-text-primary mb-1">
                                {course.code}: {course.title}
                            </h5>
                            <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                                {course.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {course.technologies.map((tech, techIdx) => (
                                    <span
                                        key={techIdx}
                                        className="px-2 py-1 bg-surface border border-border rounded text-xs text-text-secondary"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
