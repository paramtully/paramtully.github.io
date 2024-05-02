
const positions = [
    {
        title: null,
        title_url: null,
        position: null,
        detail: null,
        date: null,
        description: null,
        technologies: null,
        code_url: null,
        project_url: null,
        shortlist: true
    },
    {
        title: 'Invoke',
        title_url: 'https://invokedigital.co/',
        position: 'DevOps Engineer Co-op',
        detail: null,
        date: 'Sept 2023 - Dec 2023',
        description: "I worked on 2 major projects for Incrowd, a live-streaming mobile app. The first being an automated deployment pipeline to the IOS App Store which improved deploy speeds by 3x and no longer required manual intermediate steps. My second major project involved building a custom user authentication flow which will soon make it to production.",
        technologies: ['AWS', 'CircleCI', 'Terraform', 'React Native', 'GraphQL' ,'Fastlane'],
        code_url: null,
        project_url: "https://www.incrowd.live/",
        shortlist: true
    },
];

const positions_updated = [
    {
        title: null,
        position: null,
        summary: null,
        description: null,
        technologies: null,
        start_date: null,
        end_date: null,
        github_url: null,
        live_url: null,
        org_url: null
    },
    {
        title: 'Invoke',
        position: 'DevOps Engineer Co-op',
        summary: 'Built automated deployment pipeline for a React Native app, supporting multiple build environments and implemented login flow for the same app.',
        description: "I worked on 2 major projects for Incrowd, a live-streaming mobile app. The first being an automated deployment pipeline to the IOS App Store which improved deploy speeds by 3x and no longer requires manual intermediate steps. The pipeline supports running and reporting automated tests on feature branches, and additionally deployment of a beta or production version of the application depending on the environment. My second major project involved building a custom user login flow which will soon make it to production. I utilized AWS Amplify for it's API and implemented the client side logic to support it.",
        technologies: ['CircleCI', 'AWS Amplify', 'AWS S3', 'Fastlane', 'React Native', 'Terraform'],
        start_date: new Date(2023, 9),
        end_date: new Date(2023, 12),
        github_url: null,
        live_url: "https://www.incrowd.live/",
        org_url: 'https://invokedigital.co/',
    },
]

export { positions };