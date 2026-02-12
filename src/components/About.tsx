export default function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">About</h2>
        <div className="text-lg text-text-secondary leading-relaxed space-y-4">
          <p>
            I started university pursuing medicine, studying biology like many in my family. Everything changed in a first-year chemistry course where I discovered bioinformatics—software that enabled chemists to simulate reactions and accelerate discovery. That moment sparked a deep appreciation for the power of technology. I enrolled in a computer science course as an elective, quickly discovered a passion for problem-solving, and redirected my career toward software engineering.
          </p>
          <p>
            Since then, I've built production systems with real impact. I designed and shipped a CI/CD pipeline using AWS, Terraform, and Fastlane that reduced iOS release time from 1 hour to 10 minutes. I built authentication systems across mobile and backend stacks using AWS Cognito, integrating React Native clients with Node.js APIs. During a UBC capstone project, I independently designed a complete CI/CD pipeline using Docker, GCP, and parallelized workflows—all while having no prior cloud experience at the start of the semester.
          </p>
          <p>
            I actively seek out unfamiliar challenges because I thrive on the growth that comes from solving problems outside my comfort zone. When I transitioned into mobile development during my DevOps internship, I had no React Native experience—but I quickly learned the framework and shipped a core authentication feature to production. I'm the type of engineer who turns unfamiliar problems into opportunities to contribute. Whether it's backend systems, cloud infrastructure, or DevOps pipelines, I believe in building solutions that are reliable, maintainable, and deliver measurable results.
          </p>
        </div>
      </div>
    </section>
  )
}
