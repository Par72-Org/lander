import { useState } from 'react';
import {
  Brain,
  Database,
  BarChart3,
  Code,
  Users,
  ArrowRight,
  Github,
  Mail,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

const SLACK_WEBHOOK_URL = import.meta.env.VITE_SLACK_WEBHOOK_URL;

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
      if (SLACK_WEBHOOK_URL) {
        await fetch(SLACK_WEBHOOK_URL, {
          method: 'POST',
          body: JSON.stringify({
            text: `New signup from par72.us: ${email}`,
          }),
        });
      }
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-white text-xs font-bold tracking-tight">
              72
            </span>
            <span className="font-semibold tracking-tight text-lg">
              Par 72 Services
            </span>
          </a>
          <div className="flex items-center gap-6">
            <a
              href="#services"
              className="hidden sm:block text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              Services
            </a>
            <a
              href="#connect"
              className="hidden sm:block text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              Connect
            </a>
            <a
              href="https://github.com/Par72-Org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-900 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 pt-24 pb-20 md:pt-36 md:pb-28">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400 mb-6">
          AI &middot; Data &middot; Software
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] mb-8 max-w-4xl">
          We build the software
          <br />
          <span className="text-slate-400">you wish you had.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mb-10">
          Par 72 Services is a professional services firm specializing in bespoke AI solutions,
          modern data platforms, and custom software — built by senior engineers who ship.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#connect"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 text-white px-6 py-3 text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Get in touch <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/Par72-Org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 text-slate-700 px-6 py-3 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            <Github className="w-4 h-4" /> View our work
          </a>
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-slate-100" />
      </div>

      {/* Services */}
      <section id="services" className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          What we do
        </h2>
        <p className="text-slate-500 mb-14 max-w-xl">
          Custom technology services for companies that need it done right.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-200"
            >
              <div className="inline-flex p-2.5 rounded-lg bg-slate-50 text-slate-600 mb-4 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200">
                {service.icon}
              </div>
              <h3 className="text-base font-medium mb-2">{service.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-slate-100" />
      </div>

      {/* Connect / Signup */}
      <section id="connect" className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Stay in the loop
          </h2>
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
                className="flex-1 px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-shadow"
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

          <div className="mt-10 flex flex-col sm:flex-row gap-6 text-sm text-slate-500">
            <a
              href="mailto:kevin@par72.us"
              className="inline-flex items-center gap-2 hover:text-slate-900 transition-colors"
            >
              <Mail className="w-4 h-4" /> kevin@par72.us
            </a>
            <a
              href="https://github.com/Par72-Org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-slate-900 transition-colors"
            >
              <Github className="w-4 h-4" /> github.com/Par72-Org
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Par 72 Services</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Par72-Org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-600 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
