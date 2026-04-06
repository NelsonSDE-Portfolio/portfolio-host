import { Link } from 'react-router-dom';

const skills = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Angular', 'HTML/CSS', 'Module Federation'] },
  { category: 'Backend', items: ['Node.js', 'NestJS', 'Fastify', 'Jest', 'REST APIs'] },
  { category: 'Database', items: ['MongoDB', 'PostgreSQL', 'Redis', 'Cassandra', 'Neptune'] },
  { category: 'Cloud & DevOps', items: ['AWS CDK', 'Lambda', 'Docker', 'SQS/SNS', 'Datadog'] },
  { category: 'AI & Automation', items: ['Claude Code', 'AI Agents', 'Agentic Workflows', 'Custom Skills'] },
];

const projects = [
  {
    id: 'challenge-tracker',
    title: 'Challenge Tracker',
    description: 'A full-stack accountability app to track fitness challenges with friends. Features debt calculation, workout logging, and leaderboards.',
    tags: ['React', 'NestJS', 'MongoDB', 'Module Federation'],
    status: 'Live',
    link: '/projects/challenge-tracker',
    icon: '🏆',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 'coming-soon-1',
    title: 'AI Code Review Assistant',
    description: 'An intelligent code review tool that provides suggestions and catches potential bugs using machine learning.',
    tags: ['Python', 'OpenAI', 'GitHub API', 'FastAPI'],
    status: 'Coming Soon',
    link: null,
    icon: '🤖',
    gradient: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'coming-soon-2',
    title: 'Real-time Analytics Dashboard',
    description: 'A customizable analytics dashboard with real-time data visualization and alerting capabilities.',
    tags: ['React', 'D3.js', 'WebSockets', 'TimescaleDB'],
    status: 'Coming Soon',
    link: null,
    icon: '📊',
    gradient: 'from-blue-500 to-cyan-600',
  },
];

const experience = [
  {
    role: 'Senior Software Engineer',
    company: 'PWC / Kunai',
    period: '2024 - Present',
    highlights: [
      'Built graph data models in Amazon Neptune and led backend modernization from Express.js to NestJS',
      'Contributed to micro-frontend migration enabling independent deployments and improved scalability',
      'Increased delivery speed using agentic workflows with Claude Code and built custom AI agents',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Turing (Kasa)',
    period: '2023 - 2024',
    highlights: [
      'Developed NestJS microservices and AWS infrastructure for reservation management system',
      'Created shared npm packages to streamline development across microservices',
      'Utilized AWS CDK for infrastructure as code and Datadog for observability',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'AgileEngine',
    period: '2022 - 2023',
    highlights: [
      'Built B2B SaaS data privacy platform from the ground up with Node.js and Fastify',
      'Developed SDKs and integration bridges for customer platform integration',
      'Containerized multiple micro-applications using Docker for seamless scalability',
    ],
  },
  {
    role: 'Node.js Developer',
    company: 'Globant',
    period: '2020 - 2022',
    highlights: [
      'Designed micro-applications with modular architecture handling over 1M+ users',
      'Created AWS Lambda functions for asynchronous event processing',
      'Applied SOLID principles and design patterns for maintainable code',
    ],
  },
];

export function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero / Profile Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative max-w-5xl mx-auto px-4 py-24 text-center text-white">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-6xl mb-6 ring-4 ring-white/30">
              👨‍💻
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Nelson Riera
            </h1>
            <p className="text-2xl text-blue-100 mb-6">
              Senior Software Engineer
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Building scalable microservices and modern web applications with 7+ years
              of experience. Specialized in NestJS, React, AWS, and leveraging AI-powered
              development workflows with Claude Code and custom agentic skills.
            </p>
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://github.com/nelsonriera"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition shadow-lg flex items-center gap-2"
            >
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/nelsonriera"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/30 transition flex items-center gap-2"
            >
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:nelsonr.sde@gmail.com"
              className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/30 transition flex items-center gap-2"
            >
              <span>Contact</span>
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Skills & Expertise
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-5xl mx-auto px-4" id="projects">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Projects
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          A collection of projects showcasing my skills in full-stack development,
          system design, and modern web technologies.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
            >
              <div className={`h-32 bg-gradient-to-r ${project.gradient} flex items-center justify-center`}>
                <span className="text-5xl group-hover:scale-110 transition-transform">
                  {project.icon}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-800 text-lg">{project.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Live'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link ? (
                  <Link
                    to={project.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View Project →
                  </Link>
                ) : (
                  <span className="text-gray-400 text-sm">Coming soon</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Experience
        </h2>
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-800 text-xl">{exp.role}</h3>
                  <p className="text-blue-600">{exp.company}</p>
                </div>
                <span className="text-gray-500 text-sm mt-2 md:mt-0">{exp.period}</span>
              </div>
              <ul className="space-y-2">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">✓</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Highlight */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gray-900 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Built with Modern Architecture
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              This portfolio demonstrates Module Federation in action - each project
              can run as an independent application while seamlessly integrating
              within this host shell.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <span className="text-2xl mb-2 block">🏠</span>
              <h4 className="font-semibold text-blue-400">Host Shell</h4>
              <p className="text-sm text-gray-400">React + Vite + TypeScript</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <span className="text-2xl mb-2 block">📦</span>
              <h4 className="font-semibold text-purple-400">Micro Frontends</h4>
              <p className="text-sm text-gray-400">Independent Deployment</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <span className="text-2xl mb-2 block">⚡</span>
              <h4 className="font-semibold text-green-400">Backend APIs</h4>
              <p className="text-sm text-gray-400">NestJS + MongoDB</p>
            </div>
          </div>
          <div className="text-center">
            <Link
              to="/architecture"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Explore Architecture Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
