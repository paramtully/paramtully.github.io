export interface Project {
    id: string
    title: string
    description: string // 1-line outcome-focused
    techTags: string[]
    hardProblem: string // "Solved hard problem" teaser
    githubUrl?: string | null
    liveUrl?: string | null
    screenshots?: string[] // Array of image paths in public/images/projects/
    category: 'featured' | 'systems' | 'cloud-infra' | 'data'

    // Detail modal content
    overview: string
    problemContext: string
    whyItWasHard: string
    architecture?: string // Optional architecture description or diagram path
    keyDecisions: string[]
    reliability: string
    performance: string
    results: string
    futureImprovements?: string
    lessons: string
}

export const featuredProjects: Project[] = [
    {
        id: 'stock-analytics',
        title: 'Stock Analytics Platform',
        description: 'Event-driven platform ingesting 1M+ market events/day with 70-90% storage cost reduction via Parquet columnar formats and S3 lifecycle policies',
        techTags: ['TypeScript', 'React', 'PostgreSQL', 'AWS Lambda', 'ECS Fargate', 'RDS', 'S3', 'Terraform', 'Parquet'],
        hardProblem: 'Designed cost vs. isolation tradeoffs: separated internet-facing ingestion from VPC-isolated persistence, eliminated NAT Gateway costs using S3 VPC endpoints while keeping RDS in private subnets',
        githubUrl: 'https://github.com/paramtully/Stocker',
        liveUrl: null,
        screenshots: [],
        category: 'featured',
        overview: 'A production-grade stock analytics platform that ingests and processes over 1 million market events per day. The system handles real-time data ingestion, time-series storage optimization, and provides APIs for analytical workloads.',
        problemContext: 'Financial market data requires high-throughput ingestion, efficient long-term storage for analytical queries, and cost-effective infrastructure. Traditional approaches using JSON storage and always-on services result in high costs and poor query performance.',
        whyItWasHard: 'Balancing cost optimization with security isolation required careful architecture decisions. Implementing idempotent ingestion for correctness (especially stock-split reconciliation), designing VPC endpoints to eliminate NAT Gateway costs, and modeling time-series data for analytical workloads all required deep understanding of AWS services and data engineering principles.',
        keyDecisions: [
            'Used Parquet columnar format instead of JSON: 70-90% storage reduction, better query performance',
            'S3 partitioning strategy driven by query access patterns for optimal cost',
            'Separated public-facing ingestion (API Gateway + Lambda) from VPC-isolated persistence (RDS in private subnets)',
            'Used S3 VPC endpoints to eliminate NAT Gateway costs while maintaining security',
            'Implemented idempotent ingestion with stock-split detection and reconciliation',
            'Layered rate limiting: WAF + API Gateway quotas for abuse protection'
        ],
        reliability: 'Idempotent ingestion ensures no duplicate data even with retries. Event processing is failure-tolerant with proper error handling. JWT-based authentication with proper validation. Rate limiting prevents abuse and protects backend systems.',
        performance: 'Processes 1M+ events/day with Lambda auto-scaling. Parquet format enables efficient analytical queries. S3 lifecycle policies automatically move old data to cheaper storage tiers based on access patterns.',
        results: 'Achieved 70-90% reduction in long-term storage costs through Parquet format and S3 lifecycle policies. Eliminated NAT Gateway costs ($32-45/month) using S3 VPC endpoints. System handles production traffic with proper fault tolerance and abuse protection.',
        futureImprovements: 'Consider adding real-time streaming analytics with Kinesis. Implement caching layer for frequently accessed data. Add more sophisticated partitioning strategies based on query patterns.',
        lessons: 'Cost is a feature - explicit tradeoffs between isolation and cost can yield significant savings. Columnar formats are essential for analytical workloads. Idempotency is critical for data correctness in distributed systems.'
    },
    {
        id: 'distributed-kv',
        title: 'Distributed Key-Value Store',
        description: 'Linearizable distributed database in Go using Raft consensus with leader election, log replication, and snapshot-based recovery',
        techTags: ['Go', 'Raft', 'Distributed Systems'],
        hardProblem: 'Implemented fault-tolerant consensus ensuring linearizability guarantees under network partitions, node crashes, and concurrent client operations',
        githubUrl: null,
        liveUrl: null,
        screenshots: [],
        category: 'featured',
        overview: 'A distributed key-value store implementing the Raft consensus algorithm from scratch. Provides linearizable consistency guarantees and handles various failure scenarios including network partitions and node crashes.',
        problemContext: 'Distributed systems require consensus to maintain consistency across replicas. Raft provides a simpler alternative to Paxos while maintaining strong consistency guarantees. Implementing it correctly requires careful handling of leader election, log replication, and failure recovery.',
        whyItWasHard: 'Raft has subtle correctness requirements around leader election, log replication, and state machine application. Ensuring linearizability under concurrent operations, network partitions, and node failures requires careful state management and proper handling of edge cases in the consensus protocol.',
        keyDecisions: [
            'Implemented Raft consensus algorithm from scratch for educational purposes',
            'Used snapshot-based recovery to reduce log size and improve restart performance',
            'Separated consensus layer from state machine for clean architecture',
            'Implemented proper leader election with randomized timeouts to prevent split votes'
        ],
        reliability: 'Passes fault-injection tests for network partitions, node crashes, and concurrent client operations. Leader election ensures system continues operating even with node failures. Log replication ensures durability. Snapshot-based recovery handles node restarts efficiently.',
        performance: 'Linearizable operations provide strong consistency guarantees. Snapshot-based recovery reduces log size and improves restart time. Concurrent client operations are handled correctly with proper synchronization.',
        results: 'Successfully implemented Raft consensus passing all fault-injection tests. System maintains linearizability under various failure scenarios including network partitions and node crashes. Demonstrates deep understanding of distributed systems fundamentals.',
        futureImprovements: 'Could add dynamic membership changes. Implement log compaction for better performance. Add metrics and observability for production use.',
        lessons: 'Consensus algorithms have subtle correctness requirements that must be carefully implemented. Testing with fault injection is essential for distributed systems. Linearizability provides strong guarantees but requires careful coordination.'
    },
    {
        id: 'blog-cicd',
        title: 'Blog on CI/CD Pipeline',
        description: 'Independently designed and implemented CI/CD pipeline supporting 3 build environments and concurrent pushes from 6+ developers, reducing build and deploy times by 300%',
        techTags: ['GCP', 'Docker', 'GitHub Actions', 'Java', 'Spring Boot', 'JUnit'],
        hardProblem: 'Designed pipeline supporting multiple environments with proper isolation while enabling concurrent development workflows and automated testing',
        githubUrl: null,
        liveUrl: null,
        screenshots: [],
        category: 'featured',
        overview: 'Software Engineering Capstone project (team of 9) where I independently designed and implemented a complete CI/CD pipeline for a full-stack blog application. The pipeline supports multiple build environments and concurrent development workflows.',
        problemContext: 'The team needed a CI/CD pipeline that could support multiple developers working concurrently, multiple deployment environments (Dev, QA, Prod), and automated testing. Manual deployment processes were slow and error-prone.',
        whyItWasHard: 'Designing a pipeline that supports concurrent pushes from 6+ developers without conflicts, manages 3 separate build environments with proper isolation, and reduces build times by 300% required understanding of CI/CD best practices, Docker optimization, and parallel execution strategies.',
        keyDecisions: [
            'Designed pipeline with 3 phases: build, test, deployment',
            'Build and test phases run on all feature branches',
            'Deployment only runs on Dev, QA, and Prod branches after tests pass',
            'Used concurrency to parallelize independent build steps',
            'Automated merge from Dev to QA branch on successful Dev deployment',
            'Built backend REST API in Java/Spring Boot for article CRUD, authentication, and comments'
        ],
        reliability: 'Pipeline prevents deployment if automated tests fail. Proper environment isolation ensures Dev/QA/Prod don\'t interfere. Concurrent builds are handled correctly with proper resource management.',
        performance: 'Reduced build and deploy times by 300% through parallelization and Docker layer optimization. Pipeline supports concurrent pushes from 6+ developers without conflicts.',
        results: 'Successfully deployed pipeline supporting 3 build environments and concurrent development. Reduced build and deploy times by 300%. Built production backend API handling article CRUD operations, user authentication, and comment management.',
        futureImprovements: 'Could add blue-green deployments for zero-downtime. Implement canary deployments for safer production releases. Add more comprehensive monitoring and alerting.',
        lessons: 'CI/CD pipelines are critical infrastructure that enable team productivity. Proper design can dramatically reduce deployment times. Automation and testing are essential for reliable deployments.'
    },
    {
        id: 'oauth2',
        title: 'oAuth2.0 Implementation',
        description: 'Implemented oAuth2.0 protocol from scratch with authentication server, token management, and full-stack application integration',
        techTags: ['TypeScript', 'React', 'DynamoDB', 'Express.js', 'JWT', 'Crypto'],
        hardProblem: 'Implemented secure token-based authentication with proper password hashing, asymmetric encryption for token signatures, and refresh token rotation',
        githubUrl: 'https://github.com/paramtully/oAuth',
        liveUrl: null,
        screenshots: [],
        category: 'featured',
        overview: 'A complete implementation of the oAuth2.0 authentication protocol from scratch. Includes an authentication server for credential management and session handling, plus a full-stack application demonstrating oAuth integration.',
        problemContext: 'Understanding authentication and authorization protocols is fundamental for backend engineers. Implementing oAuth2.0 from scratch provides deep understanding of security best practices, token management, and session handling.',
        whyItWasHard: 'Implementing secure authentication requires understanding cryptographic primitives (password hashing with salt, asymmetric encryption for signatures), proper token lifecycle management, refresh token rotation, and preventing common security vulnerabilities like token replay attacks.',
        keyDecisions: [
            'Separated authentication server from application for proper security boundaries',
            'Used JWT with asymmetric signatures (RS256) for token verification',
            'Implemented password hashing with salt server-side before storage',
            'Added refresh token rotation for enhanced security',
            'Used DynamoDB for scalable credential and session storage',
            'Implemented proper token expiration (10s access tokens, 60s refresh tokens for demo)'
        ],
        reliability: 'Proper password hashing prevents credential exposure if database is compromised. Asymmetric token signatures allow verification without sharing secrets. Token expiration limits attack window. Refresh token rotation prevents token reuse.',
        performance: 'Stateless JWT tokens enable horizontal scaling. DynamoDB provides low-latency credential lookups. Token-based authentication eliminates need for server-side session storage.',
        results: 'Successfully implemented oAuth2.0 protocol demonstrating understanding of authentication security. Full-stack integration shows end-to-end system thinking. Proper use of cryptographic primitives and security best practices.',
        futureImprovements: 'Could add multi-factor authentication. Implement OAuth2.0 authorization code flow for third-party integrations. Add rate limiting for brute-force protection.',
        lessons: 'Security is not optional - proper password hashing and token management are essential. Understanding cryptographic primitives is crucial for backend engineers. Authentication protocols have subtle security requirements that must be implemented correctly.'
    }
]

