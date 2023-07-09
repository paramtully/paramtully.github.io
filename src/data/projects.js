const projectTemplate = 
{
    title: null,
    position: null,
    detail: null,
    date: null,
    description: null,
    technologies: null,
    code_url: null,
    project_url: null,
    shortlist: true
};

const academicProjects = [
    {
        title: null,
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
        title: 'Blog Website on CI/CD Pipeline',
        position: 'Cloud DevOps Engineer + Software Engineer (Backend)',
        detail: 'Worked on Team of 9',
        date: 'Jan - May 2023',
        description: 'I fully implemented a CI/CD pipeline using GCP supporting 3 build environments, concurrent pushes from 6+ developers, and reduced build and deploy times by 300%. I also contributed to the backend team by choosing our techstack, creating the external design (UML) for the backend, and working on implementation details with team members.',
        technologies: ['GCP', 'Docker', 'GitHub Actions', 'Java', 'React', 'Node.js', 'Maven', 'Spring Boot', 'Cloud SQL', 'JUnit', 'mocha/chai', 'git'],
        code_url: null,
        project_url: null,
        shortlist: true
    },
    {
        title: 'Basketball League Tracker',
        position: null,
        detail: 'Worked on Team of 3',
        date: 'April 2023',
        description: "An application allowing users to check the stats of teams and players within their favourite basketball league. The database model was in EBNF format and contained relationships including weak entity sets and ISA hierarchies.",
        technologies: ['Java', 'Oracle SQL', 'Java Swing'],
        code_url: 'https://github.com/paramtully/AcademicProjects/tree/main/NBA-Stat-Tracker',
        project_url: null,
        shortlist: true
    },
    {
        title: 'Spotify Song Classification System',
        position: null,
        detail: null,
        date: 'April 2023',
        description: 'Trained a decision tree model to classify songs into one of several music genres based on data obtained from the Spotipy package.',
        technologies: ['Python3', 'Pandas', 'Numpy', 'sklearn', 'Decision Tree'],
        code_url: null,
        project_url: null,
        shortlist: true
    },
    {
        title: 'Insight UBC',
        position: 'Software Engineer (Backend)',
        detail: 'Worked on team of 3',
        date: 'Sept - Dec 2022',
        description: 'A full-stack web application that allows users to query UBCs historical grade data. The data is extracted and then processed from on html file using JSZip and stored in a local file.',
        technologies: ['TypeScript/JavaScript', 'JSZip', 'Express', 'Mocha/Chai', 'Yarn', 'HTML', 'Git'],
        code_url: null,
        project_url: null,
        shortlist: true
    },
    {
        title: 'Brute Force Password Decription',
        position: null,
        detail: null,
        date: 'April 2022',
        description: 'A multithreaded program that takes a hash and finds its associated password. This was accomplished by using a thread-pool to process possible passwords and semaphores to handle asynchronous events and prevent deadlocks.',
        technologies: ['C', 'Semaphores', 'Threads'],
        code_url: 'https://github.com/paramtully/AcademicProjects/tree/main/Brute-Force-Password-Decryption',
        project_url: null,
        shortlist: true
    },
    {
        title: 'Pruning Tree',
        position: null,
        detail: null,
        date: 'April 2022',
        description: 'Creates a binary tree representation of an image. Exploits tree structure to reduce memory usage by up to 100%.',
        technologies: ['C++'],
        code_url: 'https://github.com/paramtully/AcademicProjects/tree/main/PruningTree',
        project_url: null,
        shortlist: false
    },
    {
        title: 'Flood-Fill Animation',
        position: null,
        detail: null,
        date: 'March 2022',
        description: 'Constructed a series of functors that map the flood fill of an image using BFS/DFS. Created an array based stack to implement both a stack and a queue.',
        technologies: ['C++'],
        code_url: 'https://github.com/paramtully/AcademicProjects/tree/main/Flood-Fill-Animation',
        project_url: null,
        shortlist: false
    },
    {
        title: 'Social Media Application',
        position: null,
        detail: null,
        date: 'Oct - Dec 2021',
        description: "A device-bound social media application that modeled a full-stack web application. Included features such as adding and removing friends, posting to a profile, view other users' profiles, and direct messaging. A local JSON file was used to model a database. Bidirectional relationships within the Json file were efficiently handled by cleverly using class dependency structure and hashing.",
        technologies: ['Java', 'JUnit', 'Swing', 'JSON', 'Git'],
        code_url: 'https://github.com/paramtully/AcademicProjects/tree/main/SocialMediaAppV1',
        project_url: null,
        shortlist: true
    },
    {
        title: 'Matching Pairs Game',
        position: null,
        detail: null,
        date: 'April 2022',
        description: 'A comparison-based game utilizing linked lists to store and manipulate decks of cards, played through a CLI. Implemented an algorithm to randomly shuffle the cards in a linked list by swapping internal values at random indices.',
        technologies: ['C'],
        code_url: null,
        project_url: null,
        shortlist: false
    },
    {
        title: 'Predictive Machine Learning Model',
        position: null,
        detail: null,
        date: 'Nov 2022',
        description: 'Used a linear regression model to predict future values given an input CSV file. Animated the creation of a bar graph with Turtle.',
        technologies: ['Python', 'scikit-learn', 'Turtle'],
        code_url: null,
        project_url: null,
        shortlist: false
    },
];

