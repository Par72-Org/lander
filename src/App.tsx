import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  TrendingUp,
  Database,
  BarChart3,
  Users,
  Palette,
  Brain,
  Code,
  CheckCircle2
} from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    newsletter_opt_in: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services: Service[] = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Software Investment Analysis",
      description: "Strategic evaluation of technology investments to maximize ROI and business value."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Preparation & Platform Implementation",
      description: "Build robust data foundations with expert platform implementation and optimization."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Outsourced Data Analytics",
      description: "Comprehensive analytics services to transform your data into actionable insights."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Growth Teams",
      description: "Dedicated teams to accelerate your product development and business growth."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Product Design",
      description: "User-centered design that creates exceptional digital experiences."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Engineering & Readiness",
      description: "Strategic AI implementation and organizational readiness assessments."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Data Engineering Consulting",
      description: "Expert partnerships to build scalable data infrastructure and pipelines."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        newsletter_opt_in: false
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <header className="container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-light tracking-tight text-slate-900 mb-6">
            Par<span className="font-semibold">72</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed">
            Strategic technology partnerships that drive measurable business outcomes.
          </p>
        </div>
      </header>

      {/* Services Section */}
      <section className="container mx-auto px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light text-slate-900 mb-16 text-center">
            Our Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-100 rounded-lg text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-slate-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-6 pb-32">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm">
            <h2 className="text-3xl font-light text-slate-900 mb-3">
              Let's Connect
            </h2>
            <p className="text-slate-600 mb-8">
              Share your vision and we'll explore how we can help you succeed.
            </p>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <p className="text-emerald-800">Thank you! We'll be in touch soon.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">Something went wrong. Please try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow resize-none"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="newsletter_opt_in"
                  name="newsletter_opt_in"
                  checked={formData.newsletter_opt_in}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-2 focus:ring-slate-900"
                />
                <label htmlFor="newsletter_opt_in" className="text-sm text-slate-600">
                  Yes, I'd like to receive updates and insights from Par72
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white py-4 px-6 rounded-lg font-medium hover:bg-slate-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-slate-200">
        <div className="text-center text-slate-500 text-sm">
          <p>© 2025 Par72. Strategic technology partnerships.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
