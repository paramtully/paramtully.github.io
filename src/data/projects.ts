export interface TechnicalDetail {
    heading: string
    context: string
}

export type Role = 'swe' | 'ml'

/** Default landing view plus the two role lenses used in applications. */
export type Focus = 'highlights' | Role

export const focusLabels: Record<Focus, string> = {
    highlights: 'Highlights',
    swe: 'Software',
    ml: 'ML & AI'
}

export const focusOrder: Focus[] = ['highlights', 'swe', 'ml']

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
    roles: Role[] // drives the role filter and ?focus= deep links
    /** Shown in the default Highlights strip; deeper coursework lives under a role filter. */
    highlightInHighlights?: boolean
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
        title: 'Parts Search for Collision Shops',
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
        roles: ['swe'],
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
        description: 'iOS app that uses a RAG pipeline to draft replies to business reviews in a business\u2019s own voice, so owners can approve, edit, or auto post from their phone.',
        techTags: ['Swift', 'SwiftUI', 'Python', 'FastAPI', 'RAG', 'PostgreSQL', 'pgvector', 'Supabase', 'GitHub Actions'],
        hardProblem: 'Keeping AI replies on brand with RAG: a business\u2019s own past replies are embedded and the closest ones are retrieved as examples, but only when there are enough of them and they are similar enough to trust.',
        githubUrl: null,
        liveUrl: null,
        screenshots: [
            '/images/projects/asterism/asterism-1.png',
            '/images/projects/asterism/asterism-2.png',
            '/images/projects/asterism/asterism-3.png'
        ],
        category: 'featured',
        roles: ['ml', 'swe'],
        status: 'In progress',
        highlights: [
            'RAG pipeline retrieves replies of 3 most similar reviews as examples, so the draft sounds like the business owner wrote it',
            'Runs end to end locally against a mocked Google and Yelp integration while partner API access is pending',
            'Customer review text is kept out of system instructions to reduce prompt injection risk',
            'StoreKit 2 billing across three subscription plans'
        ],
        overview: 'A product for local business owners who never have time to reply to reviews. It connects a business\u2019s Google and Yelp profiles, drafts a reply in that business\u2019s own voice, and lets the owner approve, edit, or auto post from their phone. It is a native SwiftUI app backed by a Python FastAPI service, a RAG pipeline (retrieval augmented generation) built on Postgres with pgvector, and Supabase for data and auth. The core loop is built and runs locally against a mocked review integration while I wait on Google Business Profile and Yelp partner access.',
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
        results: 'The product is built and runs end to end locally against a mocked review integration, including sync, voice grounded drafting, approve and edit, and StoreKit 2 billing across three plans. It is not on TestFlight yet because it needs live Google and Yelp access to be useful to real owners, and that access is still pending.',
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
        roles: ['swe'],
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
        id: 'graph-transformer',
        title: 'Graph Neural Networks from Scratch',
        description: 'Hand written graph convolution and graph transformer layers in PyTorch, benchmarked against reference implementations on a molecular property regression task.',
        techTags: ['Python', 'PyTorch', 'PyTorch Geometric', 'Graph Neural Networks', 'Attention'],
        hardProblem: 'Implemented message passing and multi head self attention from the math up, including Laplacian positional encodings, then validated correctness by racing the from scratch layers against PyTorch Geometric\u2019s reference versions on the same data.',
        githubUrl: null,
        liveUrl: null,
        screenshots: [
            '/images/projects/graph-transformer/gnn-1-results.png',
            '/images/projects/graph-transformer/gnn-2-training.png'
        ],
        category: 'featured',
        roles: ['ml'],
        status: 'Academic project',
        highlights: [
            'Graph convolution and multi head self attention written from scratch, not imported',
            'From scratch GCN landed within about 5 percent of the reference implementation (0.95 vs 0.91 test MSE)',
            'Convolution clearly beat attention here: 0.95 vs 15.9 test MSE',
            'Transformer fit training data harder than the reference yet tested worse, isolating a generalization gap',
            'Laplacian positional encodings to give the transformer a sense of graph structure'
        ],
        overview: 'A from scratch implementation of two graph learning architectures in PyTorch: a graph convolutional network built on hand written message passing, and a graph transformer built on hand written multi head self attention with Laplacian positional encodings. Both were trained on Peptides-struct, a molecular property regression task from the Long Range Graph Benchmark, and both were benchmarked against PyTorch Geometric\u2019s reference layers to check that my versions were actually correct.',
        problemContext: 'Graphs break the assumptions that make CNNs and standard transformers work. There is no grid and no natural ordering, so a node has to gather information from an arbitrary set of neighbours, and attention has no positional signal to fall back on. Molecular graphs push this further: properties can depend on atoms that are far apart in the graph, which is exactly what the Long Range Graph Benchmark is designed to stress.',
        whyItWasHard: [
            {
                heading: 'Message Passing from the Math Up',
                context: 'Aggregating neighbour features correctly means handling variable degree nodes, normalizing by degree so high degree nodes do not dominate, and doing it with sparse operations instead of a dense adjacency matrix.'
            },
            {
                heading: 'Attention Without Positions',
                context: 'Self attention is permutation invariant, so on a graph it cannot tell a neighbour from a distant node. Without an injected notion of structure, the transformer is attending over an unordered bag of nodes.'
            },
            {
                heading: 'Batching Irregular Graphs',
                context: 'Molecules have different atom counts, so batching means padding and masking so that attention never leaks across two different molecules in the same batch.'
            },
            {
                heading: 'Knowing Whether It Was Correct',
                context: 'A from scratch layer that trains without crashing can still be subtly wrong. The only real check is running it head to head against a trusted implementation on identical data.'
            }
        ],
        keyDecisions: [
            {
                heading: 'Benchmarked Against Reference Layers',
                context: 'Every from scratch layer has a PyTorch Geometric counterpart run under the same conditions. The from scratch GCN reached 0.95 test MSE against 0.91 for the reference, close enough to trust the implementation.'
            },
            {
                heading: 'Laplacian Positional Encodings',
                context: 'Eigenvectors of the graph Laplacian are fed in as node features so the transformer gets a structural signal, the graph equivalent of positional encodings in a sequence transformer.'
            },
            {
                heading: 'Degree Normalized Aggregation',
                context: 'Symmetric normalization in the convolution keeps activations stable across nodes with very different neighbour counts.'
            },
            {
                heading: 'Masked Attention Over Padded Batches',
                context: 'Padding plus an attention mask keeps variable sized molecular graphs batchable without letting one molecule attend to another.'
            }
        ],
        reliability: 'Correctness is established by comparison rather than by assumption. Each from scratch layer runs against the equivalent reference layer on identical data and training settings, so a bug shows up as a gap in the numbers instead of hiding behind a loss curve that merely goes down.',
        performance: 'Sparse neighbour aggregation avoids materializing a dense adjacency matrix, which is what makes the convolution tractable on larger molecular graphs. Attention is the more expensive path, since it scales with the square of node count per graph where message passing scales with edges.',
        results: 'On Peptides-struct, the from scratch GCN reached 0.95 test MSE and 0.74 test MAE, close to the 0.91 MSE of PyTorch Geometric\u2019s reference GCN, which is the evidence that the hand written message passing is correct. The from scratch graph transformer reached 15.9 test MSE against 6.8 for the reference transformer. The training curves make the diagnosis clearer: my transformer actually reached a lower training loss than the reference (3.20 against 7.28) while testing far worse, so the problem is generalization rather than capacity or undertraining.',
        futureImprovements: 'Chase the generalization gap on the transformer rather than training it longer, since it already fits the training data harder than the reference does. Check attention scaling, normalization placement, and regularization. Ablate the Laplacian positional encodings to measure what they actually contribute.',
        lessons: 'Writing the layers by hand is what turns attention and message passing from formulas into things you actually understand. Benchmarking against a trusted implementation is the honest way to find out whether your version is right, and it is worth reporting the result that did not go your way: the transformer losing to a simple convolution says something real about inductive bias mattering more than architectural sophistication when the training budget is small.'
    }
]

