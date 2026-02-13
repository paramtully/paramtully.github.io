export interface TechnicalDetail {
    heading: string
    context: string
}

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
    whyItWasHard: TechnicalDetail[]
    architecture?: string // Optional architecture description or diagram path
    keyDecisions: TechnicalDetail[]
    reliability: string
    performance: string
    results: string
    futureImprovements?: string
    lessons: string
}

export const featuredProjects: Project[] = [
    {
        id: 'multi-vendor-vertical-saas',
        title: 'Multi-Vendor B2B Marketplace (Active Development)',
        description: 'SaaS marketplace aggregating inventory across fragmented B2B suppliers in a $100B+ vertical. This project involves aggregating live listings of products and streamlining search in a context absent of standardized identification.',
        techTags: ['Next.js', 'TypeScript', 'React', 'PostgreSQL', 'Drizzle ORM', 'Zod', 'DDD', 'Vercel', 'Supabase'],
        hardProblem: 'Built a canonical product identity layer from inconsistent vendor data while ensuring real-time listing integrity, deduplication, and protection against taxonomy corruption.',
        githubUrl: null,
        liveUrl: null,
        screenshots: [],
        category: 'featured',
        overview: 'Active development: Building a two-sided B2B marketplace for a fragmented supply chain vertical. Current focus is the data ingestion pipeline with canonical product identity resolution across heterogeneous vendor schemas. Database schema and domain model complete; streaming ingestion layer in progress.',
        problemContext: 'Buyers in this vertical waste 15-30+ days sourcing across disconnected vendor systems with no unified search or ordering layer. The supplier ecosystem is highly heterogeneous: inconsistent schemas, varying APIs, no standardized product identification. Buyers are also cash-flow constrained, creating a natural wedge for embedded financing tied to purchase orders.',
        whyItWasHard: [
            {
                heading: 'Canonical Product Identity',
                context: 'No standardized product IDs across vendors; must resolve diverse schemas and identifiers to a unified product model'
            },
            {
                heading: 'Memory-Constrained Streaming',
                context: 'Processing 100K+ listings per vendor without loading entire catalogs into memory; requires backpressure control'
            },
            {
                heading: 'Idempotent Ingestion',
                context: 'Ensuring financial-grade correctness with safe retries, resumable processing, and no data corruption under network failures'
            },
            {
                heading: 'Fault Isolation',
                context: 'Preventing one problematic vendor from cascading failures across the entire ingestion pipeline using circuit breakers'
            },
            {
                heading: 'Search Performance',
                context: 'Achieving sub-3s latency over aggregated multi-vendor inventory with complex filtering requirements'
            },
            {
                heading: 'Schema Heterogeneity',
                context: 'Normalizing incompatible vendor data structures while tolerating schema drift over time'
            }
        ],
        keyDecisions: [
            {
                heading: 'PostgreSQL Schema Design',
                context: 'Partial unique indexes handle nullable vendor identifiers while maintaining referential integrity for canonical product matching'
            },
            {
                heading: 'Domain-Driven Design',
                context: 'Clean entity boundaries separate product identity, vendor adapters, and listing lifecycle with isolated business logic'
            },
            {
                heading: 'Zod Validation with Passthrough',
                context: 'Schema validation tolerates drift when vendors add new fields, preventing pipeline failures on unexpected data'
            },
            {
                heading: 'Streaming Architecture (In Progress)',
                context: 'Async iterators with backpressure control process 100K+ listings without memory bloat or OOM errors'
            },
            {
                heading: 'SHA-256 Change Detection (Planned)',
                context: 'Payload fingerprinting identifies changed listings to skip redundant writes when scaling to N vendors'
            },
            {
                heading: 'Circuit Breakers (Planned)',
                context: 'Per-vendor fault isolation with exponential backoff and jitter prevents retry storms and cascading failures'
            }
        ],
        reliability: 'Single-writer model with vendor-level locking prevents concurrent ingestion conflicts. Circuit breakers isolate individual vendor failures so that one bad vendor doesn\'t take down the system. Individual listing errors don\'t abort vendor-wide ingestion. Documented failure modes across 5 categories: race conditions, idempotency violations, retry storms, silent failures, and data corruption.',
        performance: 'Target architecture: Streaming ingestion with constant memory footprint (100K+ listings/vendor), change detection to eliminate redundant writes, materialized views for sub-3s search latency, cursor-based pagination for resumable ingestion.',
        results: 'Currently operational: Database schema with domain-driven entity model. In development: Streaming ingestion pipeline. This project demonstrates systems thinking around distributed patterns (idempotency, circuit breakers, eventual consistency), complex domain modeling (product identity resolution, compatibility graphs), and production reliability engineering (failure mode analysis, fault isolation design).',
        futureImprovements: 'Event sourcing for real-time inventory streaming. Vendor performance scoring from delivery and defect data. Recommendation engine leveraging transaction history. Predictive demand forecasting. Multi-tenancy for enterprise buyer chains.',
        lessons: 'Canonical identity resolution is harder than it looks in fragmented ecosystems. Streaming architectures essential for memory-constrained ingestion. Idempotency requires careful thinking about concurrent writers and partial failures. Circuit breakers are critical for multi-vendor fault isolation. Domain-driven design enforces boundaries that enable iteration.'
    },
    {
        id: 'stock-analytics',
        title: 'Cloud-Native Stock Analytics Platform',
        description: 'A platform to track your stock portfolio performance and get real time stock and news data with AI generated recommendations. Uses 15+ microservices processing 1M+ market events/day through event-driven AWS pipelines.',
        techTags: ['TypeScript', 'Terraform', 'AWS Lambda', 'ECS Fargate', 'PostgreSQL', 'S3', 'Parquet', 'EventBridge', 'React', 'OpenAI', 'WAF', 'Cognito', 'API Gateway', 'GitHub Actions'],
        hardProblem: 'Designed two-stage Lambda architecture to eliminating NAT Gateway costs while maintaining database security. Built idempotent stock-split reconciliation across historical time-series data.',
        githubUrl: 'https://github.com/paramtully/Stocker',
        liveUrl: null,
        screenshots: ['/images/projects/stocker-1.png', '/images/projects/stocker-2.png', '/images/projects/stocker-3.png', '/images/projects/stocker-4.png', '/images/projects/stocker-5.png'],
        category: 'featured',

        overview: 'Cloud-native stock portfolio platform built end-to-end: 15+ microservices and Lambda functions, event-driven data pipelines processing 1M+ market events daily, AI-powered news summarization via OpenAI GPT, and production AWS infrastructure defined in 15+ Terraform modules. Full-stack React SPA with Cognito auth, role-based access, multi-layered rate limiting, and automated CI/CD via GitHub Actions.',

        problemContext: 'Financial market data requires high-throughput ingestion from external APIs, efficient long-term storage for analytical queries, and cost-effective cloud infrastructure. Traditional approaches: JSON storage, always-on servers, VPC-connected Lambdas for external API calls. Result: high costs (NAT Gateway alone ~$32-45/month) and poor query performance at scale.',

        whyItWasHard: [
            {
                heading: 'Two-Stage Lambda Architecture',
                context: 'Designing architecture that isolates RDS in private subnet while avoiding NAT Gateway costs for internet-facing ingestion'
            },
            {
                heading: 'Idempotent Pipelines',
                context: 'Building pipelines with stock-split detection and historical data reconciliation that handle retries safely'
            },
            {
                heading: 'Service Orchestration',
                context: 'Coordinating 15+ services with event-driven scheduling and proper failure handling across the system'
            },
            {
                heading: 'LLM Integration',
                context: 'Integrating OpenAI GPT news summarization with token-aware batching and fallback mechanisms for API failures'
            },
            {
                heading: 'Infrastructure as Code',
                context: 'Defining entire AWS infrastructure across 15+ Terraform modules with automated CI/CD deployment'
            }
        ],

        keyDecisions: [
            {
                heading: 'Two-Stage Lambda Architecture',
                context: 'Internet-facing Lambdas (no VPC) ingest from external APIs → write Parquet to S3 → VPC-isolated Lambdas read via S3 VPC endpoints and write to RDS. Eliminates NAT Gateway while keeping database in private subnets'
            },
            {
                heading: 'Lambda + ECS Fargate Hybrid',
                context: 'Lambda for short-lived event-driven tasks (daily ingestion, API); ECS Fargate for long-running historical loads exceeding Lambda\'s 15-min timeout'
            },
            {
                heading: 'Parquet over JSON',
                context: '70-90% compression, columnar queries for analytics, schema evolution support. Year-based S3 partitioning aligned with query patterns and lifecycle policies'
            },
            {
                heading: 'Idempotent Ingestion',
                context: 'Composite primary keys with upsert conflict resolution. Stock-split detection uses S3-based state management with two-phase fetch → apply pattern'
            },
            {
                heading: 'Multi-Layered Rate Limiting',
                context: 'WAF IP-based rules (100 req/5min unauthenticated, 1,000/5min authenticated) + API Gateway stage throttling (50 req/sec sustained, 100 burst)'
            },
            {
                heading: '7-Day Rolling Window',
                context: 'Balances data freshness with compute cost; handles late-arriving data without reprocessing entire history'
            },
            {
                heading: 'Monorepo with npm Workspaces',
                context: 'Shared TypeScript types across 15+ packages with clean, acyclic dependency graph for type safety'
            },
            {
                heading: 'AI News Pipeline',
                context: 'OpenAI GPT summarization with token-aware batching, sentiment analysis, and fallback mechanisms for API failures'
            }
        ],
        reliability: 'Idempotent ingestion prevents duplicates across retries. EventBridge scheduling with failure handling ensures pipeline continuity. Cognito JWT auth with role-based access control (user, admin, guest). Automatic guest user cleanup via scheduled Lambda. WAF + API Gateway rate limiting provides defense-in-depth.',
        performance: 'Processes 1M+ events/day with Lambda auto-scaling and ECS Fargate for burst historical loads. Parquet columnar format enables efficient analytical queries. S3 lifecycle policies archive old partitions to cheaper tiers. 7-day rolling windows minimize per-run compute. TanStack Query provides client-side caching for responsive UI.',
        results: 'Shipped end-to-end: 15+ orchestrated services, 15+ Terraform modules, CI/CD pipeline (GitHub Actions → Docker → ECR → ECS), production auth, and multi-layered security. Eliminated NAT Gateway costs (~$32-45/month) via two-stage Lambda architecture. Achieved 70-90% storage reduction with Parquet. AI news pipeline processes and summarizes articles with token-aware batching. Full admin dashboard with user metrics and system health monitoring.',
        futureImprovements: 'Real-time streaming with Kinesis for sub-minute data freshness. Redis caching layer for hot query paths. Advanced partitioning strategies based on observed access patterns. Expanded test coverage with integration and load testing.',
        lessons: 'Cost is a first-class architectural concern. The two-stage Lambda pattern saved meaningful infrastructure spend with minimal added complexity. Hybrid compute (Lambda + ECS) optimizes for different workload durations. Parquet pays dividends in both storage cost and query performance. Infrastructure as Code is non-negotiable for reproducible cloud environments. Monorepo structure enables type-safe sharing across services but demands disciplined dependency management.'
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
        whyItWasHard: [
            {
                heading: 'Raft Correctness Requirements',
                context: 'Subtle edge cases in leader election, log replication, and state machine application that must be handled precisely'
            },
            {
                heading: 'Linearizability Under Failures',
                context: 'Ensuring strong consistency guarantees under concurrent operations, network partitions, and node failures'
            },
            {
                heading: 'State Management',
                context: 'Careful coordination of persistent state, volatile state, and state machine application with proper synchronization'
            },
            {
                heading: 'Consensus Protocol Edge Cases',
                context: 'Handling split votes, term transitions, log conflicts, and snapshot recovery without violating safety properties'
            }
        ],
        keyDecisions: [
            {
                heading: 'Raft from Scratch',
                context: 'Implemented consensus algorithm from first principles for deep educational understanding of distributed systems'
            },
            {
                heading: 'Snapshot-Based Recovery',
                context: 'Reduces log size and improves restart performance by periodically compacting applied state'
            },
            {
                heading: 'Consensus Layer Separation',
                context: 'Clean architecture separates Raft consensus logic from key-value state machine for modularity and testing'
            },
            {
                heading: 'Randomized Election Timeouts',
                context: 'Prevents split votes during leader election by randomizing timeout intervals across nodes'
            }
        ],
        reliability: 'Passes fault-injection tests for network partitions, node crashes, and concurrent client operations. Leader election ensures system continues operating even with node failures. Log replication ensures durability. Snapshot-based recovery handles node restarts efficiently.',
        performance: 'Linearizable operations provide strong consistency guarantees. Snapshot-based recovery reduces log size and improves restart time. Concurrent client operations are handled correctly with proper synchronization.',
        results: 'Successfully implemented Raft consensus passing all fault-injection tests. System maintains linearizability under various failure scenarios including network partitions and node crashes. Demonstrates deep understanding of distributed systems fundamentals.',
        futureImprovements: 'Could add dynamic membership changes. Implement log compaction for better performance. Add metrics and observability for production use.',
        lessons: 'Consensus algorithms have subtle correctness requirements that must be carefully implemented. Testing with fault injection is essential for distributed systems. Linearizability provides strong guarantees but requires careful coordination.'
    }
]

