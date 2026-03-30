import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import GolfFlag from '../components/GolfFlag';
import ProjectCard from '../components/ProjectCard';

const PROJECTS = [
  {
    title: 'Project Alpha',
    tags: ['AI Agent', 'LLM', 'Python'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula nulla vitae lectus tincidunt, a fermentum magna facilisis. Suspendisse potenti.',
  },
  {
    title: 'Project Meridian',
    tags: ['Data Platform', 'dbt', 'Snowflake'],
    description:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
  {
    title: 'Project Vertex',
    tags: ['Computer Vision', 'Edge ML', 'Rust'],
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.',
  },
  {
    title: 'Project Arcus',
    tags: ['DevOps', 'Terraform', 'AWS'],
    description:
      'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.',
  },
  {
    title: 'Project Lumen',
    tags: ['Mobile', 'React Native', 'AI'],
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.',
  },
  {
    title: 'Project Helix',
    tags: ['RAG Pipeline', 'Vector DB', 'TypeScript'],
    description:
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem.',
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <GolfFlag className="w-6 h-6 text-slate-900" />
            <span className="font-semibold tracking-tight text-lg">Par72</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              Home
            </Link>
            <a
              href="mailto:hello@par72.us"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back home
        </Link>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          Our Work
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          A selection of projects we've built and are building. From AI agents to
          data platforms — each one ships real outcomes.
        </p>
      </header>

      {/* Project Grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              colorIndex={i}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Par72 Development Services</p>
        </div>
      </footer>
    </div>
  );
}