export const allProjects: Project[] = [
    {
        id: 'distributed-kv',
        title: 'Distributed Key-Value Store',
        description: 'Linearizable key value store in Go, built on a from scratch Raft implementation with leader election, log replication, and snapshots.',
        techTags: ['Go', 'Raft', 'Distributed Systems'],
        hardProblem: 'Built fault tolerant consensus that stays linearizable under network partitions, node crashes, and concurrent clients.',
        githubUrl: null,
        liveUrl: null,
        screenshots: [],
        category: 'systems',
        roles: ['swe'],
        highlightInHighlights: true,
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
        category: 'systems',
        roles: ['swe'],
        highlightInHighlights: true,
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
        roles: ['swe'],
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
        roles: ['swe'],
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
        roles: ['swe'],
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
        roles: ['swe'],
        highlightInHighlights: true,
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
        roles: ['swe'],
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
        roles: ['swe'],
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
        id: 'gpa-retriever',
        title: 'GPA Retriever',
        description: 'Engineered automated web scraping pipeline using Selenium to extract and process academic data from authenticated university portal, reducing manual GPA calculation from minutes to seconds',
        techTags: ['Python', 'Selenium', 'Flask', 'React', 'C++'],
        hardProblem: 'Bypassed bot detection mechanisms by implementing device metadata rotation and session management for headless browser automation',
        githubUrl: 'https://github.com/paramtully/UBC_GPA_Retriever',
        liveUrl: null,
        screenshots: [],
        category: 'systems',
        roles: ['swe'],
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
        id: 'credit-default',
        title: 'Credit Default Prediction',
        description: 'End to end supervised learning pipeline on 30,000 credit clients: EDA, feature engineering, a four model bake off, and tuning to 81% test accuracy.',
        techTags: ['Python', 'pandas', 'scikit-learn', 'XGBoost', 'Machine Learning'],
        hardProblem: 'Picking a model on evidence rather than on accuracy alone, since the classes are imbalanced and the majority class baseline is already strong enough to make raw accuracy misleading.',
        githubUrl: null,
        liveUrl: null,
        screenshots: [
            '/images/projects/credit-default/credit-corr.png',
            '/images/projects/credit-default/credit-feature-cross.png'
        ],
        category: 'data',
        roles: ['ml'],
        highlightInHighlights: true,
        status: 'Academic project',
        highlights: [
            '81% test accuracy against a 78% majority class baseline on roughly 30,000 clients',
            'Bake off across logistic regression, SVM, random forest, and XGBoost',
            'Recursive feature elimination with cross validation to cut redundant features',
            'Evaluated on precision, recall, and F1 because the classes are imbalanced'
        ],
        overview: 'A full supervised learning pipeline on the UCI credit card default dataset, roughly 30,000 clients. It runs the whole path: exploratory analysis, feature engineering, a bake off across four model families, hyperparameter tuning, feature selection, and interpretation of what the final model is actually keying on.',
        problemContext: 'Predicting which clients will default next month is a class imbalanced problem where most clients do not default. That makes accuracy a deceptive headline number, since a model that predicts nobody defaults already scores well while being useless to a lender who cares specifically about catching the defaulters.',
        whyItWasHard: [
            {
                heading: 'Imbalanced Classes',
                context: 'Defaulters are the minority, so accuracy rewards a model for ignoring exactly the group the model exists to find. Precision, recall, and F1 are what actually separate the candidates.'
            },
            {
                heading: 'Comparing Model Families Fairly',
                context: 'Logistic regression, SVM, random forest, and XGBoost each want different preprocessing and different hyperparameters, so a fair comparison means tuning each one rather than running defaults and declaring a winner.'
            },
            {
                heading: 'Redundant and Correlated Features',
                context: 'Payment history columns across consecutive months carry overlapping signal, which inflates model complexity without adding predictive value.'
            },
            {
                heading: 'Interpreting the Result',
                context: 'A lender cannot act on a score alone, so the model has to be interrogated for which features actually drive the prediction.'
            }
        ],
        keyDecisions: [
            {
                heading: 'Four Model Bake Off',
                context: 'Logistic regression as an interpretable baseline, SVM, random forest, and XGBoost, each tuned, so the final pick is backed by a comparison instead of a hunch.'
            },
            {
                heading: 'Imbalance Aware Metrics',
                context: 'Scoring on precision, recall, and F1 alongside accuracy, so a model that quietly ignores the minority class cannot win on the strength of the majority.'
            },
            {
                heading: 'Recursive Feature Elimination with CV',
                context: 'RFECV trims correlated payment history features down to the ones that carry independent signal, reducing complexity without giving up accuracy.'
            },
            {
                heading: 'Cross Validated Tuning',
                context: 'Hyperparameters selected under cross validation so the reported test number reflects generalization rather than a lucky split.'
            }
        ],
        reliability: 'Model selection and hyperparameter tuning both happen under cross validation, with the test set touched only at the end. Metrics are reported per class so the minority class performance is visible rather than buried in an aggregate.',
        performance: 'The tuned random forest reaches about 81% test accuracy, against a majority class baseline of about 78%. That roughly 3 point lift is the honest headline, and it is why the per class breakdown matters more here than the accuracy figure: recall on the default class is what determines whether the model is useful for the lending decision it is meant to support.',
        results: 'A complete pipeline from raw data to a tuned, interpreted model at roughly 81% test accuracy. The more interesting finding is how little that beats the 78% baseline, and that a 99% train score against 81% test pointed at overfitting rather than a genuinely predictive model. Recognizing that the features available simply did not separate the classes well was the real result.',
        futureImprovements: 'Try resampling or class weighting to push recall on the default class. Calibrate predicted probabilities so scores can be thresholded against a real cost of a missed default. Add SHAP values for per client explanations.',
        lessons: 'Always establish the baseline before celebrating a score. On imbalanced data an 81% accuracy sounds respectable right up until you notice that predicting the majority class gets 78%, and the gap between a 99% train score and an 81% test score says more about the model than either number alone. Choosing the metric is a modeling decision, not a formality.'
    },
    {
        id: 'bc-covid-census',
        title: 'BC COVID and Census Analysis',
        description: 'Analysis joining roughly 85,000 rows of provincial COVID case records with Canadian census data to compare regional outcomes on a per capita basis.',
        techTags: ['Python', 'pandas', 'NumPy', 'Matplotlib', 'Data Analysis'],
        hardProblem: 'Making regions comparable at all: raw case counts just rank provinces by population, so the analysis only becomes meaningful after normalizing per 100,000 residents using census data joined on inconsistent region naming.',
        githubUrl: null,
        liveUrl: null,
        screenshots: [
            '/images/projects/bc-covid-census/covid-1.png'
        ],
        category: 'data',
        roles: ['ml'],
        highlightInHighlights: true,
        status: 'Academic project',
        highlights: [
            'Roughly 85,000 rows of public health data cleaned and joined to census demographics',
            'Per capita normalization to make regions with very different populations comparable',
            'Peak of about 136 cases per 100,000 residents identified across the case timeline',
            'Education attainment compared across provinces, from about 32% in Ontario to about 14% in Nunavut'
        ],
        overview: 'An analysis of British Columbia COVID case data joined against Canadian census demographics. It covers the unglamorous parts of analytics honestly: cleaning roughly 85,000 rows of public health records, reconciling region names across two datasets that do not agree, binning and aggregating, and normalizing by population so that comparisons between regions actually mean something.',
        problemContext: 'Public health data and census data are published by different bodies with different conventions, so joining them is the hard part. On top of that, raw case counts are close to useless for comparison, since a large region will always report more cases than a small one. Any conclusion about which regions fared worse depends entirely on getting the per capita normalization right.',
        whyItWasHard: [
            {
                heading: 'Joining Datasets That Disagree',
                context: 'Health authority regions and census geographies use different names and different granularity, so the join needs explicit reconciliation rather than a direct key match.'
            },
            {
                heading: 'Population Weighting',
                context: 'Comparing regions on raw counts just re-ranks them by population. Per capita rates are what make the comparison legitimate, which requires correct population denominators per region.'
            },
            {
                heading: 'Messy Real World Records',
                context: 'Missing values, inconsistent date handling, and reporting artifacts like weekend dips all distort the trend if they are aggregated naively.'
            },
            {
                heading: 'Choosing Honest Aggregations',
                context: 'Bin widths and rolling windows change the story a chart tells, so those choices had to be deliberate rather than whatever looked cleanest.'
            }
        ],
        keyDecisions: [
            {
                heading: 'Per 100,000 Normalization',
                context: 'All cross region comparisons are expressed as rates per 100,000 residents, which surfaced a peak of about 136 cases per 100,000 and made small regions comparable to large ones.'
            },
            {
                heading: 'Explicit Region Reconciliation',
                context: 'Region names are mapped deliberately between the health and census datasets rather than relying on a fuzzy match that would silently drop or misassign rows.'
            },
            {
                heading: 'Binned Demographic Comparison',
                context: 'Census attainment data is bucketed and compared across provinces, showing a spread from roughly 32% college attainment in Ontario down to about 14% in Nunavut.'
            },
            {
                heading: 'Visualization Tied to the Question',
                context: 'Each chart answers one specific question about trend or regional difference, rather than displaying the data for its own sake.'
            }
        ],
        reliability: 'Row counts are checked before and after every join so silent drops surface immediately. Missing values are handled explicitly rather than dropped by default, and population denominators are validated against published census figures.',
        performance: 'Vectorized pandas operations handle the roughly 85,000 row dataset comfortably in memory, with groupby aggregations replacing row wise iteration throughout.',
        results: 'A complete analysis with per capita case rates across regions, a peak of about 136 cases per 100,000 residents, and a demographic comparison spanning roughly 32% college attainment in Ontario to about 14% in Nunavut. The work is mostly in the cleaning and joining, which is where the conclusions were actually won or lost.',
        futureImprovements: 'Bring in time aligned policy dates to compare regional outcomes against intervention timing. Add confidence intervals on per capita rates for small population regions where a handful of cases moves the rate substantially.',
        lessons: 'Most of an analysis is reconciling data that was never designed to be joined. Normalization is not a formatting step, it is the thing that determines whether a regional comparison means anything, and small population regions need care because per capita rates get noisy fast.'
    },
    {
        id: 'recipe-clustering',
        title: 'Recipe Document Clustering',
        description: 'Compared bag of words against sentence transformer embeddings for clustering recipe text, with KMeans, DBSCAN, silhouette selection, and UMAP visualization.',
        techTags: ['Python', 'sentence-transformers', 'scikit-learn', 'UMAP', 'NLP'],
        hardProblem: 'Sparse bag of words clusters by shared vocabulary, which mixes semantically different recipes that happen to share ingredients words. Dense embeddings fix that, but only if you pick distance metrics and hyperparameters that actually produce separable clusters.',
        githubUrl: null,
        liveUrl: null,
        screenshots: [
            '/images/projects/recipe-clustering/cluster-elbow.png',
            '/images/projects/recipe-clustering/cluster-umap-emb-kmeans.png',
            '/images/projects/recipe-clustering/cluster-umap-emb-dbscan.png',
            '/images/projects/recipe-clustering/cluster-wordcloud.png',
            '/images/projects/recipe-clustering/cluster-dendrogram.png'
        ],
        category: 'data',
        roles: ['ml'],
        highlightInHighlights: true,
        status: 'Academic project',
        highlights: [
            'Side by side comparison of bag of words versus sentence transformer embeddings',
            'KMeans and DBSCAN with cosine distance on the same corpus',
            'Silhouette score used to choose DBSCAN eps and min samples',
            'UMAP used to inspect whether clusters were actually separable'
        ],
        overview: 'An unsupervised NLP project on recipe and document text. It compares a classic bag of words representation against sentence transformer embeddings, clusters with both KMeans and DBSCAN, selects DBSCAN hyperparameters with silhouette score, and uses UMAP to visualize whether the clusters separate cleanly in two dimensions.',
        problemContext: 'Unlabeled text is cheap and abundant, but organizing it means choosing a representation before you ever pick a clustering algorithm. Bag of words is simple and sparse. Sentence embeddings are denser and carry semantics. Which one produces clusters a human would recognize depends on the corpus, and you cannot tell from training loss alone because clustering has no labels.',
        whyItWasHard: [
            {
                heading: 'Representation Dominates the Result',
                context: 'Two documents that share ingredient words can land in the same bag of words cluster even when the recipes are nothing alike. Embeddings capture meaning, but they also change which distance metric makes sense.'
            },
            {
                heading: 'DBSCAN Hyperparameters Without Labels',
                context: 'eps and min samples have no obvious defaults for text embeddings. Too tight and everything is noise; too loose and you get one giant cluster.'
            },
            {
                heading: 'Evaluating Without Ground Truth',
                context: 'There is no accuracy number to optimize. Silhouette score and visual inspection have to stand in for labels, and they can disagree.'
            },
            {
                heading: 'High Dimensional Text Geometry',
                context: 'Embedding space is high dimensional, so Euclidean intuition fails and cosine distance becomes the more natural choice for DBSCAN.'
            }
        ],
        keyDecisions: [
            {
                heading: 'Sentence Transformers Over Bag of Words',
                context: 'Dense embeddings preserve semantic similarity that word counts miss, which produced clusters that grouped recipes by meaning rather than by shared stopword heavy vocabulary.'
            },
            {
                heading: 'Cosine Distance for DBSCAN',
                context: 'Cosine fits directional similarity in embedding space better than Euclidean distance, which is distorted by vector magnitude.'
            },
            {
                heading: 'Silhouette Guided Search',
                context: 'Swept eps and min samples and kept the pair with the best silhouette score among runs that produced more than one cluster, instead of hand picking round numbers.'
            },
            {
                heading: 'UMAP as a Sanity Check',
                context: 'Projected clusters into two dimensions to verify that the chosen labeling was visually coherent, not just a high silhouette on paper.'
            }
        ],
        reliability: 'Hyperparameter selection is reproducible through a silhouette sweep with a fixed random seed. UMAP visualizations are treated as diagnostic checks rather than as proof, since two dimensional projections can invent structure.',
        performance: 'Sentence embeddings are computed once and reused across KMeans and DBSCAN runs. The silhouette sweep is the expensive step, so it is limited to a small grid of eps and min samples values.',
        results: 'Embedding based clusters were more semantically coherent than bag of words clusters on the same documents. DBSCAN with cosine distance and silhouette selected hyperparameters produced usable structure, and UMAP confirmed that the embedding clusters separated more cleanly than the bag of words ones.',
        futureImprovements: 'Try hierarchical clustering for a dendrogram view of recipe families. Compare a second embedding model to see how sensitive the clusters are to the encoder. Add a small hand labeled subset to measure agreement with human categories.',
        lessons: 'In unsupervised text work the representation usually matters more than the clustering algorithm. Bag of words is a weak baseline worth keeping exactly so you can see what embeddings buy you, and silhouette plus visualization together are more trustworthy than either alone.'
    },
    {
        id: 'avocado-forecasting',
        title: 'Avocado Price Forecasting',
        description: 'Time series style feature engineering for next week avocado prices, with Ridge and Random Forest models reaching about 0.80 test R² against a strong persistence baseline.',
        techTags: ['Python', 'pandas', 'scikit-learn', 'Time Series', 'Feature Engineering'],
        hardProblem: 'A naive persistence baseline already scores about 0.83 R² by predicting that next week equals this week, so any real model has to beat a bar that looks strong on paper and still leave room to generalize.',
        githubUrl: null,
        liveUrl: null,
        screenshots: [
            '/images/projects/avocado-forecasting/avocado-corr.png'
        ],
        category: 'data',
        roles: ['ml'],
        status: 'Academic project',
        highlights: [
            'Persistence baseline of about 0.83 R² set a high bar before any model training',
            'Date aware feature engineering for next week price prediction',
            'Ridge and Random Forest compared under the same transforms',
            'Best models reached about 0.80 test R² without the polynomial overfit path'
        ],
        overview: 'A forecasting project on weekly avocado prices. It builds a next week prediction target, establishes a persistence baseline that simply copies this week forward, engineers date aware features, and compares Ridge regression against Random Forest under the same transforms.',
        problemContext: 'Prices are strongly autocorrelated, so predicting next week equal to this week already looks good by R². That makes the modeling problem less about fitting a curve and more about extracting signal beyond the obvious lag, without inventing features that overfit the training window.',
        whyItWasHard: [
            {
                heading: 'A Strong Baseline',
                context: 'Persistence already scores around 0.83 R². Beating it is hard, and matching it with a more complex model is not automatically progress.'
            },
            {
                heading: 'Time Aware Features',
                context: 'Calendar features, lags, and rolling signals have to respect time order. Random splits would leak the future into training.'
            },
            {
                heading: 'Overfitting Through Transforms',
                context: 'Polynomial expansions raised train R² while hurting test R², a clean example of complexity that looks better until you leave the training set.'
            },
            {
                heading: 'Model Comparison Under Fair Conditions',
                context: 'Ridge and Random Forest only mean something when they see the same feature pipeline, otherwise you are comparing preprocessing rather than models.'
            }
        ],
        keyDecisions: [
            {
                heading: 'Persistence Baseline First',
                context: 'Established the copy last week forward baseline before training anything, so later scores had a real reference point instead of a dummy regressor that is too easy to beat.'
            },
            {
                heading: 'Date Derived Features',
                context: 'Encoded day and month style calendar signal so the models could capture seasonality without treating the timestamp as a raw number.'
            },
            {
                heading: 'Reject Polynomial Expansion',
                context: 'Polynomial features improved train R² and hurt test R², so they were dropped in favor of the simpler transforms that generalized.'
            },
            {
                heading: 'Ridge and Random Forest Bake Off',
                context: 'Compared a linear regularized model against a non linear ensemble on identical features, with the best runs landing around 0.80 test R².'
            }
        ],
        reliability: 'Train and test splits respect time so future weeks are never used as training features. The persistence baseline is recomputed on the same split, which keeps the comparison honest.',
        performance: 'Ridge is cheap to train and was competitive with Random Forest on this feature set. The expensive part is feature experimentation, not model fitting.',
        results: 'With date aware features, Ridge and Random Forest reached roughly 0.80 test R². That sits near the course benchmark and close to the 0.83 persistence baseline, which is the honest framing: the models capture real signal, but a large share of next week price is already explained by this week.',
        futureImprovements: 'Add explicit lag and rolling mean features beyond calendar encodings. Try a seasonal naive baseline by region. Evaluate mean absolute error alongside R² so large price swings are visible.',
        lessons: 'In time series, the baseline is often the real competitor. Feature engineering matters more than swapping model families, and a transform that helps the training score is worthless if it fails on the next weeks.'
    }
]