const personalProjects = [
    {
        title: null,
        position: null,
        roll: null,
        date: null,
        description: null,
        technologies: null,
        code_url: null,
        project_url: null,
        shortlist: true
    },
    {
        title: 'GPA Calculator',
        position: null,
        roll: null,
        date: 'July 2022 – May 2023',
        description: "A full-stack web app that calculates a UBC student's GPA. This is accomplished by scraping their grade data from UBC's ssc website in a headless browser. Chooses one of several device metadatas for the headless browser to prevent bot detection.",
        technologies: ['Python3', 'React', 'Selenium', 'Yarn', 'Flask', 'C++'],
        code_url: 'https://github.com/paramtully/UBC_GPA_Retriever',
        project_url: null,
        shortlist: true
    },
    {
        title: 'Currency Converter',
        position: null,
        roll: null,
        date: 'July 2022',
        description: 'A simple frontend currency conversion application. Utilizes a public API to retrieve supported coutries and their conversion rates. Creates a drop-down from the supported countries countries. Sends API calls on form submissions and displays the returned value.',
        technologies: ['JavaScript', 'HTML', 'JSON'],
        code_url: 'https://github.com/paramtully/TechnicalProjects/tree/main/CurrencyConverter',
        project_url: null,
        shortlist: false
    },
    {
        title: 'Online Marketplace',
        position: null,
        roll: null,
        date: 'June - July 2022',
        description: 'A full-stack web application that allows users to list items, make bids, and comment on listings.',
        technologies: ['Django', 'HTML', 'Bootstrap (CSS)', 'SQLite'],
        code_url: 'https://github.com/paramtully/TechnicalProjects/tree/main/OnlineMarketplace',
        project_url: null,
        shortlist: true
    },
    {
        title: 'Brick Breaker Game',
        position: null,
        roll: null,
        date: 'Dec 2021',
        description: 'A recreation of a game from my childhood. The goal of the game is to break all of the bricks by intercepting the ball with a paddle and redirecting the ball to collide with the bricks. The game incorporated collision detection, random spawning of power-ups which can grant one of three bonuses: paddle extension, slow-mo balls, and multi-ball generation. The game also reduced coupling of score updating by using the observer pattern.',
        technologies: ['Java', 'JUnit', 'Swing'],
        code_url: 'https://github.com/paramtully/TechnicalProjects/tree/main/BrickBreakerPlus',
        project_url: null,
        shortlist: true
    },
    {
        title: 'Google Search Page',
        position: null,
        roll: null,
        date: 'July 2021',
        description: 'Recreated a fully functional Google Search page.',
        technologies: ['HTML', 'CSS'],
        code_url: 'https://github.com/paramtully/TechnicalProjects/tree/main/GoogleSearch',
        project_url: null,
        shortlist: true
    },
    {
        title: 'Tic-Tac-Toe Game',
        position: null,
        roll: null,
        date: 'May 2021',
        description: 'A single player game that competes against A.I. by using a brute force predictive algorithm involving arbitrary-arity trees and backtracking search.',
        technologies: ['Python', 'unittest'],
        code_url: null,
        project_url: null,
        shortlist: true
    },
]

export { academicProjects, personalProjects };