export interface Experience {
    company: string
    position: string
    startDate: Date
    endDate: Date
    companyUrl?: string
    projectUrl?: string
    impactBullets: string[]
    technologies: string[]
}

export const experiences: Experience[] = [
    {
        company: 'Invoke',
        position: 'DevOps Engineer Intern',
        startDate: new Date(2023, 8), // Sept 2023
        endDate: new Date(2023, 11), // Dec 2023
        companyUrl: 'https://invokedigital.co/',
        projectUrl: 'https://www.incrowd.live/?utm_source=chatgpt.com',
        impactBullets: [
            'Designed and built a reusable CI/CD pipeline with Fastlane automating iOS builds, signing, and App Store deployments, reducing release time from 1 hour to 10 minutes and eliminating several manual deployment steps',
            'Shipped production authentication across mobile and backend stacks using AWS Cognito with federated identity (Google, Facebook, Apple), integrating React Native clients with a Node.js API',
            'Improved CI/CD reliability, security, and performance by parallelizing test execution, optimizing Docker build layers, and migrating secrets from environment variables to AWS Secrets Manager',
            'Provisioned and versioned cloud infrastructure using Terraform, enabling reproducible environments and safer deployment workflows'
        ],
        technologies: ['AWS', 'Terraform', 'Docker', 'Fastlane', 'React Native', 'TypeScript', 'CircleCI']
    }
]
