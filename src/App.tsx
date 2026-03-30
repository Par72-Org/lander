import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Database,
  BarChart3,
  Code,
  Users,
  ArrowRight,
  Mail,
  CheckCircle2,
  Quote,
} from 'lucide-react';
import GolfFlag from './components/GolfFlag';
import TiltCard from './components/TiltCard';
import CursorGlow from './components/CursorGlow';


interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const services: Service[] = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: 'Bespoke AI Services',
      description:
        'Custom AI solutions designed around your business — from LLM integration to autonomous agents and intelligent workflows.',
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: 'Data & Analytics Foundations',
      description:
        'Modern data platform setup, pipeline engineering, and analytics infrastructure that scales with you.',
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: 'Software Platform Engineering',
      description:
        'End-to-end platform builds, cloud architecture, and developer tooling for high-growth teams.',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Advisory & Consulting',
      description:
        'Strategic technology guidance from senior practitioners — AI readiness, data strategy, and build-vs-buy decisions.',
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'Our Products',
      description:
        'We build and ship our own applications. Check out what we\'re working on.',
    },
  ];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');

    try {
      const resp = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!resp.ok) throw new Error();
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen text-slate-900 mesh-gradient">
      <CursorGlow />

      {/* Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <GolfFlag className="w-6 h-6 text-slate-900" />
            <span className="font-semibold tracking-tight text-lg">Par72</span>
          </Link>
          <div className="flex items-center gap-6">
            <a
              href="#services"
              className="hidden sm:block text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              Services
            </a>
            <Link
              to="/projects"
              className="hidden sm:block text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              Projects
            </Link>
            <a
              href="#connect"
              className="hidden sm:block text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              Connect
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-16 md:pt-20 md:pb-24">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400 mb-6">
          AI &middot; Data &middot; Software
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] mb-8 max-w-4xl">
          We build the software
          <br />
          <span className="text-slate-400">you wish you had.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mb-10">
          Par72 Development Services is a professional services firm specializing in bespoke AI solutions,
          modern data platforms, and custom software — built by those who ship.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#connect"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 text-white px-6 py-3 text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Get in touch <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white/50 text-slate-700 px-6 py-3 text-sm font-medium hover:bg-white transition-colors"
          >
            View our work <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-slate-200/60" />
      </div>

      {/* Services */}
      <section id="services" className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          What we do
        </h2>
        <p className="text-slate-500 mb-10 max-w-xl">
          Custom technology services for companies that need it done right.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <TiltCard key={i}>
              <div className="group p-4 rounded-lg border border-slate-200/60 bg-white/60 backdrop-blur-sm hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-200 h-full">
                <div className="inline-flex p-2 rounded-md bg-slate-50 text-slate-600 mb-3 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200">
                  {service.icon}
                </div>
                <h3 className="text-sm font-medium mb-1">{service.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-slate-200/60" />
      </div>

      {/* Testimonial */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <Quote className="w-8 h-8 text-slate-200 mx-auto mb-6" />
          <blockquote className="text-xl md:text-2xl font-light text-slate-700 leading-relaxed mb-6">
            "Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Donec sed odio dui. Maecenas faucibus mollis interdum."
          </blockquote>
          <div className="text-sm text-slate-400">
            <p className="font-medium text-slate-500">Nomen Cognomen</p>
            <p>VP Engineering, Acme Corp</p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-slate-200/60" />
      </div>

      {/* Connect / Signup */}
      <section id="connect" className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
            Need a loop?
          </h2>
          <p className="text-sm text-slate-400 italic mb-4">
            In caddy speak, a loop is a round. Let us carry the bag.
          </p>
          <p className="text-slate-500 mb-8">
            Drop your email and we'll reach out. No spam — just occasional updates
            on what we're building and how we can help.
          </p>

          {status === 'success' ? (
            <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <p className="text-emerald-800 text-sm">
                You're on the list. We'll be in touch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white/70 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 text-white px-6 py-3 text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                <Mail className="w-4 h-4" />
                {status === 'sending' ? 'Sending...' : 'Sign up'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-sm text-red-600">
              Something went wrong. Try again or email us directly.
            </p>
          )}

          <div className="mt-10">
            <a
              href="mailto:hello@par72.us"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              <Mail className="w-4 h-4" /> hello@par72.us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Par72</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