export const allProjects: Project[] = [
    {
        id: 'oauth2',
        title: 'oAuth2.0 Implementation',
        description: 'Implemented oAuth2.0 protocol from scratch with authentication server, token management, and full-stack application integration',
        techTags: ['TypeScript', 'React', 'DynamoDB', 'Express.js', 'JWT', 'Crypto'],
        hardProblem: 'Implemented secure token-based authentication with proper password hashing, asymmetric encryption for token signatures, and refresh token rotation',
        githubUrl: 'https://github.com/paramtully/oAuth',
        liveUrl: null,
        screenshots: [],
        category: 'systems',
        overview: 'A complete implementation of the oAuth2.0 authentication protocol from scratch. Includes an authentication server for credential management and session handling, plus a full-stack application demonstrating oAuth integration.',
        problemContext: 'Understanding authentication and authorization protocols is fundamental for backend engineers. Implementing oAuth2.0 from scratch provides deep understanding of security best practices, token management, and session handling.',
        whyItWasHard: [
            {
                heading: 'Cryptographic Primitives',
                context: 'Understanding and implementing password hashing with salt, asymmetric encryption for token signatures'
            },
            {
                heading: 'Token Lifecycle Management',
                context: 'Proper handling of token expiration, refresh token rotation, and secure token storage'
            },
            {
                heading: 'Security Vulnerabilities',
                context: 'Preventing common attacks like token replay, credential exposure, and session hijacking'
            },
            {
                heading: 'Authentication Flow Correctness',
                context: 'Implementing OAuth2.0 protocol flow correctly with proper state management and error handling'
            }
        ],
        keyDecisions: [
            {
                heading: 'Separated Authentication Server',
                context: 'Authentication server isolated from application for proper security boundaries and separation of concerns'
            },
            {
                heading: 'JWT with Asymmetric Signatures',
                context: 'RS256 (RSA) signatures allow token verification without sharing secrets, enabling stateless authentication'
            },
            {
                heading: 'Password Hashing with Salt + Pepper',
                context: 'Server-side hashing with salt and pepper mitigates risk of rainbow table and frequency analysis attacks if database is compromised'
            },
            {
                heading: 'Refresh Token Rotation',
                context: 'Enhanced security through token rotation prevents long-lived token compromise and reuse attacks'
            },
            {
                heading: 'DynamoDB for Session Storage',
                context: 'Scalable NoSQL storage for credentials and sessions with low-latency lookups'
            },
            {
                heading: 'Short Token Expiration',
                context: 'Demo uses 10s access tokens, 60s refresh tokens to demonstrate rotation; production would use longer timeouts'
            }
        ],
        reliability: 'Proper password hashing prevents credential exposure if database is compromised. Salt + Pepper prevents rainbow table attacks and frequency analysis attacks. Asymmetric token signatures allow verification without sharing secrets. Token expiration limits attack window. Refresh token rotation prevents token reuse.',
        performance: 'Stateless JWT tokens enable horizontal scaling. DynamoDB provides low-latency credential lookups. Token-based authentication eliminates need for server-side session storage.',
        results: 'Successfully implemented oAuth2.0 protocol demonstrating understanding of authentication security. Full-stack integration shows end-to-end system thinking. Proper use of cryptographic primitives and security best practices.',
        futureImprovements: 'Could add multi-factor authentication. Implement OAuth2.0 authorization code flow for third-party integrations. Add rate limiting for brute-force protection.',
        lessons: 'Security is not optional - proper password hashing and token management are essential. Understanding cryptographic primitives is crucial for backend engineers. Authentication protocols have subtle security requirements that must be implemented correctly.'
    },
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
        whyItWasHard: [
            {
                heading: 'Thread Synchronization',
                context: 'Managing shared state across threads requires careful synchronization to prevent deadlocks and race conditions'
            },
            {
                heading: 'Concurrency Correctness',
                context: 'Ensuring correctness while maintaining high throughput with proper use of semaphores and locks'
            },
            {
                heading: 'Thread Pool Architecture',
                context: 'Efficiently distributing work while handling completion and early termination scenarios'
            },
            {
                heading: 'Memory Management in C',
                context: 'Manual memory allocation and deallocation to prevent leaks and corruption in concurrent environment'
            }
        ],
        keyDecisions: [
            {
                heading: 'Thread Pool Architecture',
                context: 'Efficient work distribution across available CPU cores for maximum parallelism'
            },
            {
                heading: 'Producer-Consumer Pattern',
                context: 'Semaphore-based task queuing enables safe work distribution between producer and consumer threads'
            },
            {
                heading: 'Manual Memory Management',
                context: 'Careful allocation and deallocation in C prevents memory leaks and corruption in concurrent context'
            },
            {
                heading: 'Early Termination',
                context: 'Mechanism to stop all threads immediately when password found, avoiding wasted computation'
            },
            {
                heading: 'Shared State Protection',
                context: 'Proper locking strategies protect critical sections without excessive contention'
            }
        ],
        reliability: 'Thread-safe implementation prevents race conditions and deadlocks. Proper semaphore usage ensures correct synchronization. Memory management prevents leaks and corruption.',
        performance: 'Thread pool maximizes CPU utilization across available cores. Producer-consumer pattern enables efficient work distribution. Early termination prevents unnecessary computation.',
        results: 'Successfully implemented concurrent password cracking demonstrating deep understanding of systems programming, thread safety, and performance optimization. Showcases ability to work with low-level concurrency primitives.',
        futureImprovements: 'Could add GPU acceleration for massive parallelism. Implement work stealing for better load balancing. Add support for different hashing algorithms.',
        lessons: 'Concurrency primitives require careful design to avoid deadlocks and race conditions. Thread pools are essential for CPU-bound parallel workloads. Systems programming demands attention to memory management and performance.'
    },
    {
        id: 'blog-cicd',
        title: 'Blog on CI/CD Pipeline',
        description: 'Independently designed and implemented CI/CD pipeline supporting 3 build environments and concurrent pushes from 6+ developers, achieving 3x faster build times',
        techTags: ['GCP', 'Docker', 'GitHub Actions', 'Java', 'Spring Boot', 'JUnit'],
        hardProblem: 'Designed pipeline supporting multiple environments with proper isolation while enabling concurrent development workflows and automated testing',
        githubUrl: null,
        liveUrl: null,
        screenshots: [],
        category: 'cloud-infra',
        overview: 'Software Engineering Capstone project (team of 9) where I independently designed and implemented a complete CI/CD pipeline for a full-stack blog application. The pipeline supports multiple build environments and concurrent development workflows.',
        problemContext: 'The team needed a CI/CD pipeline that could support multiple developers working concurrently, multiple deployment environments (Dev, QA, Prod), and automated testing. Manual deployment processes were slow and error-prone.',
        whyItWasHard: [
            {
                heading: 'Concurrent Development Support',
                context: 'Designing pipeline to handle concurrent pushes from 6+ developers without conflicts or resource contention'
            },
            {
                heading: 'Environment Isolation',
                context: 'Managing 3 separate build environments (Dev, QA, Prod) with proper isolation and deployment rules'
            },
            {
                heading: 'Build Time Optimization',
                context: 'Achieving 3x speedup (45min to 15min) through parallelization and Docker layer caching strategies'
            },
            {
                heading: 'CI/CD Best Practices',
                context: 'Understanding and implementing proper testing gates, deployment strategies, and failure handling'
            }
        ],
        keyDecisions: [
            {
                heading: 'Three-Phase Pipeline',
                context: 'Containerize and build → test → deployment phases with clear separation of concerns'
            },
            {
                heading: 'Branch-Based Triggering',
                context: 'Build and test run on all feature branches; deployment only on Dev, QA, and Prod branches after tests pass'
            },
            {
                heading: 'Parallel Execution',
                context: 'Used GitHub Actions concurrency to parallelize independent build steps for faster execution'
            },
            {
                heading: 'Automated Branch Promotion',
                context: 'Automatic merge from Dev to QA branch on successful Dev deployment for streamlined workflow'
            },
            {
                heading: 'Docker Layer Optimization',
                context: 'Strategic Dockerfile ordering and caching to minimize rebuild times for unchanged dependencies'
            },
            {
                heading: 'Backend API Implementation',
                context: 'Built Java/Spring Boot REST API handling article CRUD, authentication, and comment management'
            }
        ],
        reliability: 'Pipeline prevents deployment if automated tests fail. Proper environment isolation ensures Dev/QA/Prod don\'t interfere. Concurrent builds are handled correctly with proper resource management.',
        performance: 'Reduced build and deploy times by 3x (from 45 to 15 minutes) through parallelization and Docker layer optimization. Pipeline supports concurrent pushes from 6+ developers without conflicts.',
        results: 'Successfully deployed pipeline supporting 3 build environments and concurrent development. Reduced build and deploy times by 3x (from 45 to 15 minutes). Built production backend API handling article CRUD operations, user authentication, and comment management.',
        futureImprovements: 'Could add blue-green deployments for zero-downtime. Implement canary deployments for safer production releases. Add more comprehensive monitoring and alerting.',
        lessons: 'CI/CD pipelines are critical infrastructure that enable team productivity. Proper design can dramatically reduce deployment times. Automation and testing are essential for reliable deployments.'
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
        whyItWasHard: [
            {
                heading: 'Nested Data Parsing',
                context: 'Parsing nested HTML data structures from within ZIP files while maintaining structure and relationships'
            },
            {
                heading: 'Formal Language Implementation',
                context: 'Implementing query syntax from EBNF specification with proper parsing and validation'
            },
            {
                heading: 'Type Safety in Recursion',
                context: 'Maintaining TypeScript type safety across recursive query evaluation and AST traversal'
            },
            {
                heading: 'Extensible Architecture',
                context: 'Designing system where new query operations can be added without modifying existing code'
            }
        ],
        keyDecisions: [
            {
                heading: 'Visitor Design Pattern',
                context: 'AST traversal with double dispatch enables extensible operations on query tree without modifying node classes'
            },
            {
                heading: 'JSZip for Compression',
                context: 'Efficient handling of compressed HTML files with streaming support for large datasets'
            },
            {
                heading: 'Express REST API',
                context: 'Backend query processing layer with proper separation of parsing, validation, and execution'
            },
            {
                heading: 'Recursive Query Evaluation',
                context: 'Type-safe recursive evaluation maintains correctness across complex nested query operations'
            },
            {
                heading: 'Comprehensive Test Coverage',
                context: 'Mocha/Chai test suite ensures correctness of parser, validator, and executor components'
            },
            {
                heading: 'Separation of Concerns',
                context: 'Clean boundaries between parsing, validation, and execution phases prevent coupling'
            }
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
        whyItWasHard: [
            {
                heading: 'Complex Many-to-Many Relationships',
                context: 'Modeling multiple interconnected entities with proper junction tables and referential integrity'
            },
            {
                heading: 'Temporal Dimension Handling',
                context: 'Historical stat tracking requires proper time-series modeling and aggregation strategies'
            },
            {
                heading: 'ISA Hierarchy Implementation',
                context: 'Player role specialization (guards, forwards, centers) requires inheritance modeling in relational schema'
            },
            {
                heading: 'Referential Integrity',
                context: 'Maintaining data consistency across cascading updates and deletes in complex relationship graph'
            },
            {
                heading: 'Performance vs. Normalization',
                context: 'Balancing normalization for data integrity with query performance for analytical workloads'
            }
        ],
        keyDecisions: [
            {
                heading: 'EBNF-Based Schema Design',
                context: 'Formal specification ensures precise entity relationships and constraint definitions'
            },
            {
                heading: 'ISA Hierarchies for Specialization',
                context: 'Player role specialization (guards, forwards, centers) modeled using inheritance relationships'
            },
            {
                heading: 'Weak Entity Sets',
                context: 'Dependent relationships properly modeled with partial keys for entities that rely on parent existence'
            },
            {
                heading: 'Strategic Indexing',
                context: 'Indexes on common query patterns (player lookups, stat aggregations) optimize performance'
            },
            {
                heading: 'Constraint Enforcement',
                context: 'Cardinality and participation constraints implemented via foreign keys and check constraints'
            },
            {
                heading: 'Java Swing Frontend',
                context: 'Desktop GUI with SQL query generation for interactive data exploration'
            },
            {
                heading: 'Foreign Key Cascade Rules',
                context: 'Proper cascade delete and update rules maintain referential integrity across relationship graph'
            }
        ],
        reliability: 'Referential integrity enforced through foreign key constraints. Cardinality constraints prevent invalid states. Participation constraints ensure data completeness.',
        performance: 'Strategic indexing optimizes common queries. Normalized schema reduces data redundancy. Efficient join operations through proper relationship modeling.',
        results: 'Successfully modeled complex sports domain with 11 entity sets and 11 relationships. Demonstrates expertise in database design, normalization, and constraint modeling.',
        futureImprovements: 'Could add materialized views for complex analytics. Implement query optimization hints. Add full-text search for player names.',
        lessons: 'Proper database design requires understanding domain relationships deeply. ISA hierarchies model inheritance elegantly. Constraints are crucial for data integrity. Normalization must balance with query performance needs.'
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
        whyItWasHard: [
            {
                heading: 'JSON Reference Limitations',
                context: 'JSON doesn\'t support object references or bidirectional relationships, requiring custom serialization strategy'
            },
            {
                heading: 'Circular Dependencies',
                context: 'Friend relationships are circular (User A friends with User B means B friends with A) requiring careful handling'
            },
            {
                heading: 'Referential Integrity',
                context: 'Must maintain relationship consistency across updates while enabling efficient lookups without native references'
            },
            {
                heading: 'Serialization/Deserialization',
                context: 'Converting object graphs to JSON and reconstructing bidirectional relationships on load'
            }
        ],
        keyDecisions: [
            {
                heading: 'Dependency Injection Pattern',
                context: 'Exploited class dependency structure for parent-to-child object passing during reconstruction'
            },
            {
                heading: 'Hash-Based Reconstruction',
                context: 'Hash table with object IDs as keys enables O(1) cross-reference resolution during deserialization'
            },
            {
                heading: 'Object ID Strategy',
                context: 'Strategic use of unique IDs as hash keys in JSON enables efficient relationship resolution'
            },
            {
                heading: 'Bidirectional Consistency',
                context: 'Careful state management ensures both sides of relationships stay synchronized through updates'
            },
            {
                heading: 'Java Swing GUI',
                context: 'Desktop interface with event-driven architecture for interactive social media features'
            },
            {
                heading: 'JUnit Test Coverage',
                context: 'Comprehensive test suite verifies correctness of bidirectional relationship integrity'
            }
        ],
        reliability: 'Maintains referential integrity across relationship updates. Hash-based reconstruction ensures consistent state after deserialization. Unit tests verify correctness of bidirectional relationships.',
        performance: 'O(1) amortized lookup time for relationships using hash tables. Efficient serialization/deserialization for local storage. Responsive UI through proper event handling.',
        results: 'Successfully implemented Facebook-like features with creative solution to JSON\'s lack of reference support. Demonstrates data structure expertise, algorithmic thinking, and ability to work within constraints.',
        futureImprovements: 'Could migrate to proper database (PostgreSQL) for scalability. Add real-time features with WebSockets. Implement privacy controls and permissions.',
        lessons: 'Creative data structure design can overcome format limitations. Bidirectional relationships require careful state management. Understanding language and format constraints drives architectural decisions.'
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
        whyItWasHard: [
            {
                heading: 'Authenticated Session Management',
                context: 'Navigating authenticated sessions in headless browsers while handling dynamic JavaScript-rendered content'
            },
            {
                heading: 'Bot Detection Evasion',
                context: 'Universities employ bot detection systems that must be bypassed through device metadata rotation'
            },
            {
                heading: 'Browser State Management',
                context: 'Managing browser state across multiple page navigations with proper error handling and recovery'
            },
            {
                heading: 'Reliable Automation',
                context: 'Building robust automation that handles edge cases, timeouts, and errors gracefully'
            }
        ],
        keyDecisions: [
            {
                heading: 'Selenium for Automation',
                context: 'Reliable browser automation with JavaScript rendering support for dynamic content'
            },
            {
                heading: 'Device Metadata Rotation',
                context: 'Rotating user agent and device fingerprints to bypass university bot detection systems'
            },
            {
                heading: 'Flask Backend API',
                context: 'Processing and calculation logic separated into REST API for clean architecture'
            },
            {
                heading: 'React Frontend (Discontinued)',
                context: 'User-friendly interface discontinued after discovering violation of university Terms of Service'
            },
            {
                heading: 'C++ CLI Wrapper',
                context: 'Command-line interface for personal use achieving 438% reduction in command execution overhead'
            },
            {
                heading: 'Headless Browser Configuration',
                context: 'Headless mode optimizes performance by eliminating GUI rendering overhead'
            }
        ],
        reliability: 'Handles authentication edge cases and session management. Gracefully handles network errors and timeouts. Validates scraped data for correctness.',
        performance: 'Reduces manual GPA calculation from several minutes to seconds. Automated navigation eliminates human error. Efficient data extraction and processing.',
        results: 'Successfully automated GPA calculation solving real user pain point. Originally built as full-stack web app but pivoted to CLI tool after learning it violated university ToS. Demonstrates practical problem-solving and full-stack engineering skills.',
        futureImprovements: 'Could add support for other universities. Implement caching to reduce repeated scraping. Add grade trend analysis and predictions.',
        lessons: 'Always verify Terms of Service before deploying user-facing applications. Web scraping requires robust error handling and anti-detection strategies. Practical tools that solve real problems demonstrate engineering impact.'
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
        whyItWasHard: [
            {
                heading: 'High-Dimensional Feature Space',
                context: 'Many potentially irrelevant features requiring careful selection to avoid noise and overfitting'
            },
            {
                heading: 'Multi-Class Classification',
                context: '5-genre classification more challenging than binary; requires balanced accuracy across all classes'
            },
            {
                heading: 'Class Imbalance',
                context: 'Uneven genre distribution requiring careful evaluation metrics beyond simple accuracy'
            },
            {
                heading: 'Hyperparameter Tuning',
                context: 'Large search space for Random Forest parameters requiring systematic cross-validation approach'
            }
        ],
        keyDecisions: [
            {
                heading: 'Random Forest Classifier',
                context: 'Ensemble learning provides robustness and feature importance insights for understanding predictions'
            },
            {
                heading: 'Cross-Validation Tuning',
                context: 'K-fold cross-validation ensures robust hyperparameter selection and prevents overfitting to training data'
            },
            {
                heading: 'Manual Feature Selection',
                context: 'Domain knowledge-based selection of audio features; retrospectively could use forward selection'
            },
            {
                heading: 'Scikit-Learn Pipeline',
                context: 'Reproducible ML workflow with standardized preprocessing, training, and evaluation steps'
            },
            {
                heading: 'Multi-Class Evaluation',
                context: 'Accuracy, precision, and recall metrics per class provide comprehensive performance assessment'
            },
            {
                heading: 'Data Cleaning',
                context: 'Removed irrelevant features like artist names that could cause overfitting to artist rather than genre'
            }
        ],
        reliability: 'Cross-validation ensures model generalizes beyond training data. Proper train/test split prevents overfitting. Feature selection reduces noise.',
        performance: 'Achieved 75% accuracy on 5-class genre prediction. Random Forest provides feature importance insights. Ensemble method robust to overfitting.',
        results: 'Successfully built ML classification pipeline achieving 75% accuracy. Demonstrates understanding of ML fundamentals, feature engineering, and model selection. Reflective analysis shows growth mindset.',
        futureImprovements: 'Use forward selection or ensemble feature selection instead of manual selection. Apply MDS for dimensionality reduction and visualization. Try KNN for convex clusters, DBSCAN for non-convex clusters with outliers, or Multi-class SVM. Add precision-recall analysis per genre.',
        lessons: 'Feature selection is critical for ML performance. Ensemble methods provide robustness. Retrospective analysis and identifying improvements demonstrates engineering maturity. Understanding when different algorithms (KNN, DBSCAN, SVM) might work better shows algorithmic depth.'
    }
]
