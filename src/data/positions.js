
const positions_legacy = [
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

const positions = [
    {
        title: 'Invoke',
        position: 'DevOps Engineer Co-op',
        summary: 'Designed and built automated deployment pipeline and login/logout pages for a react native mobile app',
        description: [
            "I worked on 2 major projects for Incrowd, a live-streaming mobile app during my 4 month co-op term.",
            "The first project was an automated testing and deployment pipeline for the app to the IOS App Store. The pipeline improved deploy speeds by 300% and eliminated the manual process that was previously used to carry out the same task. The pipeline runs and reports automated tests on all branches and additionally deploys a beta or production version of the application on the QA and Prod branches respectively. This process is triggered on pushes or merges to the project repository and prevents the deployment steps if the automated tests fail for robustness.",
            "During the building of the project, I focused on 3 things: maintainability, robustness, and security. I made the code as maintainable as possible by compartmentalizing code, which in the case of deployment involved making well-named and simple fastlane functions and circleCI processes. This allows code to easily be modified or removed if needed. I also created documentation using visualization tools such Miro both to help me design the pipeline, so others can easily gain the information they need to work on it in the future. Robustness was maintained with deployment steps being dependent on success of automated tests. Finally, security was maintained by assuring secrets were not pushed to the repository or hard coded anywhere in the code. Github secrets, CircleCI secrets, and AWS S3 with IAM permissions were tools I utilized to ensure security.",
            "My second major project involved building a custom user login flow. I utilized AWS Amplify's Cognito library for its API and implemented the client-side logic from scratch with Typescript and React to support custom styling and features. The feature is currently live on the production version of the app!",
        ],
        technologies: ['AWS', 'CircleCI', 'Fastlane', 'React Native', 'Terraform'],
        start_date: new Date(2023, 8),
        end_date: new Date(2023, 11),
        github_url: null,
        live_url: "https://www.incrowd.live/",
        org_url: 'https://invokedigital.co/',
    },
]

export { positions_legacy, positions };