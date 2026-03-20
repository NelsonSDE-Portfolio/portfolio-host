import { Link } from 'react-router-dom';

const technologies = [
  { name: 'React', icon: '⚛️', color: 'bg-blue-100 text-blue-800' },
  { name: 'TypeScript', icon: '📘', color: 'bg-blue-100 text-blue-800' },
  { name: 'Node.js', icon: '🟢', color: 'bg-green-100 text-green-800' },
  { name: 'NestJS', icon: '🐈', color: 'bg-red-100 text-red-800' },
  { name: 'MongoDB', icon: '🍃', color: 'bg-green-100 text-green-800' },
  { name: 'AWS', icon: '☁️', color: 'bg-orange-100 text-orange-800' },
  { name: 'Tailwind', icon: '🎨', color: 'bg-cyan-100 text-cyan-800' },
  { name: 'Module Federation', icon: '🔗', color: 'bg-purple-100 text-purple-800' },
];

const timeline = [
  {
    year: '2024',
    title: 'Microfrontend Architecture',
    description:
      'Building scalable applications with Module Federation and independent deployments.',
  },
  {
    year: '2023',
    title: 'Full-Stack Development',
    description:
      'Creating end-to-end solutions with React, Node.js, and cloud services.',
  },
  {
    year: '2022',
    title: 'Cloud & DevOps',
    description:
      'Implementing CI/CD pipelines, containerization, and cloud infrastructure.',
  },
  {
    year: '2021',
    title: 'Backend Engineering',
    description:
      'Designing RESTful APIs, database schemas, and authentication systems.',
  },
];

export function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Full-stack developer passionate about building modern web applications
          with cutting-edge technologies and clean architecture.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/challenges"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            Try Challenge Tracker
          </Link>
          <Link
            to="/architecture"
            className="px-6 py-3 bg-white text-gray-800 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition"
          >
            View Architecture
          </Link>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Technologies I Work With
        </h2>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {technologies.map((tech) => (
            <span
              key={tech.name}
              className={`px-4 py-2 rounded-full text-sm font-medium ${tech.color} flex items-center gap-2`}
            >
              <span>{tech.icon}</span>
              {tech.name}
            </span>
          ))}
        </div>
      </section>

      {/* Career Narrative Timeline */}
      <section className="px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          My Journey
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform md:-translate-x-1/2"></div>

            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2 z-10"></div>

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}
                >
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <span className="text-blue-600 font-bold text-lg">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 mt-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Featured Project
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Challenge Tracker</h3>
                <p className="text-blue-100 mb-6">
                  A full-stack accountability application built with
                  microfrontend architecture. Create challenges, track workouts,
                  and compete with friends.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    React
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    NestJS
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    MongoDB
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    Module Federation
                  </span>
                </div>
                <Link
                  to="/challenges"
                  className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
                >
                  Launch App
                </Link>
              </div>
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-white/10 rounded-xl flex items-center justify-center">
                  <span className="text-6xl">🏆</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Highlight */}
      <section className="px-4">
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Built with Microfrontend Architecture
          </h2>
          <p className="text-gray-300 mb-6">
            This portfolio demonstrates Module Federation in action - the
            Challenge Tracker runs as an independent application that loads
            seamlessly within this host shell.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-400">Host Shell</h4>
              <p className="text-sm text-gray-400">
                Vite + React + TypeScript
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-400">Remote App</h4>
              <p className="text-sm text-gray-400">
                Independent deployment
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-green-400">Backend API</h4>
              <p className="text-sm text-gray-400">
                NestJS + MongoDB
              </p>
            </div>
          </div>
          <Link
            to="/architecture"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Explore Architecture
          </Link>
        </div>
      </section>
    </div>
  );
}