/**
 * Highlights pins three equals in one row: live product, AI product, ML depth.
 * Stock Analytics stays featured under Software and appears in More on Highlights.
 */
const HIGHLIGHTS_FEATURED_IDS = [
    'multi-vendor-vertical-saas',
    'asterism',
    'graph-transformer'
] as const

/** Role lenses pin featured cards (trio for Software, pair for ML). */
const ROLE_FEATURED_IDS: Record<Role, string[]> = {
    swe: ['multi-vendor-vertical-saas', 'asterism', 'stock-analytics'],
    ml: ['asterism', 'graph-transformer']
}

function projectsByIds(ids: readonly string[]): Project[] {
    return ids
        .map((id) => featuredProjects.find((project) => project.id === id))
        .filter((project): project is Project => Boolean(project))
}

export function getFeaturedForFocus(focus: Focus): Project[] {
    if (focus === 'highlights') return projectsByIds(HIGHLIGHTS_FEATURED_IDS)
    return projectsByIds(ROLE_FEATURED_IDS[focus])
}

export function getAdditionalForFocus(focus: Focus): Project[] {
    if (focus === 'highlights') {
        const featuredIds = new Set<string>(HIGHLIGHTS_FEATURED_IDS)
        const featuredOverflow = featuredProjects.filter((project) => !featuredIds.has(project.id))
        const additional = allProjects.filter((project) => project.highlightInHighlights)
        return [...featuredOverflow, ...additional]
    }

    const featuredIds = new Set(ROLE_FEATURED_IDS[focus])
    const featuredOverflow = featuredProjects.filter(
        (project) => project.roles.includes(focus) && !featuredIds.has(project.id)
    )
    const additional = allProjects.filter((project) => project.roles.includes(focus))
    return [...featuredOverflow, ...additional]
}
