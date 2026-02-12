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
  // Additional projects can be added here for the "All Projects" grid
]