export const allProjects: Project[] = [
    {
        id: 'brute-force-password',
        title: 'Brute Force Password Decryption',
        description: 'Implemented production-grade multithreaded password cracking system in C using thread pools and semaphore-based synchronization',
        techTags: ['C', 'Threads', 'Semaphores', 'Concurrency'],
        hardProblem: 'Engineered thread-safe concurrent processing with semaphores to prevent deadlocks and data races while maximizing CPU utilization across thread pool',
        githubUrl: 'https://github.com/paramtully/AcademicProjects/tree/main/Brute-Force-Password-Decryption',
        liveUrl: null,
        screenshots: [],
        category: 'systems',
        overview: 'A multithreaded password cracking system that takes a hash and finds its associated password using brute force. Implemented from scratch using C with thread pools and semaphores for safe concurrent processing.',
        problemContext: 'Password hashing systems require high-performance parallel processing to test password candidates efficiently. This project demonstrates systems-level programming with careful attention to concurrency primitives and performance optimization.',
        whyItWasHard: 'Managing shared state across threads requires careful synchronization to prevent deadlocks, race conditions, and ensure correctness while maintaining high throughput. Thread pool architecture must efficiently distribute work while handling completion and early termination scenarios.',
        keyDecisions: [
            'Thread pool architecture for efficient work distribution across cores',
            'Semaphore-based producer-consumer pattern for task queuing',
            'Careful memory management in C to prevent leaks and corruption',
            'Early termination mechanism when password found to avoid wasted work',
            'Protection of shared state with proper locking strategies'
        ],
        reliability: 'Thread-safe implementation prevents race conditions and deadlocks. Proper semaphore usage ensures correct synchronization. Memory management prevents leaks and corruption.',
        performance: 'Thread pool maximizes CPU utilization across available cores. Producer-consumer pattern enables efficient work distribution. Early termination prevents unnecessary computation.',
        results: 'Successfully implemented concurrent password cracking demonstrating deep understanding of systems programming, thread safety, and performance optimization. Showcases ability to work with low-level concurrency primitives.',
        futureImprovements: 'Could add GPU acceleration for massive parallelism. Implement work stealing for better load balancing. Add support for different hashing algorithms.',
        lessons: 'Concurrency primitives require careful design to avoid deadlocks and race conditions. Thread pools are essential for CPU-bound parallel workloads. Systems programming demands attention to memory management and performance.'
    },
    {
        id: 'gpa-retriever',
        title: 'GPA Retriever',
        description: 'Engineered automated web scraping pipeline using Selenium to extract and process academic data from authenticated university portal, reducing manual GPA calculation from minutes to seconds',
        techTags: ['Python', 'Selenium', 'Flask', 'React', 'C++'],
        hardProblem: 'Bypassed bot detection mechanisms by implementing device metadata rotation and session management for headless browser automation',
        githubUrl: 'https://github.com/paramtully/UBC_GPA_Retriever',
        liveUrl: null,
        screenshots: [],
        category: 'systems',
        overview: 'A full-stack web scraping application that automates the process of logging into UBC\'s website, navigating to grade data, extracting it, and calculating GPA metrics. Solves a real student pain point where the university doesn\'t provide built-in GPA calculation.',
        problemContext: 'UBC\'s SSC website doesn\'t provide GPA calculation functionality, requiring students to manually compute their GPA from scattered grade data across multiple pages. This project automates the entire process using web scraping.',
        whyItWasHard: 'Navigating authenticated sessions in headless browsers while handling dynamic JavaScript-rendered content. Evading bot detection systems that universities employ. Managing browser state across multiple page navigations. Building reliable automation that handles edge cases and errors gracefully.',
        keyDecisions: [
            'Selenium for reliable browser automation and JavaScript rendering',
            'Device metadata rotation to bypass bot detection systems',
            'Flask backend API for processing and calculation logic',
            'React frontend for user-friendly interface (discontinued due to ToS)',
            'C++ CLI wrapper reducing command execution by 438% for personal use',
            'Headless browser configuration for performance'
        ],
        reliability: 'Handles authentication edge cases and session management. Gracefully handles network errors and timeouts. Validates scraped data for correctness.',
        performance: 'Reduces manual GPA calculation from several minutes to seconds. Automated navigation eliminates human error. Efficient data extraction and processing.',
        results: 'Successfully automated GPA calculation solving real user pain point. Originally built as full-stack web app but pivoted to CLI tool after learning it violated university ToS. Demonstrates practical problem-solving and full-stack engineering skills.',
        futureImprovements: 'Could add support for other universities. Implement caching to reduce repeated scraping. Add grade trend analysis and predictions.',
        lessons: 'Always verify Terms of Service before deploying user-facing applications. Web scraping requires robust error handling and anti-detection strategies. Practical tools that solve real problems demonstrate engineering impact.'
    },
    {
        id: 'social-media-app',
        title: 'Social Media Application',
        description: 'Built feature-complete social media platform in Java with bidirectional relationship modeling in JSON storage, solving complex serialization challenge using custom hash-based reconstruction',
        techTags: ['Java', 'JUnit', 'Java Swing', 'JSON', 'Design Patterns'],
        hardProblem: 'Architected bidirectional graph relationships in JSON (which lacks native references) using dependency injection and hash-based reconstruction with O(1) amortized lookup time',
        githubUrl: 'https://github.com/paramtully/AcademicProjects/tree/main/SocialMediaAppV1',
        liveUrl: null,
        screenshots: [],
        category: 'systems',
        overview: 'A device-bound social media application modeling Facebook\'s core features including friend management, profile posts, profile viewing, and direct messaging. Built entirely in Java with JSON-based local storage, requiring creative solutions for relationship modeling.',
        problemContext: 'Building a social media application with bidirectional relationships (friend connections, message threads) using only JSON for storage presents unique challenges since JSON doesn\'t natively support object references or circular dependencies.',
        whyItWasHard: 'JSON doesn\'t support object references or bidirectional relationships. Storing circular dependencies (e.g., User A friends with User B means B is also friends with A) requires careful serialization/deserialization strategy. Must maintain referential integrity while enabling efficient lookups.',
        keyDecisions: [
            'Exploited class dependency structure for parent-to-child object passing',
            'Hash table-based reconstruction for cross-references with O(1) lookups',
            'Strategic use of object IDs as hash keys in JSON',
            'Bidirectional relationship consistency through careful state management',
            'Java Swing for desktop GUI with event-driven architecture',
            'Comprehensive JUnit test suite for relationship integrity'
        ],
        reliability: 'Maintains referential integrity across relationship updates. Hash-based reconstruction ensures consistent state after deserialization. Unit tests verify correctness of bidirectional relationships.',
        performance: 'O(1) amortized lookup time for relationships using hash tables. Efficient serialization/deserialization for local storage. Responsive UI through proper event handling.',
        results: 'Successfully implemented Facebook-like features with creative solution to JSON\'s lack of reference support. Demonstrates data structure expertise, algorithmic thinking, and ability to work within constraints.',
        futureImprovements: 'Could migrate to proper database (PostgreSQL) for scalability. Add real-time features with WebSockets. Implement privacy controls and permissions.',
        lessons: 'Creative data structure design can overcome format limitations. Bidirectional relationships require careful state management. Understanding language and format constraints drives architectural decisions.'
    },
    {
        id: 'insight-ubc',
        title: 'Insight UBC',
        description: 'Developed full-stack TypeScript application for querying historical academic data with custom EBNF-based query language and Visitor design pattern implementation',
        techTags: ['TypeScript', 'JSZip', 'Express', 'Mocha/Chai', 'Design Patterns'],
        hardProblem: 'Implemented Visitor design pattern with double dispatch for extensible query operations, enabling clean separation between data model and query execution logic',
        githubUrl: null,
        liveUrl: null,
        screenshots: [],
        category: 'systems',
        overview: 'A full-stack web application that allows users to query UBC\'s historical grade data extracted from zipped HTML files. Features a custom query language defined in EBNF format and demonstrates advanced software design patterns.',
        problemContext: 'Processing complex hierarchical grade data from compressed HTML files while supporting flexible querying requires formal language specification and clean architecture. The project required following strict EBNF-formatted requirements.',
        whyItWasHard: 'Parsing nested data structures from HTML within ZIP files. Implementing formal language specification (EBNF) for query syntax. Maintaining type safety across recursive query operations. Designing extensible architecture that allows adding new operations without modifying existing code.',
        keyDecisions: [
            'Visitor design pattern for AST traversal with double dispatch',
            'JSZip for efficient compressed file handling',
            'Express REST API for backend query processing',
            'Recursive query evaluation maintaining type safety',
            'Comprehensive Mocha/Chai test coverage for correctness',
            'Proper separation of parsing, validation, and execution concerns'
        ],
        reliability: 'Type-safe query execution prevents runtime errors. Comprehensive test suite ensures correctness. Visitor pattern enables verified extensibility.',
        performance: 'Efficient ZIP file parsing with streaming. Query optimization through proper indexing. Express provides scalable API layer.',
        results: 'Successfully implemented query system demonstrating mastery of design patterns and ability to work with formal specifications. Shows understanding of language design and compiler concepts.',
        futureImprovements: 'Could add query optimization layer. Implement caching for frequently accessed data. Add more sophisticated query features like joins and aggregations.',
        lessons: 'Design patterns solve real architectural problems. Visitor pattern is powerful for operations on complex data structures. Formal specifications require careful implementation and testing.'
    },
    {
        id: 'nba-stat-tracker',
        title: 'NBA Stat Tracker',
        description: 'Designed and implemented complex relational database with 11 entity sets (including weak entities and ISA hierarchies) in Oracle SQL with Java frontend',
        techTags: ['Java', 'Oracle SQL', 'Java Swing', 'Database Design'],
        hardProblem: 'Modeled complex sports domain with weak entities, ISA hierarchies, and referential integrity constraints while maintaining query performance for analytical workloads',
        githubUrl: 'https://github.com/paramtully/AcademicProjects/tree/main/NBA-Stat-Tracker',
        liveUrl: null,
        screenshots: [],
        category: 'data',
        overview: 'An NBA statistics tracking application built on a complex relational database model. Features sophisticated entity-relationship design with weak entities, ISA hierarchies, and comprehensive constraint enforcement.',
        problemContext: 'Representing the NBA ecosystem (players, teams, games, statistics, contracts) requires sophisticated relational modeling with proper constraint enforcement. The domain includes complex many-to-many relationships, temporal dimensions for historical stats, and inheritance hierarchies.',
        whyItWasHard: 'Complex many-to-many relationships across multiple entities. Historical stat tracking requires temporal dimension handling. ISA hierarchies for player type specialization. Maintaining referential integrity across cascading updates. Balancing normalization with query performance for analytics.',
        keyDecisions: [
            'EBNF-based database schema design with formal specification',
            'ISA hierarchies for player role specialization (guards, forwards, centers)',
            'Weak entity sets for dependent relationships',
            'Strategic indexing for common query patterns',
            'Cardinality and participation constraint enforcement',
            'Java Swing frontend with SQL query generation',
            'Proper foreign key relationships with cascade rules'
        ],
        reliability: 'Referential integrity enforced through foreign key constraints. Cardinality constraints prevent invalid states. Participation constraints ensure data completeness.',
        performance: 'Strategic indexing optimizes common queries. Normalized schema reduces data redundancy. Efficient join operations through proper relationship modeling.',
        results: 'Successfully modeled complex sports domain with 11 entity sets and 11 relationships. Demonstrates expertise in database design, normalization, and constraint modeling.',
        futureImprovements: 'Could add materialized views for complex analytics. Implement query optimization hints. Add full-text search for player names.',
        lessons: 'Proper database design requires understanding domain relationships deeply. ISA hierarchies model inheritance elegantly. Constraints are crucial for data integrity. Normalization must balance with query performance needs.'
    },
    {
        id: 'spotify-classification',
        title: 'Spotify Song Classification System',
        description: 'Trained Random Forest classifier achieving 75% accuracy on 5-class genre prediction using Spotify audio features with scikit-learn',
        techTags: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Machine Learning'],
        hardProblem: 'Achieved 75% multi-class accuracy through feature engineering and ensemble methods; identified potential improvements using MDS visualization and alternative models',
        githubUrl: null,
        liveUrl: null,
        screenshots: [],
        category: 'data',
        overview: 'A machine learning project that classifies songs into genres based on Spotify audio features. Uses Random Forest classifier with cross-validation for hyperparameter tuning, demonstrating ML pipeline development from data cleaning through model evaluation.',
        problemContext: 'Predicting song genre from audio features presents challenges including high-dimensional feature space, potential class imbalance, and selecting appropriate features and model architecture for multi-class classification.',
        whyItWasHard: 'High-dimensional feature space with many potentially irrelevant features. Multi-class classification (5 genres) more challenging than binary. Class imbalance requiring careful evaluation metrics. Hyperparameter tuning across large search space.',
        keyDecisions: [
            'Random Forest for ensemble learning and feature importance',
            'Cross-validation for robust hyperparameter tuning',
            'Manual feature selection based on domain knowledge',
            'Scikit-learn pipeline for reproducible ML workflow',
            'Multi-class evaluation metrics (accuracy, precision, recall per class)',
            'Cleaned dataset removing irrelevant features like artist names'
        ],
        reliability: 'Cross-validation ensures model generalizes beyond training data. Proper train/test split prevents overfitting. Feature selection reduces noise.',
        performance: 'Achieved 75% accuracy on 5-class genre prediction. Random Forest provides feature importance insights. Ensemble method robust to overfitting.',
        results: 'Successfully built ML classification pipeline achieving 75% accuracy. Demonstrates understanding of ML fundamentals, feature engineering, and model selection. Reflective analysis shows growth mindset.',
        futureImprovements: 'Use forward selection or ensemble feature selection instead of manual selection. Apply MDS for dimensionality reduction and visualization. Try KNN for convex clusters, DBSCAN for non-convex clusters with outliers, or Multi-class SVM. Add precision-recall analysis per genre.',
        lessons: 'Feature selection is critical for ML performance. Ensemble methods provide robustness. Retrospective analysis and identifying improvements demonstrates engineering maturity. Understanding when different algorithms (KNN, DBSCAN, SVM) might work better shows algorithmic depth.'
    }
]
