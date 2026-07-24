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
    status?: string // short badge, e.g. "Live in production", "In progress"
    highlights?: string[] // 3-4 skimmable facts shown at the top of the detail view

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
        title: 'Multi-Vendor Collision Parts Search',
        description: 'Live search for collision repair shops. Look up parts by VIN or part number and compare offers across suppliers in one place.',
        techTags: ['TypeScript', 'Next.js', 'Express', 'PostgreSQL', 'Drizzle ORM', 'AWS Lambda', 'Terraform', 'Vercel', 'Zod', 'GitHub Actions'],
        hardProblem: 'Cut per-page ingestion from about 3,500 database writes to about 25 so a catalog page finishes inside the 12 minute Lambda limit, while merging OEM, aftermarket, and interchange part numbers into one graph with safe, idempotent writes.',
        githubUrl: 'https://github.com/paramtully/Autobody-Part-Sourcing',
        liveUrl: 'https://www.getboneyard.com',
        screenshots: [
            '/images/projects/boneyard/boneyard-1.png',
            '/images/projects/boneyard/boneyard-2.png',
            '/images/projects/boneyard/boneyard-3.png',
            '/images/projects/boneyard/boneyard-4.png',
            '/images/projects/boneyard/boneyard-5.png',
            '/images/projects/boneyard/boneyard-6.png',
            '/images/projects/boneyard/boneyard-7.png'
        ],
        category: 'featured',
        status: 'Live in production',
        highlights: [
            'About 140x fewer database writes per catalog page (roughly 3,500 down to 25)',
            '160+ automated tests running against in-memory Postgres in CI',
            'Deploys to AWS with no long-lived keys using GitHub OIDC',
            'Live vendors today: eBay US and eBay CA'
        ],
        overview: 'A live parts search product for collision repair shops (getboneyard.com). Shops search by VIN or part number and compare offers across suppliers in one screen. It is an end to end TypeScript project: a Next.js client, an Express API, Postgres with Drizzle, AWS Lambda ingestion workers, Terraform infrastructure, and Vercel hosting. Scheduled workers pull supplier catalogs into one normalized database, and search, compare, and affiliate links are live. The checkout flow is fully modeled and tested in code but is intentionally left out of production until vendor order APIs are ready.',
        problemContext: 'Collision shops source parts across disconnected supplier systems with no shared search. The same physical part shows up as different strings per vendor (OEM, aftermarket, and interchange numbers, plus formatting like 1234-AB versus 1234AB). Vehicle fitment adds another layer, since one part can fit many trims, which breaks naive joins and pagination. Suppliers also rate limit their APIs, and catalogs are far too large for a single Lambda run without resumable, cursor based ingestion.',
        whyItWasHard: [
            {
                heading: 'Canonical Parts Graph',
                context: 'One physical part has to map cleanly through typed identifiers (OEM, aftermarket, interchange), vehicle fitments, and per vendor listings, without silently merging two IDs that actually mean different parts.'
            },
            {
                heading: 'Batched Ingestion at Lambda Scale',
                context: 'Ingesting a 200 listing page one row at a time is about 3,500 database operations, and eBay fitment data can add 1,000 to 2,000 fitments per listing, so serial inserts risk timing out the 12 minute Lambda.'
            },
            {
                heading: 'Resumable Workers Under Rate Limits',
                context: 'Large catalogs, a 12 minute budget, and vendor rate limits mean the worker has to checkpoint its cursor, watch the clock, and pause and resume instead of failing the whole sync.'
            },
            {
                heading: 'Correct Search Under Many to Many Fitment',
                context: 'Joining listings through parts and fitments multiplies rows, so without server side deduplication shops would see duplicate listings and broken pagination.'
            },
            {
                heading: 'Vendor Plugin Architecture',
                context: 'Each supplier has different APIs, auth, pagination, and field shapes, so copy pasting a worker per vendor does not scale.'
            },
            {
                heading: 'CI Without a Hosted Database',
                context: 'The 160+ tests need to run reliably in CI without provisioning Postgres, including graph integrity checks after every ingest path.'
            }
        ],
        keyDecisions: [
            {
                heading: 'Normalized Parts Graph',
                context: 'Identifiers are bulk resolved at ingest time, records are skipped when two IDs map to different parts, and tests enforce that no orphan edges remain after every run.'
            },
            {
                heading: 'Four Phase Record Processor Per Page',
                context: 'Two bulk reads, then in memory classification into new, update, or conflict, then a single transaction with chunked fitment inserts, then deferred fitment enrichment only for new parts.'
            },
            {
                heading: 'Shared Vendor Pipeline',
                context: 'Fetch, map, then batch upsert with a retry decorator. eBay US and CA both run from one Lambda artifact where a vendor ID selects behavior, and the next supplier interface is stubbed for onboarding.'
            },
            {
                heading: 'Deduplicated Search Queries',
                context: 'Fitment and part number routes return one row per listing regardless of how many trims match, with a shared Zod contract for sort, filters, and cursor pagination.'
            },
            {
                heading: 'OIDC Deploys and In-Memory Test DB',
                context: 'GitHub Actions assumes AWS through web identity with no long-lived keys, deploys are path filtered after CI, and unit tests run against in-memory Postgres with a live smoke test on main.'
            },
            {
                heading: 'Staged MVP Scope',
                context: 'Search, compare, and affiliate links shipped first. The checkout service, payment adapter, and outbox are modeled and tested in code but not enabled, a deliberate call over shipping half wired payments.'
            }
        ],
        reliability: 'Ingestion is idempotent and skips records when identifiers disagree rather than guessing. Each vendor run tracks its cursor, stats, and status (in progress, completed, rate limited, failed). When a rate limit hits, the run pauses, saves its cursor, and resumes after a cooldown instead of failing the whole invocation. A single bad listing does not abort the vendor sync. Tests cover re-ingest idempotency, conflict detection, and post ingest graph integrity.',
        performance: 'Batched ingestion does roughly 140 times fewer database writes per 200 listing page (about 3,500 down to about 25). Fitment heavy pages go from tens of thousands of serial inserts to a handful of chunked bulk statements, which is the difference between timing out and finishing a page inside the Lambda budget. Search queries return one row per listing so many trim joins never duplicate results or break pagination.',
        results: 'Live at getboneyard.com with production ingestion for eBay US and CA, a fitment wizard, VIN decode, filtered and sorted results, a compare tray, listing detail, and affiliate links. Shipped with 160+ automated tests, in-memory Postgres in CI, and a live integration smoke test on main. I owned the whole thing: data model, ingestion workers, search API, frontend, Terraform, and CI/CD. The checkout and payments code is written and tested but not turned on in production.',
        futureImprovements: 'Turn on the checkout API and payment flow for vendors that support platform checkout. Add more suppliers through the existing plugin pipeline. Grow vendor count and tighten how fresh the catalog stays. Score vendor performance from fulfillment data.',
        lessons: 'Performance work should be tied to a real limit like the Lambda timeout and Postgres parameter caps, not done for its own sake. Canonical identity in messy vendor data needs conflict behavior defined by tests, not assumed merges. Shipping a live product with honest boundaries, search before payments, reads stronger than a half finished checkout. Plugin boundaries pay off when the second vendor is a mapper and some config instead of a rewrite.'
    },
    {
        id: 'asterism',
        title: 'AI Review Response App',
        description: 'iOS app that uses a RAG pipeline to draft replies to reviews in each business\u2019s own voice, so owners can approve, edit, or auto post from their phone.',
        techTags: ['Swift', 'SwiftUI', 'Python', 'FastAPI', 'RAG', 'PostgreSQL', 'pgvector', 'Supabase', 'GitHub Actions'],
        hardProblem: 'Keeping AI replies on brand with RAG: a business\u2019s own past replies are embedded and the closest ones are retrieved as examples, but only when there are enough of them and they are similar enough to trust.',
        githubUrl: null,
        liveUrl: 'https://asterism-app.vercel.app',
        screenshots: [],
        category: 'featured',
        status: 'In progress',
        highlights: [
            'RAG pipeline retrieves replies of 3 most similar reviews as examples, so the draft sounds like the business owner wrote it',
            'Runs end to end locally against a mocked Google and Yelp integration while partner API access is pending',
            'Customer review text is kept out of system instructions to reduce prompt injection risk',
            'StoreKit 2 billing across three subscription plans'
        ],
        overview: 'A product for local business owners who never have time to reply to reviews. It connects a business\u2019s Google and Yelp profiles, drafts a reply in that business\u2019s own voice, and lets the owner approve, edit, or auto post from their phone. It is a native SwiftUI app backed by a Python FastAPI service, a RAG pipeline (retrieval augmented generation) built on Postgres with pgvector, and Supabase for data and auth. The core loop is built and runs locally against a mocked review integration; a public landing page is live while I wait on Google Business Profile and Yelp partner access.',
        problemContext: 'Owners know that replying to reviews helps their reputation, but writing a genuine reply to every one is tedious, and generic AI replies sound like a robot and can hurt more than help. The hard part is not calling a language model, it is making the reply actually sound like this specific business, grounded in real facts about them, without letting a hostile review steer the model.',
        whyItWasHard: [
            {
                heading: 'Replies That Sound Like the Owner',
                context: 'A model with no context writes bland, generic replies. The app needs each business\u2019s tone and past replies as grounding so drafts read like the owner actually wrote them.'
            },
            {
                heading: 'Knowing When to Trust RAG Retrieval',
                context: 'Pulling in past replies as examples only helps when there are enough of them and they are close enough to the new review. Firing the RAG step too early produces off tone, low quality examples.'
            },
            {
                heading: 'Untrusted Review Text',
                context: 'A customer review is attacker controlled input. It can contain instructions like ignore your rules or reveal your prompt, so review text has to be isolated from the system instructions.'
            },
            {
                heading: 'Third Party Access Gating',
                context: 'Google Business Profile and Yelp both gate their reply APIs behind partner approval, so the whole app had to be buildable and testable before that access exists.'
            }
        ],
        keyDecisions: [
            {
                heading: 'RAG With Guardrails',
                context: 'Past replies are embedded with a sentence transformer and stored in pgvector for retrieval. The RAG step only injects examples when there are at least 8 past replies and the closest ones clear a 0.78 similarity bar, capped at 3 examples.'
            },
            {
                heading: 'Role Separation for Safety',
                context: 'System instructions and the customer review live in separate roles, and the review is wrapped as clearly untrusted, so the model treats it as content to reply to rather than commands to follow.'
            },
            {
                heading: 'Stub Integration for Local Development',
                context: 'A mocked Google and Yelp integration lets the full sync, draft, and post loop run locally, so development never blocks on partner API approval.'
            },
            {
                heading: 'Layered Backend',
                context: 'Repository interfaces, domain services, and a billing abstraction keep the FastAPI service testable and let the storage and payment details sit behind clean boundaries.'
            }
        ],
        reliability: 'Retrieval degrades gracefully: when a business does not have enough history yet, the app falls back to a stored voice profile instead of injecting weak examples. Review text is treated as untrusted at the prompt layer. The backend is covered by a large automated test suite spanning sync, drafting, and billing.',
        performance: 'Embeddings use a compact 384 dimension model that runs cheaply on CPU. Retrieval uses vector similarity in Postgres, so it does not need a separate vector database. Prompt size is kept in check with compact voice and business summaries rather than dumping raw history into every request.',
        results: 'The product is built and runs end to end locally against a mocked review integration, including sync, voice grounded drafting, approve and edit, and StoreKit 2 billing across three plans. A public landing page is live. It is not on TestFlight yet because it needs live Google and Yelp access to be useful to real owners, and that access is still pending.',
        futureImprovements: 'Ship to TestFlight once partner API access clears. Add a small red team set of adversarial reviews to measure prompt injection resistance directly. Expand the voice profile to learn more from owner edits over time.',
        lessons: 'The interesting engineering in an AI product is rarely the model call. It is the RAG retrieval gating, the safety boundaries around untrusted input, and the fallbacks for when there is not enough data yet. Building against a stub kept the whole thing moving while external access was out of my hands.'
    },
    {
        id: 'stock-analytics',
        title: 'Cloud-Native Stock Analytics Platform',
        description: 'Portfolio tracker that syncs market and news data on a schedule and adds AI written summaries, built on an event driven AWS pipeline.',
        techTags: ['TypeScript', 'Terraform', 'AWS Lambda', 'ECS Fargate', 'PostgreSQL', 'S3', 'Parquet', 'EventBridge', 'React', 'OpenAI', 'WAF', 'Cognito', 'API Gateway', 'GitHub Actions'],
        hardProblem: 'Designed a two stage Lambda architecture that removes NAT Gateway cost while keeping the database in a private subnet, and built idempotent stock split reconciliation across historical time series data.',
        githubUrl: 'https://github.com/paramtully/Stocker',
        liveUrl: null,
        screenshots: [
            '/images/projects/stocker/stocker-1.png',
            '/images/projects/stocker/stocker-2.png',
            '/images/projects/stocker/stocker-3.png',
            '/images/projects/stocker/stocker-4.png',
            '/images/projects/stocker/stocker-5.png'
        ],
        category: 'featured',
        highlights: [
            'Two stage Lambda design keeps the database private while avoiding NAT Gateway cost',
            '70 to 90 percent storage savings using Parquet with S3 lifecycle policies',
            'Idempotent ingestion with stock split reconciliation across historical data',
            'Infrastructure defined across 15+ Terraform modules with CI/CD'
        ],
        overview: 'A cloud native stock portfolio platform built end to end: event driven data pipelines, AI news summarization through OpenAI, and production AWS infrastructure defined across 15+ Terraform modules. The frontend is a full stack React app with Cognito auth, role based access, layered rate limiting, and automated CI/CD through GitHub Actions.',

        problemContext: 'Market data needs steady ingestion from external APIs, efficient long term storage for analytical queries, and infrastructure that does not quietly run up a bill. The obvious approach, JSON storage on always on servers with VPC connected Lambdas calling out to the internet, gets expensive fast (a NAT Gateway alone is roughly 32 to 45 dollars a month) and queries poorly as data grows.',

        whyItWasHard: [
            {
                heading: 'Private Database Without NAT Cost',
                context: 'Keeping RDS in a private subnet while still letting internet facing ingestion reach external APIs, without paying for a NAT Gateway.'
            },
            {
                heading: 'Idempotent Pipelines',
                context: 'Handling retries safely, including stock split detection and reconciling historical data, so a re-run never double counts.'
            },
            {
                heading: 'Service Orchestration',
                context: 'Coordinating many services with event driven scheduling and sensible failure handling across the system.'
            },
            {
                heading: 'Language Model Integration',
                context: 'Summarizing news through OpenAI with token aware batching and fallbacks for when the API fails.'
            },
            {
                heading: 'Infrastructure as Code',
                context: 'Defining the whole AWS footprint across 15+ Terraform modules with automated deploys.'
            }
        ],

        keyDecisions: [
            {
                heading: 'Two Stage Lambda Architecture',
                context: 'Internet facing Lambdas with no VPC ingest from external APIs and write Parquet to S3, then VPC isolated Lambdas read through S3 VPC endpoints and write to RDS. This removes the NAT Gateway while keeping the database private.'
            },
            {
                heading: 'Lambda and ECS Fargate Hybrid',
                context: 'Lambda handles short event driven tasks like scheduled ingestion and the API, and ECS Fargate handles long running historical loads that exceed the Lambda time limit.'
            },
            {
                heading: 'Parquet Over JSON',
                context: '70 to 90 percent compression, fast columnar analytical queries, and schema evolution. S3 is partitioned by year to match query patterns and lifecycle rules.'
            },
            {
                heading: 'Idempotent Ingestion',
                context: 'Composite primary keys with upsert conflict resolution. Stock split detection uses S3 based state with a two phase fetch then apply pattern.'
            },
            {
                heading: 'Layered Rate Limiting',
                context: 'WAF IP rules (100 requests per 5 minutes unauthenticated, 1,000 authenticated) sit in front of API Gateway throttling at 50 requests per second sustained with 100 burst.'
            },
            {
                heading: 'Rolling Seven Day Window',
                context: 'Balances freshness against compute cost and absorbs late arriving data without reprocessing the entire history.'
            },
            {
                heading: 'Monorepo With npm Workspaces',
                context: 'Shared TypeScript types across packages with a clean, acyclic dependency graph for type safety.'
            },
            {
                heading: 'AI News Pipeline',
                context: 'OpenAI summarization with token aware batching, sentiment analysis, and fallbacks for API failures.'
            }
        ],
        reliability: 'Idempotent ingestion prevents duplicates across retries. EventBridge scheduling with failure handling keeps the pipeline running. Cognito JWT auth backs role based access for user, admin, and guest. A scheduled Lambda cleans up guest accounts. WAF and API Gateway rate limiting give defense in depth.',
        performance: 'Scheduled syncs currently pull the NASDAQ ticker universe on a fixed cadence, and the event driven design can scale to far higher volume, bounded mainly by upstream API rate limits. Parquet columnar storage keeps analytical queries fast and storage cheap, S3 lifecycle rules move old partitions to cheaper tiers, and the seven day window keeps each run small. TanStack Query caches on the client for a responsive UI.',
        results: 'Shipped end to end: many orchestrated services, 15+ Terraform modules, a CI/CD pipeline from GitHub Actions through Docker and ECR to ECS, production auth, and layered security. The two stage Lambda design removed NAT Gateway cost of roughly 32 to 45 dollars a month, and Parquet cut storage by 70 to 90 percent. The AI news pipeline summarizes articles with token aware batching, and an admin dashboard surfaces user metrics and system health.',
        futureImprovements: 'Add Kinesis streaming for sub minute freshness. Add a Redis cache for hot query paths. Refine partitioning based on real access patterns. Expand integration and load test coverage.',
        lessons: 'Cost is a real design constraint, not an afterthought. The two stage Lambda pattern saved meaningful spend for very little added complexity. Splitting work between Lambda and ECS matches compute to how long each job runs. Parquet pays off in both storage and query speed. Infrastructure as code is what makes a cloud setup reproducible, and a monorepo makes shared types easy but demands disciplined dependencies.'
    },
    {
        id: 'distributed-kv',
        title: 'Distributed Key-Value Store',
        description: 'Linearizable key value store in Go, built on a from scratch Raft implementation with leader election, log replication, and snapshots.',
        techTags: ['Go', 'Raft', 'Distributed Systems'],
        hardProblem: 'Built fault tolerant consensus that stays linearizable under network partitions, node crashes, and concurrent clients.',
        githubUrl: null,
        liveUrl: null,
        screenshots: [],
        category: 'featured',
        status: 'Academic project',
        highlights: [
            'Raft written from scratch: elections, log replication, and snapshots',
            'Passes fault injection for network partitions and node crashes',
            'Stays linearizable under concurrent clients'
        ],
        overview: 'A distributed key value store built on a from scratch implementation of the Raft consensus algorithm. It stays linearizable and keeps working through failures like network partitions and node crashes.',
        problemContext: 'Distributed systems need consensus to keep replicas consistent. Raft is a simpler alternative to Paxos that still gives strong consistency, but implementing it correctly means handling leader election, log replication, and failure recovery with care.',
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
        reliability: 'Passes fault injection tests for network partitions, node crashes, and concurrent clients. Leader election keeps the system running through node failures, log replication keeps data durable, and snapshot based recovery handles restarts efficiently.',
        performance: 'Linearizable operations give strong consistency. Snapshot based recovery shrinks the log and speeds up restarts. Concurrent clients are handled correctly through careful synchronization.',
        results: 'A working Raft implementation that passes the fault injection tests and stays linearizable through partitions and crashes. The project is where a lot of my distributed systems intuition comes from.',
        futureImprovements: 'Add dynamic membership changes. Add log compaction for better performance. Add metrics and observability for real deployment.',
        lessons: 'Consensus algorithms have subtle correctness requirements that punish shortcuts. Fault injection testing is essential for distributed systems. Linearizability is a strong guarantee, but it takes careful coordination to hold.'
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
        overview: 'A full implementation of the oAuth2.0 authentication protocol from scratch. It includes an auth server for credentials and sessions, plus a full stack app that uses it end to end.',
        problemContext: 'Auth is fundamental backend work. Building oAuth2.0 from scratch meant working through password hashing, token management, and session handling myself instead of leaning on a library.',
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
        results: 'A working oAuth2.0 flow with an isolated auth server, asymmetrically signed tokens, salted password hashing, and refresh token rotation, wired into a full stack app.',
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
        results: 'A multithreaded cracker that keeps every core busy through a thread pool and a semaphore based work queue, stops all threads the moment the password is found, and runs without leaks or data races.',
        futureImprovements: 'Could add GPU acceleration for massive parallelism. Implement work stealing for better load balancing. Add support for different hashing algorithms.',
        lessons: 'Concurrency primitives require careful design to avoid deadlocks and race conditions. Thread pools are essential for CPU-bound parallel workloads. Systems programming demands attention to memory management and performance.'
    },
    {
        id: 'dns-resolver',
        title: 'DNS Resolver',
        description: 'Implemented a full DNS resolver from scratch in Java, handling iterative resolution across the DNS hierarchy with raw UDP socket communication and binary wire-format parsing',
        techTags: ['Java', 'Networking', 'UDP Sockets', 'DNS Protocol', 'Binary Parsing'],
        hardProblem: 'Parsed and constructed DNS messages at the binary wire-format level, implementing iterative resolution across root, TLD, and authoritative nameservers with correct RCODE and QTYPE handling',
        githubUrl: null,
        liveUrl: null,
        screenshots: [],
        category: 'systems',
        overview: 'A DNS resolver built from scratch as part of UBC CPSC 317 (Internet Computing). Implements the full iterative resolution process starting from root nameservers and following referrals down the DNS hierarchy to authoritative answers using raw UDP sockets and hand-written binary protocol parsing.',
        problemContext: 'DNS is the phonebook of the internet, yet most engineers treat it as a black box. Implementing a resolver from scratch requires understanding the wire protocol, the iterative delegation model, and the edge cases that real-world DNS infrastructure surfaces, knowledge that directly informs debugging production network issues and designing distributed systems.',
        whyItWasHard: [
            {
                heading: 'Binary Wire-Format Parsing',
                context: 'DNS messages are encoded in a compact binary format with bit level fields, variable length labels, and message compression using pointer offsets, all parsed by hand from raw bytes'
            },
            {
                heading: 'Iterative Resolution Logic',
                context: 'Correctly following the delegation chain from root to TLD to authoritative server, handling CNAME chains, referrals in the Authority section, and knowing when to stop'
            },
            {
                heading: 'UDP Reliability',
                context: 'UDP provides no delivery guarantees; the resolver must handle packet loss, timeouts, and retransmission without the safety net of a connection-oriented transport'
            },
            {
                heading: 'Edge Cases in Real DNS',
                context: 'Handling NXDOMAIN, SERVFAIL, truncated responses, glue records, and nameservers that return unexpected RCODE values requires careful protocol-level reasoning'
            }
        ],
        keyDecisions: [
            {
                heading: 'Raw UDP Sockets',
                context: 'Direct socket communication at the transport layer provides full control over message framing, timeouts, and retry logic rather than relying on OS-level resolver abstractions'
            },
            {
                heading: 'Manual Binary Serialization',
                context: 'Hand written byte level encoding and decoding of DNS message sections (header, question, answer, authority, additional) builds a real understanding of how the protocol is structured'
            },
            {
                heading: 'Iterative over Recursive',
                context: 'Iterative resolution, where the client follows each referral itself, is what real resolvers do. It exposes the full DNS delegation hierarchy and shows how the system actually works'
            },
            {
                heading: 'Structured Message Model',
                context: 'Modeled DNS messages as typed Java objects (header flags, resource records by QTYPE) to keep parsing logic separate from resolution logic and simplify debugging'
            }
        ],
        reliability: 'Handles UDP packet loss with configurable timeouts and retransmission. Gracefully surfaces NXDOMAIN, SERVFAIL, and other RCODE failures. CNAME chain resolution prevents infinite loops.',
        performance: 'Follows the minimal number of UDP round trips required by iterative resolution. Stops traversal as soon as an authoritative answer is found rather than querying unnecessary nameservers.',
        results: 'Resolves arbitrary domain names by walking the live DNS hierarchy from the root servers, parsing every message by hand at the byte level. The protocol and serialization work shows up directly when debugging backend and distributed systems.',
        futureImprovements: 'Add a local cache with TTL-based expiration to reduce redundant queries. Support TCP fallback for truncated responses. Implement DNSSEC validation for authenticated resolution.',
        lessons: 'Understanding protocols at the wire level demystifies abstractions that engineers use every day. UDP\'s lack of reliability guarantees forces explicit design decisions around timeouts and retries. Real-world DNS has far more edge cases than the spec suggests, handling them correctly requires reading RFCs carefully and testing against live infrastructure.'
    },
    {
        id: 'csftp-server',
        title: 'FTP Server',
        description: 'Implemented a concurrent FTP server from scratch in C using POSIX sockets and pthreads, with dual-channel architecture, passive mode data transfer, and session-scoped state management across full RFC command support',
        techTags: ['C', 'POSIX Sockets', 'pthreads', 'TCP/IP', 'FTP Protocol', 'Systems Programming'],
        hardProblem: 'Engineered a dual-channel FTP architecture in raw C where a dynamically allocated passive port is negotiated over the control connection and serves file transfers on a separate data socket, with select()-based timeout to prevent indefinite hangs and explicit fd cleanup in every code path',
        githubUrl: 'https://github.com/paramtully/FtpServer',
        liveUrl: null,
        screenshots: [],
        category: 'systems',
        overview: 'An RFC-compliant FTP server built entirely in C using BSD sockets and POSIX threads. Handles concurrent client sessions, passive mode data transfer, directory listing, and file retrieval with full authentication and per-session state management. Built as part of UBC CPSC 317 (Internet Computing).',
        problemContext: 'Building a networked server that separates control and data channels, manages per client state across asynchronous commands, and enforces security boundaries without a runtime or framework takes a solid grasp of the POSIX networking stack and the FTP spec.',
        whyItWasHard: [
            {
                heading: 'Dual-Channel Protocol',
                context: 'FTP separates control and data onto different TCP connections. PASV required spawning a second listening socket mid-session, encoding the IP and port into FTP wire format, and coordinating its full lifecycle with the downstream RETR and NLST commands'
            },
            {
                heading: 'Session State Without Memory Safety',
                context: 'Each client thread owns a client_info_t struct tracking authentication, transfer mode, and passive socket state. Managing this across all command transitions in C, no RAII and no borrow checker, requires disciplined lifecycle design'
            },
            {
                heading: 'Path Traversal Security',
                context: 'Preventing directory traversal (../ and ./) without a standard library required manual string inspection and root-pinning logic to enforce a userspace jail on RETR and CWD operations before any filesystem call'
            },
            {
                heading: 'Resource Management Under Failure',
                context: 'Every socket file descriptor must be explicitly closed in every code path, including all error branches, to prevent leaks. select() with a 30-second timeout ensures the server never hangs waiting for a data client that never connects'
            }
        ],
        keyDecisions: [
            {
                heading: 'pthreads per Connection',
                context: 'Each accepted connection spawns a dedicated pthread with its own client_info_t, isolating session state without shared memory and enabling clean teardown via pthread_join'
            },
            {
                heading: 'select() for Passive Mode Timeout',
                context: 'Using select() on the passive listening socket prevents indefinite blocking when a data client never connects, keeping the server responsive and file descriptors bounded'
            },
            {
                heading: 'RFC-Compliant Response Codes',
                context: 'All FTP response codes defined as a statically initialized struct of string literals, so a correct protocol response is a lookup rather than string construction, which removes malformed reply bugs'
            },
            {
                heading: 'Enum-Based Command Dispatch',
                context: 'Commands parsed into an enum via case-insensitive comparison and dispatched through a switch, cleanly separating parsing from execution and keeping new command additions minimal'
            },
            {
                heading: 'Dynamic PASV Port Allocation',
                context: 'Passive port randomly selected from the ephemeral range per session, with SO_REUSEADDR set to handle rapid reconnections without blocking on TIME_WAIT'
            },
            {
                heading: 'Userspace Filesystem Jail',
                context: 'Server records the working directory at session start as the root and refuses CDUP at root, implementing a minimal chroot-style boundary without requiring elevated privileges'
            }
        ],
        reliability: 'Every socket code path handles failure explicitly with correct FTP error codes. select() prevents passive socket hangs. Path traversal is blocked at the string-inspection layer before any filesystem call is made. All file descriptors closed on both success and error paths.',
        performance: 'File transfer uses a 2KB streaming read loop rather than loading files into memory, supporting arbitrarily large files within a fixed memory footprint. Passive sockets are closed immediately after each transfer to free file descriptors promptly.',
        results: 'A working FTP server that handles auth, passive mode negotiation, directory listing, and file retrieval over separate control and data channels, written in C with explicit file descriptor cleanup on every path and a select based timeout so it never hangs.',
        futureImprovements: 'Replace sequential pthread_join with a thread pool or epoll-based event loop for true simultaneous connections. Add TLS on the control channel for encrypted sessions. Implement STOR for file uploads.',
        lessons: 'Network protocols expose every assumption about timing, ordering, and resource ownership. Implementing FTP from scratch built intuition for why abstractions like HTTP/2 multiplexing and connection pools exist, and exactly what problems they solve at the socket level.'
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
                context: 'Containerize and build, then test, then deploy, with clear separation between phases'
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
        results: 'A pipeline supporting 3 build environments and concurrent pushes from a team of developers, with build and deploy times cut about 3x, from 45 minutes to 15. I also built the Java and Spring Boot backend API for article CRUD, authentication, and comments.',
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
        results: 'A query engine for a language defined in EBNF, built around the visitor pattern with double dispatch so new query operations can be added without touching the node classes.',
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
        results: 'A normalized Oracle schema for the NBA domain with 11 entity sets, including weak entities and ISA hierarchies, with integrity enforced through keys and check constraints and a Java Swing frontend for querying it.',
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
        results: 'A social app with friends, posts, and messaging where bidirectional relationships are rebuilt from JSON on load using an id keyed hash table for O(1) lookups, since JSON has no native references.',
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
        results: 'Automated GPA calculation from a university portal that does not offer it. It started as a full stack web app, then I pivoted to a personal CLI after realizing the web version violated the university terms of service.',
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
        overview: 'A machine learning project that classifies songs into genres from Spotify audio features. It uses a Random Forest with cross validation for hyperparameter tuning and covers the full pipeline from data cleaning through model evaluation.',
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
        results: 'A genre classifier that reaches 75 percent accuracy across 5 classes, with a written retrospective on the feature selection and alternative models that would improve it next time.',
        futureImprovements: 'Use forward selection or ensemble feature selection instead of manual selection. Apply MDS for dimensionality reduction and visualization. Try KNN for convex clusters, DBSCAN for non-convex clusters with outliers, or Multi-class SVM. Add precision-recall analysis per genre.',
        lessons: 'Feature selection is critical for ML performance. Ensemble methods provide robustness. Retrospective analysis and identifying improvements demonstrates engineering maturity. Understanding when different algorithms (KNN, DBSCAN, SVM) might work better shows algorithmic depth.'
    }
]
